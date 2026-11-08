import { useState, useEffect, useRef } from "react";
import { Mail, ArrowUpRight, Menu, X, Users, FlaskConical, MessageCircleHeart } from "lucide-react";
import content from "./data/content.json";


type WorkItem = {
  title: string;
  tags: string[];
  year: string;
  description: string;
  img: string;
  detail: string;
  fullContent?: {
    sections: Array<{
      heading?: string;
      subheading?: string;
      content: string | string[];
      image?: {
        src: string;
        alt: string;
        caption?: string;
      };
      gallery?: Array<{
        src: string;
        alt: string;
        caption?: string;
      }>;
      video?: {
        src: string;
        caption?: string;
      };
    }>;
  };
};

const projects = content.projects as WorkItem[];
const caseStudies = content.caseStudies as WorkItem[];

const leadershipStats = [
  {
    value: "4 → 1",
    label: "Unification of four unique product processes",
    detail:
      "Consolidated four previously independent product processes and rolled out a standardized, shared, prioritization framework that replaced customer-vote-only decisions with an evidence-led process.",
    featured: true,
  },
  {
    value: "2 for 2",
    label: "Growing Designers from Practitioners → Product Owners",
    detail: "Mentored 2 designers through their growth neccessary for the team to scale as we aquired more products.",
  },
  {
    value: "0 → 1",
    label: "Founded Design and Evolved Product Strategy",
    detail: "First design hire and built the product strategy, process, and design team that didn't exist before. Owning projects from stage zero through delivery",
  },
  {
    value: "50%",
    label: "Faster research synthesis",
    detail: "Built AI-automated workflows that cut time-to-insight in half.",
  }
];

