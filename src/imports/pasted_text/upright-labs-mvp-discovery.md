The existing ecosystem created friction in a few places:

- ISBN identification and value lookup could be slow or inconsistent
- Workflows varied significantly by org (store sorting vs centralized e-comm teams)
- Internet connectivity and “data freshness” constraints affected pricing confidence
- Listing and storage expectations (especially inventory locations) could bottleneck throughput
- Picking from dense shelving made fulfillment error-prone without better item ID strategies

### **About the company**

Upright Labs is a B2B SaaS company serving the thrift and secondhand retail industry with web and mobile products for inventory management and multi-channel e-commerce.

### **Goals for the project**

- **define an MVP** that would meet functionality and reliability objectives and deliver under a constrained deadline
- enable fast, reliable **ISBN identification** at scan-time (mobile and web)
- reduce the time and cognitive load required to make a **selling destination decision** (e-comm vs retail vs salvage vs recycle)
- define an MVP that’s **pilot-ready** without requiring major operational change
- create a path to **scale** beyond books (more product categories, marketplaces, and smarter decisioning over time)
- ship a pragmatic pricing approach that protects **minimum profit** while still supporting sell-through

### **Objective statement**

Create a database-first MVP that makes ISBN scanning a “first class action” across Link (mobile) and Lister (web/desktop): quickly identify a book, return trusted product/value data, and guide users through a streamlined workflow to sort, list, store, and fulfill—without over-scoping repricing customization.

### My **experience**

I led early discovery, research, scoping, and feature prioritization - translating research insights and operational constraints into a clearly defined MVP and go-to-market direction. My focus was to reduce risk, align stakeholders on tradeoffs, and define a workflow that could realistically succeed in beta environments with varied organization structures.

**My role**

- planned and synthesized discovery work to clarify constraints, validate assumptions, and reduce project risk
- facilitated cross-functional alignment across stakeholders, product, engineering, and customer success teams
- defined project objectives, workflow principles, and scoping tradeoffs
- documented an end-to-end experience and created artifacts that supported build planning
- 

**Cross-functional partners**

- Engineering: feasibility checks, system constraints, and implementation planning
- Product and Customer teams: pilot criteria, operational workflow validation, and adoption risk assessment

### **Discovery and Exploration**

**Research objectives**

- understand workflow variability across organizations (store sorting, warehouse QA, fulfillment)
- validate interest in store-level, tool-assisted value identification
- test early hypotheses: minimum profit control, workflow flexibility, purge-to-salvage, and picking support

**Methods (snapshot)**

- 5 customer interviews
- 5 internal validation tests
- 1 cross-functional ideation session

**Key insights**

- mobile-first workflows were viable at retail scale; Android patterns aligned with existing Link usage
- flexibility across touchpoints reduced adoption risk more than enforcing one “ideal” workflow
- inventory location timing was a major friction point → supported a “list then store” direction
- fulfillment picking needed a ticket/ID strategy to work in dense shelving environments

### **Solution direction**

**1) Database-first ISBN identification and lookup**

- fast scan-time matching via local/cache-backed access
- live lookup for unknown ISBNs with write-through to the cache
- designed to scale beyond books into broader product identification over time

**2) Destination decisioning**

A decision engine centered on:

- cached current market value (refreshed on a target cadence)
- estimated shipping cost (dimensions/weight)
- admin-set minimum profit
- user-entered condition (plus optional condition details)

**3) Pricing automation (MVP tradeoff)**

To keep the MVP shippable and consistent with the “low-change-frequency” majority of customers:

- set initial price from market data
- reduce price over time via listing strategies
- never drop below minimum profit
- defer deeper “real-time market trend repricing” customization to later phases

**4) End-to-end workflow**

Scan ISBN → identify product → destination decision → capture condition → create draft/listing and print ticket → store later (ticket and location) → auto-list eligible items → fulfillment picking supported by ticket/ID

### **Outcomes**

At the end of this phase, I delivered:

- a clear MVP strategy anchored on database performance and workflow flexibility
- documented tradeoffs and decisions (especially repricing scope)
- pilot criteria and a rollout/engagement plan to validate in real operations
- design exploration artifacts (batch listing concepts, touchscreen accessibility-forward UI directions, haptic/audio feedback principles, unit tracking taxonomy)

### **Learnings**

- In operationally complex domains, the best MVPs reduce change resistance by supporting multiple valid workflows—not by forcing one “perfect” process.
- Clear tradeoff documentation (what’s *explicitly* out of scope and why) speeds alignment and protects teams from scope creep.