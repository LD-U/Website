# Connecting this site to Notion

Your content now lives in two Notion databases instead of being hardcoded in `App.tsx`:

- **Portfolio Work** — projects and case studies (`Type` property distinguishes them).
  Case studies' detailed write-ups live in the page body using `##` headings (section)
  and `###` headings (subsection).
- **Portfolio Principles** — the "How I think about product design" grid.

A build-time script (`scripts/fetch-notion.mjs`) pulls from these and writes
`src/app/data/content.json`, which `App.tsx` imports. The site itself never calls
Notion directly — this keeps your API key off the public site.

## 1. Get a Notion API key

1. Go to https://www.notion.so/my-integrations and create a new internal integration
   (any name, e.g. "Portfolio Site").
2. Copy the "Internal Integration Secret" — this is your `NOTION_API_KEY`.
3. Open each database in Notion (**Portfolio Work**, **Portfolio Principles**) → `•••`
   menu (top right) → **Connections** → add your integration. Without this step the
   API key can't see the data.

## 2. Local setup

```bash
cp .env.example .env
# paste your API key into .env
npm install
npm run fetch:notion   # pulls content from Notion into src/app/data/content.json
npm run dev
```

`npm run build` runs `fetch:notion` automatically first (see `prebuild` in
`package.json`), so deploys always ship fresh content.

If `NOTION_API_KEY` isn't set, the fetch script falls back to the checked-in
`content.sample.json` rather than failing the build — useful for local dev or CI
environments that don't have Notion access.

## 3. Deploying with auto-rebuild on publish

If you deploy on Vercel:

1. Add `NOTION_API_KEY`, `NOTION_WORK_DATA_SOURCE_ID`, and
   `NOTION_PRINCIPLES_DATA_SOURCE_ID` as environment variables in your Vercel project
   settings.
2. Create a **Deploy Hook** in Vercel (Project Settings → Git → Deploy Hooks) — this
   gives you a URL that triggers a rebuild.
3. In Notion, open the **Portfolio Work** database → set up a database automation:
   trigger "When Published is checked" (or any property change you want to watch) →
   action "Send webhook" → paste the Vercel deploy hook URL.

Now checking a page as Published (or flipping any watched property) triggers a
rebuild, which re-fetches the latest Notion content and redeploys.

**Heads up:** Notion's automation webhooks fire on property changes, not on edits to
the page body itself. If you only edit the text of a case study without touching a
property, it won't auto-trigger a rebuild. Easiest fix: toggle the `Published`
checkbox off and back on when you're done editing, or add a cron job that hits the
deploy hook on a schedule (e.g. hourly) as a safety net.

## Editing content going forward

- **Add a project or case study**: new page in Portfolio Work. Set `Type`,
  `Tags`, `Year`, `Image ID` (an Unsplash photo ID like `photo-1234...`),
  `Description` (card summary), `Detail` (intro paragraph in the modal), `Order`,
  and check `Published`. For case studies, write the full breakdown in the page
  body using `##` / `###` headings, paragraphs, and bullet lists.
- **Add/reorder a principle**: new page in Portfolio Principles, set `Icon`
  (one emoji), `Title`, `Body`, `Order`.
- **About text, hero copy, contact email**: still hardcoded in `App.tsx` for now —
  happy to move these into Notion too (e.g. a single "Site Settings" page) if useful.