const approachPillars = [
  {
    icon: Users,
    title: "Lead as Player/Coach",
    body: "I set clear expectations, build predictable frameworks, and follow both myself as a designer for accountablity and consistency across the team.",
  },
  {
    icon: FlaskConical,
    title: "Research-First, Evidence-Led",
    body: "Every decision is grounded in research and refined as new information and insights are uncovered. Evidence-based processes remove risk and bias for stable and desirable outcomes.",
  },
  {
    icon: MessageCircleHeart,
    title: "Empathy Focused",
    body: "I create space for others and stay curious, learning from users and teammates alike. I establish a psychologically safe environment and encourage my teams to enter with their authentic selves.",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Work items store either a local path to an uploaded image (downloaded from Notion
// at build time — see scripts/fetch-notion.mjs) or a legacy Unsplash photo ID.
function resolveImageSrc(img: string, w: number, h: number) {
  if (!img) return "";
  if (img.startsWith("/")) return img;
  return `https://images.unsplash.com/${img}?w=${w}&h=${h}&fit=crop&auto=format`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"projects" | "casestudies">("casestudies");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    if (selected) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#home")}
            className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            LDU
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-6 pb-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => { scrollTo(l.href); setMenuOpen(false); }}
                className="text-left text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-20 max-w-6xl mx-auto"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,235,227,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,227,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-4xl">
          <p
            className="text-xs tracking-[0.3em] uppercase text-accent mb-8 font-medium"
          >
            Product Design Leader · she/her/hers
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.95] mb-10 text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nice to meet you,{" "}
            <em className="not-italic text-accent">I'm Lindsay.</em>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-light">
            I am an empathetic, user-guided, system loving, <strong>product design leader</strong>.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#work")}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              View My Work <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              Get in Touch <Mail size={16} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-border" />
        </div>
      </section>

      <section id="about" className="px-6 md:px-10 py-28 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-baseline">
          <div className="md:col-span-4 relative">
            <p className="absolute -top-8 left-0 text-xs tracking-[0.3em] uppercase text-accent font-medium">
              About
            </p>
            <h2
              className="text-4xl md:text-5xl font-medium leading-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A bit about me
            </h2>
          </div>

          <div className="md:col-span-8 space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              I'm a design leader, mentor, and team igniter who cultivates happy, high-performing teams 
              built with craft and care. I lead as a player/coach: setting clear expectations, creating 
              predictable frameworks, and offering full autonomy. My designers are confident 
              decision-makers, grounded by support and guided by cadenced critiques and meaningful 
              one-on-ones. In 12 years building B2B SaaS products, my experience spans design management, 
              product strategy, product research, and customer advocacy to deliver research-backed user 
              experiences for secondhand e-commerce and marketing technology companies.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              My values: authenticity, growth, and wonder.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px border border-border">
              {[
                { label: "Focus", value: "Product Design Leadership" },
                { label: "Team", value: "Product and Design team of 5" },
                { label: "Industries", value: "e-Commerce · MarTech" },
                {
                  label: "Email",
                  value: "lindsayunderwood@me.com",
                  href: "mailto:lindsayunderwood@me.com",
                },
                {
                  label: "LinkedIn",
                  value: "lindsaydadicunderwood",
                  href: "https://www.linkedin.com/in/lindsaydadicunderwood/",
                },
                {
                  label: "GitHub",
                  value: "LD-U",
                  href: "https://github.com/LD-U",
                },
              ].map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="bg-card p-5 group hover:bg-background transition-colors"
                  >
                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground break-all group-hover:text-accent transition-colors">
                      {item.value}
                    </p>
                  </a>
                ) : (
                  <div key={item.label} className="bg-card p-5">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground break-all">{item.value}</p>
                  </div>
                )
              )}
            </div>

            <div className="pt-4">
              <h3
                className="text-2xl md:text-3xl font-medium leading-tight text-foreground mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Success Metrics
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed font-light mb-8 max-w-xl">
                My track record of bringing clarity to abiguity, creating systems for collaborative teams, and leading by design.
              </p>

              <div className="divide-y divide-border border-t border-b border-border">
                {leadershipStats.map((s, i) => (
                  <div key={i} className="py-6 flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                    <div className="w-full sm:w-40 shrink-0">
                      <span
                        className="text-2xl md:text-3xl font-medium text-accent leading-snug"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {s.value}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium mb-2 text-foreground tracking-wide uppercase">
                        {s.label}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section id="approach" className="px-6 md:px-10 py-28 border-t border-border bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-medium">
              My Approach
            </p>
            <h2
              className="text-4xl md:text-5xl font-medium leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How I lead and deliver
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              Three things define how I show up as a product design leader: my approach to leading, the
              way I make decisions, and the environments I create for the people around me.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
            {approachPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="bg-card p-8 md:p-10 flex flex-col">
                  <Icon className="text-accent mb-6" size={32} strokeWidth={1.5} />
                  <h3
                    className="text-xl font-medium mb-3 text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="px-6 md:px-10 py-28 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-medium">
                Work
              </p>
              <h2
                className="text-4xl md:text-5xl font-medium leading-tight text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Selected work
              </h2>
            </div>

            <div className="flex border border-border self-start sm:self-auto">
              {(["casestudies", "projects"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs tracking-widest uppercase font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "projects" ? "Projects" : "Case Studies"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-border">
            {(activeTab === "projects" ? projects : caseStudies).map((item, i) => (
              <article
                key={i}
                className="bg-card group cursor-pointer flex flex-col hover:bg-secondary transition-colors duration-200"
                onClick={() => setSelected(item)}
              >
                <div className="relative overflow-hidden bg-muted aspect-[16/9]">
                  <img
                    src={resolveImageSrc(item.img, 600, 338)}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <span className="absolute top-4 right-4 text-xs tracking-widest text-muted-foreground">
                    {item.year}
                  </span>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs tracking-widest uppercase text-accent border border-accent/30 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-xl font-medium text-foreground leading-snug mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">
                    {item.description}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(item); }}
                    className="mt-6 flex items-center gap-2 text-accent text-xs tracking-widest uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                  >
                    Read more <ArrowUpRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resume ── */}
      <section id="resume" className="px-6 md:px-10 py-28 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-medium">
                Resume
              </p>
              <h2
                className="text-4xl md:text-5xl font-medium leading-tight text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Experience and education
              </h2>
            </div>
            <a
              href="/LindsayDadic-Underwood_Resume.pdf"
              download="LindsayDadic-Underwood_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity self-start sm:self-auto"
            >
              Download Résumé (PDF) <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-8 space-y-14">
              {[
                {
                  org: "Cordance Commerce [Upright Business Unit]",
                  orgDesc:
                    "Multi-channel inventory management and e-commerce software for thrift/secondhand retailers.",
                  role: "Product Owner",
                  dates: "2026 - Present",
                  location: "Remote",
                  bullets: [
                    "Defined and prioritized the E-commerce product roadmap, balanced customer goals, business objectives, technical improvements, and strategic initiatives.",
                    "Identified customer needs through product research, evaluated opportunities, led project shaping, and translated business needs into clear requirements, scope, and acceptance criteria.",
                    "Aligned engineering, design, customer experience, and leadership on product priorities, decisions, dependencies, and delivery expectations.",
                    "Led UX strategy and design execution, ensuring cohesive, usable experiences across E-commerce products; while supporting and mentoring designers.",
                    "Created and implemented an automated, cross-functional release management system, leveraging AI workflows for internal release notes, material distribution to Customer Support and Product Marketing triggered by QA completion, and feedback loops with clear go/no-go signals to engineers for feature launches and deployments."
                  ],
                },
                {
                  org: "Upright Labs",
                  orgDesc:
                    "Multi-channel inventory management and e-commerce software for thrift/secondhand retailers.",
                  role: "Senior Product Designer",
                  dates: "2022 - 2026",
                  location: "Remote",
                  bullets: [
                    "First design hire; led foundational customer research, problem framing, and design documentation practices.",
                    "Hired and led a team of two product designers supporting seventeen unique product areas.",
                    "Led long-term strategic product planning and drove alignment on roadmap initiatives across teams.",
                    "Built the org's first structured, evidence-based prioritization framework (RICE-based) and a full product operating system spanning signal intake through release communication.",
                  ],
                },
                {
                  org: "Movable Ink",
                  orgDesc:
                    "B2B marketing software enabling hyper-personalized messaging at scale.",
                  role: "Product Designer: Content Team",
                  dates: "2017 - 2022",
                  location: "New York, NY & Remote",
                  bullets: [
                    "Led research strategy and facilitation across product strategy, design, and development cycles.",
                    "Surfaced opportunities through design-led research, contributing to team roadmaps and strategic vision.",
                    "Partnered closely with engineers and product managers to shape direction, weigh trade-offs, and define solutions.",
                  ],
                },
                {
                  org: "Movable Ink",
                  role: "UX Designer: Prospect Journey",
                  dates: "2016 - 2017",
                  location: "New York, NY",
                  bullets: [
                    "Facilitated first-of-its-kind sales strategic research to improve the prospective client journey.",
                    "Designed low- through high-fidelity prototypes and facilitated user testing to validate hypotheses.",
                  ],
                },
              ].map((job, i) => (
                <div key={i} className="relative pl-8 border-l border-border">
                  <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-accent" />
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    {job.dates} · {job.location}
                  </p>
                  <h3
                    className="text-xl font-medium text-foreground mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {job.role}
                  </h3>
                  <p className="text-sm text-accent font-medium mb-3">{job.org}</p>
                  {job.orgDesc && (
                    <p className="text-sm text-muted-foreground italic mb-4">{job.orgDesc}</p>
                  )}
                  <ul className="space-y-2">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="text-sm text-muted-foreground leading-relaxed font-light flex gap-2"
                      >
                        <span className="text-accent mt-1">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <details className="group pl-8">
                <summary className="cursor-pointer text-sm font-medium text-accent tracking-wide uppercase list-none flex items-center gap-2 hover:opacity-80 transition-opacity">
                  Additional Work Experience (2005 - 2016)
                  <ArrowUpRight size={14} className="group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-8 space-y-10">
                  {[
                    { role: "Graphic Designer", org: "Movable Ink", dates: "2014 - 2016", location: "New York, NY" },
                    {
                      role: "Freelance Design",
                      org: "Self Employed: StringBean Studios",
                      dates: "2009 - 2014",
                      location: "Brooklyn, NY",
                    },
                    {
                      role: "Creative",
                      org: "Apple Retail: West 14th Street",
                      dates: "2010 - 2014",
                      location: "New York, NY",
                    },
                    {
                      role: "Design and Marketing Manager",
                      org: "The Grand",
                      dates: "2005 - 2009",
                      location: "Wilmington, DE",
                    },
                  ].map((job, i) => (
                    <div key={i} className="relative pl-8 border-l border-border">
                      <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-muted-foreground" />
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                        {job.dates} · {job.location}
                      </p>
                      <h4 className="text-base font-medium text-foreground mb-1">{job.role}</h4>
                      <p className="text-sm text-accent font-medium">{job.org}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-medium">
                Education
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "User Experience Design",
                    meta: "General Assembly · New York, NY · 2016 · Intensive",
                  },
                  {
                    title: "Bachelor of Fine Arts, Graphic Design",
                    meta: "Marywood University · Scranton, PA · 2002 – 2005",
                  },
                ].map((edu, i) => (
                  <div key={i} className="bg-card p-5">
                    <p className="text-sm font-medium text-foreground mb-1">{edu.title}</p>
                    <p className="text-xs text-muted-foreground">{edu.meta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="px-6 md:px-10 py-28 border-t border-border bg-muted"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-medium">
              Contact
            </p>
            <h2
              className="text-5xl md:text-6xl font-medium leading-tight text-foreground mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's work
              <br />
              together.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-md">
              Please reach out if you would like to connect! I'm open to discussions on: the magic that makes great teams, how design impacts success, or the collective movement that is the NWSL. 
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-4">
            <a
              href="mailto:lindsayunderwood@me.com"
              className="flex items-center justify-between bg-background border border-border px-6 py-5 group hover:border-accent transition-colors"
            >
              <span className="text-foreground font-medium">
                lindsayunderwood@me.com
              </span>
              <ArrowUpRight
                size={18}
                className="text-muted-foreground group-hover:text-accent transition-colors"
              />
            </a>
            <p className="text-xs text-muted-foreground text-center tracking-wide">
              Preferred method of contact
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <a
                href="https://www.linkedin.com/in/lindsaydadicunderwood/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-background border border-border px-5 py-4 group hover:border-accent transition-colors"
              >
                <span className="text-sm text-foreground font-medium">LinkedIn</span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-accent transition-colors"
                />
              </a>
              <a
                href="https://github.com/LD-U"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-background border border-border px-5 py-4 group hover:border-accent transition-colors"
              >
                <span className="text-sm text-foreground font-medium">GitHub</span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-accent transition-colors"
                />
              </a>
            </div>

            <a
              href="/LindsayDadic-Underwood_Resume.pdf"
              download="LindsayDadic-Underwood_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-accent text-accent-foreground px-6 py-5 mt-2 group hover:opacity-90 transition-opacity"
            >
              <span className="font-medium">Download Résumé</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Work detail modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div
            ref={modalRef}
            className="relative z-10 bg-card border border-border w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 bg-card/90 backdrop-blur-sm border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="relative h-56 sm:h-72 bg-muted flex-shrink-0 overflow-hidden">
              <img
                src={resolveImageSrc(selected.img, 900, 500)}
                alt={selected.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
            </div>

            <div className="p-8 sm:p-10 flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-widest uppercase text-accent border border-accent/30 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-xs tracking-widest uppercase text-muted-foreground border border-border px-2 py-0.5 ml-auto">
                  {selected.year}
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-medium text-foreground leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {selected.title}
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed font-light">
                {selected.detail}
              </p>

              {selected.fullContent && (
                <div className="space-y-8 border-t border-border pt-8">
                  {selected.fullContent.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      {section.heading && (
                        <h3 className="text-base sm:text-lg font-medium tracking-wide uppercase text-accent">
                          {section.heading}
                        </h3>
                      )}
                      {section.subheading && (
                        <h4 className="text-sm font-medium tracking-wide uppercase text-accent">
                          {section.subheading}
                        </h4>
                      )}
                      {Array.isArray(section.content) ? (
                        <ul className="space-y-2 ml-4">
                          {section.content.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground leading-relaxed font-light flex gap-2"
                            >
                              <span className="text-accent mt-1">·</span>
                              <span className="flex-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed font-light">
                          {section.content}
                        </p>
                      )}
                      {section.image && (
                        <figure className="pt-2">
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="w-full border border-border"
                          />
                          {section.image.caption && (
                            <figcaption className="text-xs text-muted-foreground font-light mt-2">
                              {section.image.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                      {section.gallery && section.gallery.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                          {section.gallery.map((img, gi) => (
                            <figure key={gi}>
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full border border-border"
                              />
                              {img.caption && (
                                <figcaption className="text-xs text-muted-foreground font-light mt-2">
                                  {img.caption}
                                </figcaption>
                              )}
                            </figure>
                          ))}
                        </div>
                      )}
                      {section.video && (
                        <figure className="pt-2">
                          <video
                            src={section.video.src}
                            controls
                            playsInline
                            className="w-full border border-border"
                          />
                          {section.video.caption && (
                            <figcaption className="text-xs text-muted-foreground font-light mt-2">
                              {section.video.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 md:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wide">
          <p>Lindsay Dadic-Underwood · Portfolio</p>
          <p>Site content last updated Summer 2026 🍉</p>
        </div>
      </footer>
    </div>
  );
}
