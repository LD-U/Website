// Fetches portfolio content from Notion and writes it to src/app/data/content.json.
// Runs automatically before every build (see "prebuild" in package.json), and can
// also be run manually with: npm run fetch:notion
//
// Required env vars (see .env.example):
//   NOTION_API_KEY
//   NOTION_WORK_DATA_SOURCE_ID
//   NOTION_PRINCIPLES_DATA_SOURCE_ID

import { writeFile, mkdir, copyFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "../src/app/data/content.json");
const FALLBACK_PATH = path.join(__dirname, "../src/app/data/content.sample.json");
const IMAGES_DIR = path.join(__dirname, "../public/images");

await loadEnvFile(path.join(__dirname, "../.env"));

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const WORK_DATA_SOURCE_ID = process.env.NOTION_WORK_DATA_SOURCE_ID;
const PRINCIPLES_DATA_SOURCE_ID = process.env.NOTION_PRINCIPLES_DATA_SOURCE_ID;
const NOTION_VERSION = "2025-09-03";

// Plain Node doesn't load .env files on its own, so we do it manually here rather
// than adding a "dotenv" dependency. Only sets vars that aren't already set in the
// environment (so real env vars, e.g. on Vercel, always take priority over .env).
async function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const raw = await readFile(filePath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function main() {
  if (!NOTION_API_KEY || !WORK_DATA_SOURCE_ID || !PRINCIPLES_DATA_SOURCE_ID) {
    console.warn(
      "[fetch-notion] Missing NOTION_API_KEY / NOTION_WORK_DATA_SOURCE_ID / NOTION_PRINCIPLES_DATA_SOURCE_ID.\n" +
        "[fetch-notion] Falling back to the checked-in sample content so the build doesn't break.\n" +
        "[fetch-notion] See .env.example to connect this to your real Notion workspace."
    );
    await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await copyFile(FALLBACK_PATH, OUTPUT_PATH);
    return;
  }

  console.log("[fetch-notion] Fetching content from Notion...");

  const [workPages, principlePages] = await Promise.all([
    queryDataSource(WORK_DATA_SOURCE_ID, {
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
    queryDataSource(PRINCIPLES_DATA_SOURCE_ID, {
      sorts: [{ property: "Order", direction: "ascending" }],
    }),
  ]);

  const principles = principlePages.map((page) => ({
    icon: richText(page.properties.Icon),
    title: title(page.properties.Title),
    body: richText(page.properties.Body),
  }));

  const projects = [];
  const caseStudies = [];

  for (const page of workPages) {
    const blocks = await getAllBlocks(page.id);
    const sections = blocksToSections(blocks);

    const img = await resolveCoverImage(page);

    const item = {
      title: title(page.properties.Title),
      tags: (page.properties.Tags?.multi_select ?? []).map((t) => t.name),
      year: richText(page.properties.Year),
      description: richText(page.properties.Description),
      img,
      detail: richText(page.properties.Detail),
      ...(sections.length > 0 ? { fullContent: { sections } } : {}),
    };

    if (page.properties.Type?.select?.name === "Case Study") {
      caseStudies.push(item);
    } else {
      projects.push(item);
    }
  }

  const output = { principles, projects, caseStudies };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(
    `[fetch-notion] Wrote ${projects.length} projects, ${caseStudies.length} case studies, ` +
      `${principles.length} principles to ${path.relative(process.cwd(), OUTPUT_PATH)}`
  );
}

// ---- Notion API helpers ----

async function notionFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API error ${res.status} for ${url}: ${body}`);
  }
  return res.json();
}

async function queryDataSource(dataSourceId, body) {
  const results = [];
  let cursor;
  do {
    const data = await notionFetch(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      { method: "POST", body: JSON.stringify({ ...body, start_cursor: cursor }) }
    );
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results;
}

async function getAllBlocks(blockId) {
  const results = [];
  let cursor;
  do {
    const url = new URL(`https://api.notion.com/v1/blocks/${blockId}/children`);
    url.searchParams.set("page_size", "100");
    if (cursor) url.searchParams.set("start_cursor", cursor);
    const data = await notionFetch(url.toString());
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results;
}

// ---- Property readers ----

function title(prop) {
  return (prop?.title ?? []).map((t) => t.plain_text).join("");
}

function richText(prop) {
  return (prop?.rich_text ?? []).map((t) => t.plain_text).join("");
}

function plainTextFromRichTextArray(arr) {
  return (arr ?? []).map((t) => t.plain_text).join("");
}

// ---- Block -> sections parser ----
// Converts a flat list of Notion blocks into the { heading?, subheading?, content }[]
// shape the site's modal expects. A heading_2 starts a new section with `heading` set;
// a heading_3 starts a new section with `subheading` set. Paragraphs accumulate as a
// joined string; consecutive bulleted_list_items accumulate as a string array.
function blocksToSections(blocks) {
  const sections = [];
  let current = null;
  let bulletBuffer = [];
  let paragraphBuffer = [];

  function flushBuffers() {
    if (!current) return;
    if (bulletBuffer.length > 0) {
      current.content = bulletBuffer;
    } else if (paragraphBuffer.length > 0) {
      current.content = paragraphBuffer.join("\n\n");
    }
    bulletBuffer = [];
    paragraphBuffer = [];
  }

  for (const block of blocks) {
    if (block.type === "heading_2") {
      flushBuffers();
      current = { heading: plainTextFromRichTextArray(block.heading_2.rich_text), content: "" };
      sections.push(current);
    } else if (block.type === "heading_3") {
      flushBuffers();
      current = { subheading: plainTextFromRichTextArray(block.heading_3.rich_text), content: "" };
      sections.push(current);
    } else if (block.type === "bulleted_list_item") {
      bulletBuffer.push(plainTextFromRichTextArray(block.bulleted_list_item.rich_text));
    } else if (block.type === "paragraph") {
      const text = plainTextFromRichTextArray(block.paragraph.rich_text);
      if (text) paragraphBuffer.push(text);
    }
  }
  flushBuffers();

  return sections.filter((s) => s.content && s.content.length > 0);
}

// ---- Cover image resolution ----
// If the page has a file uploaded to the "Cover Image" property, download it into
// public/images/ at build time and return a local path. Notion's file URLs (both
// uploaded files and external links) are only guaranteed valid briefly, so we must
// fetch the bytes now rather than storing the URL directly. Falls back to the
// legacy "Image ID" text property (an Unsplash photo ID) if no file is uploaded.
async function resolveCoverImage(page) {
  const files = page.properties["Cover Image"]?.files ?? [];
  const file = files[0];

  if (!file) {
    return richText(page.properties["Image ID"]);
  }

  const url = file.type === "file" ? file.file?.url : file.external?.url;
  if (!url) return richText(page.properties["Image ID"]);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    const ext = extFromUrl(url) || "jpg";
    const slug = slugify(title(page.properties.Title)) || page.id.replace(/-/g, "");
    const filename = `${slug}.${ext}`;

    await mkdir(IMAGES_DIR, { recursive: true });
    await writeFile(path.join(IMAGES_DIR, filename), buffer);

    return `/images/${filename}`;
  } catch (err) {
    console.warn(
      `[fetch-notion] Could not download Cover Image for "${title(page.properties.Title)}": ${err.message}. ` +
        `Falling back to Image ID.`
    );
    return richText(page.properties["Image ID"]);
  }
}

function extFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1].toLowerCase() : null;
  } catch {
    return null;
  }
}

function slugify(str) {
  return (str ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

main().catch((err) => {
  console.error("[fetch-notion] Failed:", err);
  process.exit(1);
});
