// Sample knowledge, lifted from the approved mockup (ava-mockup/index.html). Not real knowledge yet:
// replace with approved items read from AVA's own database. Approved items only: the chat never draws on anything else.

export interface Category {
  id: string;
  name: string;
  owner: string;
  desc: string;
  explores: string[];
  ask: string[];
}

export type ItemType = "Principle" | "Story" | "Explanation" | "Process" | "Standard" | "Reference";

export interface Item {
  cat: string;
  title: string;
  type: ItemType;
  stream: string;
  /** ISO date the owner must review it by. */
  review: string;
  /** Where it came from. */
  doc: string;
  summary: string;
  points: string[];
  /** Draws on Sam's thinking: voice or attribution use needs his approval. */
  sam?: boolean;
}

// One stream is live so far. Add the others here as they open; the brain page's filter appears when there is more than one.
export const STREAMS = ["Enterprise documents"];

export const CATS: Category[] = [
  { id: "identity", name: "Identity & Purpose", owner: "Sam Khalil",
    desc: "Who imagina is, why it exists and what it is oriented towards.",
    explores: ["Identity as orientation", "Mission", "The founding vision", "Refounding"],
    ask: ["What is imagina's mission?", "What does 'imagine a company' mean?"] },
  { id: "principles", name: "Principles & Covenant", owner: "Sam Khalil",
    desc: "The decision laws imagina holds, and the refusals it binds itself to under pressure.",
    explores: ["Truth", "Architecture", "Wisdom", "Codification", "Character under pressure"],
    ask: ["What are the three laws?", "What does reality before story mean?"] },
  { id: "formation", name: "Formation & Alignment", owner: "Mel Horton",
    desc: "How imagina forms people, meaning and systems, and keeps them aligned.",
    explores: ["Formation first", "The Bolshoi model", "Practitioner, Instructor, Author", "Recognition", "Relational alignment", "Internal alignment"],
    ask: ["What is the Bolshoi model?", "What are the three laws of alignment?"] },
  { id: "standards", name: "Coherent Creation & Standards", owner: "Mel Horton",
    desc: "The tests every piece of work passes before it is released.",
    explores: ["Standards of Reality", "NAME-T", "SLAP-T", "LIVE-T", "SIGNAL-T", "Diamond Compression", "Visual Physics"],
    ask: ["What is NAME-T?", "How does work get released?"] },
  { id: "stewardships", name: "Stewardships & Roles", owner: "Lauren Gallagher",
    desc: "The four stewardships that guard the business against decay, and how people carry it.",
    explores: ["Culture", "Treasury", "Gravity", "Fidelity", "Contextual authority"],
    ask: ["What does Gravity steward?", "What is Fidelity?"] },
  { id: "enterprise", name: "The Enterprise & Ventures", owner: "Rohan Peterson",
    desc: "How imagina is built as a system, and what each venture is for.",
    explores: ["Three layers of infrastructure", "Core operating system", "Imagina and ATLAS", "DPN", "Property Valet", "Obsidion", "Occuppi", "Formo"],
    ask: ["What does each venture do?", "What is ATLAS?"] },
  { id: "operations", name: "Operations & Services", owner: "Jacques Folkers",
    desc: "What imagina's businesses do for customers and partners, and how the work moves day to day.",
    explores: ["INFINA", "Meridian", "Property Valet", "DPN referrals", "Deal pipeline", "Exchange and settlement", "Partner referrals", "Group privacy"],
    ask: ["What is INFINA?", "What are the stages from EOI to complete?"] },
  { id: "brand", name: "Brand: Design & Voice", owner: "Aaron Egan",
    desc: "How imagina looks and sounds, every time.",
    explores: ["Imagina Voice", "Wit with the reader", "The dinner-party test", "Design language", "Forbidden patterns"],
    ask: ["What are the four qualities of Imagina Voice?", "What is never done in the design language?"] },
  { id: "platform", name: "ATLAS Platform & Delivery", owner: "Upcoming Principal Engineer",
    desc: "How ATLAS and its apps work, and how an idea becomes a live app.",
    explores: ["Sign in once", "Roles and access", "The apps", "Delivery pipeline", "Shared UI library"],
    ask: ["How do staff sign in to ATLAS?", "How does an idea become a live app?"] }
];

const N = (cat: string, title: string, type: ItemType, review: string, doc: string, summary: string, points: string[] = []): Item => ({ cat, title, type, stream: "Enterprise documents", review, doc, summary, points });
const BB = "Business Being slide deck", FF = "The Formation of Formation (Sam Khalil)", BI = "The Being of Imagina", TL = "The Three Laws of Alignment", CC = "Coherent Creation (Sam Khalil)", IV = "Imagina Voice v2.1", DL = "Imagina Design Language v1.0", PL = "ATLAS Delivery Pipeline (ATLAS-PIPE-01)";
export const ITEMS: Item[] = [
  /* Identity & Purpose */
  N("identity", "Identity: we imagine and build better living", "Principle", "2027-04-15", BB,
    "Imagina's identity is that we imagine and build better living, so beautiful realities can be lived. It names an orientation, not an outcome. We may fail at outcomes, but we do not fail at orientation: even in failure, we fail in the direction of liveability.",
    ["Identity governs what we imagine, what we build, what we refuse to build, how we judge success and where we exercise restraint.", "Identity is orientation, not aspiration.", "If identity fragments, everything below it fragments."]),
  N("identity", "Mission: come imagine, come build, come live", "Principle", "2027-04-15", BB,
    "The mission is to make better living real for millions. It is intentionally simple and invitational: different ventures, same cause. It governs why we act and to what end, not how we operate.",
    ["We imagine and build so beautiful realities can be lived.", "Come imagine. Come build. Come live."]),
  N("identity", "Imagine a company: the founding vision", "Story", "2027-04-15", BB + ", restated by Sam Khalil, Jan 2026",
    "The founding vision imagines a company that begins with real people, takes imagination seriously as the courage to see what could be, tells the truth, forms people rather than roles and refuses to exist only for what it can take. It sits alongside identity as story.",
    ["Beauty without life is decoration, and life without beauty is survival.", "A company that returns power rather than taking it away.", "Success is measured by the lives that flourish because of it, far beyond those it will ever profit from."]),
  N("identity", "Refounding on identity", "Explanation", "2027-04-15", BB,
    "DPN was founded 30 years ago, and imagina is now refounding on identity. The Business Being presentation is not a strategy, an org chart or a systems rollout. It is a civilisational expression of the business, so that its identity comes into being.",
    ["Identity is orientation, not aspiration.", "It defines who we are, what we are committed to and how we build."]),

  /* Principles & Covenant */
  N("principles", "The three irreducible laws: truth, architecture, wisdom", "Principle", "2027-04-15", BB,
    "Every civilisation stands or falls on three realities: truth, architecture and wisdom. Truth collapses when reality is hidden or edited, architecture erodes when systems are added without design intent, and wisdom is lost when complexity outpaces human capacity. They are not rules to follow but the character a civilisation forms.",
    ["Truth asks: what is actually happening?", "Architecture asks: is this built to last and carry life over time?", "Wisdom asks: can humans live here well?"]),
  N("principles", "Reality before story", "Principle", "2027-04-15", BB,
    "We act on what is actually real. Plans, ideas and intentions do not create reality, they respond to it. If reality is not clear yet, we wait.",
    ["We refuse to proceed when reality is unclear, let ego replace clarity, or shape the story to protect momentum or comfort.", "It protects us from blind spots, rushing, bull, spin and gossip."]),
  N("principles", "One account of reality", "Principle", "2027-04-15", BB,
    "There is one shared account of what happened, used for learning, decisions and accountability. New facts may refine it. Saving face may not.",
    ["We refuse to edit the past to protect reputation, or to run different versions of events for different people.", "It protects us from reinterpretation, face-saving, conflicting accounts, lost lessons and eroding trust."]),
  N("principles", "Architecture before execution: how a project begins", "Principle", "2027-04-15", BB,
    "Design intent must exist before we build, scale or optimise, and that is how any project begins: design is clarified before we start, structure is shaped before work is distributed and sequencing is decided before speed is applied. Execution without architecture does not save time, it transfers cost to people, systems and trust.",
    ["The posture is: this needs design first.", "It protects us from rework, heroics, tool-led thinking, premature scale and hidden cost."]),
  N("principles", "Design has consequences", "Principle", "2027-04-15", BB,
    "Everything we design shapes behaviour. Structures make some actions easy and others costly, and quietly reward some behaviours over others. So we do not blame people for behaviour poor design produces, and we do not automate something we do not yet understand.",
    ["If the consequences are unclear, we pause and redesign.", "If the consequences are harmful, we do not proceed."]),
  N("principles", "Can humans live here well?", "Principle", "2027-04-15", BB,
    "Wisdom is not about how clever a system is, it is about whether people can live inside it well. Systems must fit human limits, complexity must be carried by design rather than by people, and progress must not depend on constant urgency.",
    ["Wisdom governs simplicity, pace, human load and liveability.", "We refuse systems people can survive but not live inside.", "At its core it protects human dignity over performance."]),
  N("principles", "Pace must preserve life", "Principle", "2027-04-15", BB,
    "Speed is not the enemy, unexamined speed is. Pace is chosen, not defaulted, and urgency must be justified by reality, not adrenaline. Fast movement is fine while people can still think clearly, judgment is not bypassed and recovery is possible.",
    ["Wisdom asks: how fast can we go and still remain human?", "Speed that trades health, family or conscience for delivery is not speed, it is erosion."]),
  N("principles", "Codification: why we capture what we know", "Principle", "2027-04-15", BB,
    "Codification is the practice of distilling, naming, preserving and transmitting meaning. It is why imagina captures what it knows: wisdom survives scale and clarity outlives individuals, so the business does not depend on memory, heroics or vibes. It does not reduce life to rules.",
    ["Without it, wisdom stays trapped in individuals and meaning fractures as the organisation grows.", "With it, complexity is carried by the system and judgment becomes shared."]),
  N("principles", "The covenant: truth over advantage", "Principle", "2027-04-15", BB,
    "Character is what shows up under pressure, and a business being is no different. Imagina binds itself to refusals regardless of incentive: it will not violate truth, architecture or wisdom. When pressure reveals who we are, we choose truth over advantage, architecture over momentum and life over performance.",
    ["If truth costs us speed, approval or comfort, we choose truth.", "If architecture costs us time, we choose architecture. If wisdom costs us efficiency, we choose life.", "The covenant binds the organisation, so no individual carries the moral cost alone."]),

  /* Formation & Alignment */
  N("formation", "The being of imagina: formation first", "Principle", "2027-05-20", BI,
    "Imagina does not begin with product or service, it begins with formation. We form meaning so it transmits without distortion, people so they can deliver it faithfully and systems so they hold under pressure. Formation becomes transmission, transmission becomes service and service becomes product.",
    ["If formation is weak, everything downstream degrades.", "Form is not aesthetic or style. It is discipline made visible.", "Formation produces wholeness, and wholeness produces inevitability."]),
  N("formation", "The Bolshoi model", "Explanation", "2027-05-20", FF,
    "The Bolshoi Ballet endures not through talent alone but through form: non-negotiable standards, constant correction and daily discipline. Imagina borrows the model. No one performs without form, and no one advances without discipline.",
    ["Daily discipline: fundamentals repeated, placement corrected, form refined.", "Poor form shows up as ambiguity, friction, poor thinking, misaligned incentives and wasted time.", "We do not call people out. We call people up."]),
  N("formation", "Formation levels: Practitioner, Instructor, Author", "Process", "2027-05-20", FF,
    "A Practitioner executes with correct form. An Instructor sees and corrects form and never passes forward unformed work. An Author designs the system others operate within. Levels are named by those who have mastered form, never self-declared, and progression follows demonstrated form rather than tenure or title.",
    ["Practitioner is the minimum, Instructor the expectation, Author the trajectory.", "Any work we develop has been tested, is clear, is complete and has removed friction."]),
  N("formation", "Correction is formation, not criticism", "Principle", "2027-05-20", FF,
    "Correction is not personal, it is the path to form. If someone responds to correction with defensiveness, they do not progress, and no one is above correction. If there is friction, we do not defend it, we eliminate it.",
    ["Resistance is a posture problem. If it is not corrected, it becomes a position problem.", "Form is not what we say, it is what we consistently produce."]),
  N("formation", "The three laws of alignment", "Principle", "2027-05-20", TL,
    "Reality must be recognised, shared and held with integrity. Alignment has to hold across reality, relationships and self at all times, and if one breaks they all do. Together they form perception, coherence and integrity.",
    ["No recognition leads to blindness, no relational alignment to distortion, no internal alignment to inconsistency.", "Recognition is how truth is seen, relational alignment how it is shared, internal alignment how it is held."]),
  N("formation", "Law of Recognition: see reality clearly", "Principle", "2027-05-20", TL,
    "Reality is recognised where humility, openness and curiosity keep the lens of learning clear, and blocked where pride, defensiveness and premature certainty distort it. Truth does not fail to exist, it fails to get through. Recognition runs from perception to recognition to insight.",
    ["When conversations close, ask: are we defending or learning? What might we be missing? Is this confidence or assumption?", "Healthy organisations let uncomfortable truths surface early, and junior voices challenge senior ones."]),
  N("formation", "Law of Relational Alignment", "Principle", "2027-05-20", TL,
    "Alignment between people is not optional. Where relationships are misaligned, reality distorts, and anything built on that fracture inherits it. Alignment needs tension surfaced, truth spoken directly, disagreement engaged and distortion removed, and it comes before momentum, performance and scale.",
    ["Misalignment persists where it is unspoken, avoided, deferred or normalised.", "Speed, output and success do not correct relational distortion. They often conceal it."]),
  N("formation", "Law of Internal Alignment", "Principle", "2027-05-20", TL,
    "A divided self cannot stay aligned with reality or others. Where identity is divided, belief, motive, word and action fragment, and where they align, integrity stabilises. It is not a failure of effort, it is a failure of alignment.",
    ["Signs of misalignment: action replaces clarity, confidence masks uncertainty, urgency overrides truth, performance substitutes for presence.", "Pressure is passed down instead of held."]),

  /* Coherent Creation & Standards */
  N("standards", "Coherent Creation: how work is released", "Process", "2027-05-12", CC,
    "Coherent Creation moves work from concept to release through four tests, run in order: Standards of Reality, Diamond Compression, Visual Physics, then External Scrutiny. Work is released when it passes Standards of Reality and Diamond Compression and has faced external scrutiny. The person responsible decides when it is ready.",
    ["If the tests conflict, Standards of Reality prevails. Diamond Compression refines within its bounds.", "If there is disagreement, the final decision-maker makes the call."]),
  N("standards", "Standards of Reality: NAME-T, SLAP-T, LIVE-T, SIGNAL-T", "Standard", "2027-05-12", CC,
    "Four tests, not policies, preferences or trends. NAME-T tests language, SLAP-T tests structure, LIVE-T tests practice and SIGNAL-T tests signal. Language drifts first, then systems decay, then cultures fracture, and when transmission breaks nothing else holds.",
    ["If you name it, you NAME-T it. If you build it, you SLAP-T it.", "If you expect it to be used, you LIVE-T it. If you communicate it, you SIGNAL-T it."]),
  N("standards", "NAME-T: have you named it?", "Standard", "2027-05-12", CC,
    "Run before anything launches or is taught. Nature: is it true to what it is? Alignment: does it drive the right behaviour? Minimal: is it as precise as possible? Endurance: will it stay accurate in five to ten years?",
    ["Truth beats trend. Direction beats decoration.", "Clarity beats clever. Longevity beats novelty."]),
  N("standards", "SLAP-T: have you built it simply?", "Standard", "2027-05-12", CC,
    "Run before anything ships, scales or is taught. Simple, Language, Application, Possible: as simple, as clear and as easy to use as possible. Possible is the operative word: not perfect, refined.",
    ["If it feels heavy early, redesign it.", "If it cannot be used immediately, it fails. Use beats elegance."]),
  N("standards", "LIVE-T: can it be lived?", "Standard", "2027-05-12", CC,
    "Run before anything becomes required. Liveable: can real people use it consistently? Intuitive: does it make sense without heavy explanation? Viable: will it function under pressure? Endurance: can it be used over time?",
    ["Reality beats theory. Use beats instruction.", "Performance beats promise. Steadiness beats momentum."]),
  N("standards", "SIGNAL-T: did the meaning arrive?", "Standard", "2027-05-12", CC,
    "Run only after NAME-T passes, on anything communicated. Six tests: signal exists, interference, grounding, navigation, load and arrival. If a reaction disappears with different wording, the wording is the problem. If it persists, the claim is.",
    ["The response is one of: hold, replace, clarify, or restrict context.", "Unfamiliar language is a navigation problem. Prior associations with the wording are interference."]),
  N("standards", "Diamond Compression", "Standard", "2027-05-12", CC,
    "A precision instrument that strengthens language, structure and signal by removing excess. It asks four questions: cut (have we removed what is unnecessary?), clarity (is it free of overlap and contradiction?), color (does it signal with integrity?) and carat (does it carry substance?).",
    ["It does not change reality. It sharpens how reality is expressed.", "Overuse thins substance. Underuse creates noise."]),
  N("standards", "Visual Physics: the attention test", "Standard", "2027-05-12", CC,
    "A practical test for pages, slides, graphics, interfaces, signage and motion: if attention fractures, meaning collapses. Check hierarchy, contrast, legibility, density, precision and congruence, and fix them in that order. The primary message must be unmistakable within three seconds.",
    ["Settle a dispute with three checks: black and white, phone size, a 3 to 5px blur.", "Meet WCAG AA minimums. If it requires explanation to feel coherent, it fails."]),

  /* Stewardships & Roles */
  N("stewardships", "The stewardship quartet: Culture, Treasury, Gravity, Fidelity", "Explanation", "2027-06-10", BB,
    "These are not departments that execute tasks. They are stewardships that protect the business from specific forms of decay, and each guards a different risk. Together they keep the business whole.",
    ["Culture stewards formation and belonging, Treasury stewards time, capital and future trust.", "Gravity stewards how the business is felt, Fidelity stewards continuity, systems and trust over time."]),
  N("stewardships", "Culture: formation and belonging", "Principle", "2027-06-10", BB,
    "Culture exists to form people, not manage them. It stewards how people become who they are becoming, how power is experienced day to day, how belonging is offered and how truth is spoken when it would be easier to stay silent. The question it asks: who are people becoming by living inside this organisation?",
    ["Healthy culture: behaviour aligns without enforcement and truth can be spoken without fear.", "It protects against coercion disguised as performance and burnout normalised as commitment."]),
  N("stewardships", "Treasury: time, capital and future trust", "Principle", "2027-06-10", BB,
    "Treasury stewards time horizons, capital allocation, risk, leverage and the promises made to the future. It decides whether the business is planting orchards or strip-mining the present. When treasury is weak, the future pays for the present.",
    ["It protects against short-termism disguised as ambition and prosperity built on invisible debt.", "Its question: is the future being honoured or consumed?"]),
  N("stewardships", "Gravity: how the business is felt", "Principle", "2027-06-10", BB,
    "Gravity stewards language, brand, signal integrity, communication at every public touchpoint and reputation as a cumulative reality. It does not invent reality, it expresses it, and it is stewarded by the team called Gravitas. Gravity is not hype, it is weight.",
    ["We do not chase attention. We become so real, so coherent and so trustworthy that attention moves toward us.", "Gravity must always sit downstream of truth, architecture and wisdom."]),
  N("stewardships", "Fidelity: nothing essential is lost", "Principle", "2027-06-10", BB,
    "Fidelity stewards continuity of truth across systems and time, the integrity of ATLAS as the shared source of reality and the lineage of decisions and design intent. It ensures nothing essential is lost when something is improved.",
    ["It protects against system drift, silent loss of history and decisions that become untraceable.", "When fidelity is strong, transformation creates confidence."]),
  N("stewardships", "Roles: authority goes to whoever is closest", "Principle", "2027-06-10", BB,
    "Roles are how people make the business real. Authority is contextual and goes to whoever is closest to the problem. Status is irrelevant, so a title does not decide a contribution. Responsibility is real: it is owned, not delegated or pushed up the chain.",
    ["The enterprise is carried by people who choose to own it."]),

  /* The Enterprise & Ventures */
  N("enterprise", "Infrastructure in three layers", "Explanation", "2027-06-25", BB,
    "Infrastructure carries reality, preserves memory and enables coordination at scale. Foundational infrastructure defines what is real, enabling infrastructure coordinates action and expressive infrastructure carries experience. When infrastructure is weak, people compensate. When it is clear, they are freed to act with judgment and care.",
    ["Foundational: ATLAS and the core operating system.", "Enabling: products and services, tools and platforms, customer-facing systems.", "Expressive: the ventures, where the business is experienced."]),
  N("enterprise", "Foundational infrastructure: ATLAS and the operating rhythm", "Explanation", "2027-06-25", BB,
    "ATLAS is the canonical source of truth. It preserves one shared account of reality and carries relational truth (such as CRM) and operational truth (such as BI). It does not grow by accumulation, it grows by design. Around it sits a social operating system of design meetings, governance rhythms and planning cadences.",
    ["Design meetings are where project plans are developed so architecture-led creation occurs.", "Governance rhythms review reality before it becomes urgent. If everything feels last-minute, sequencing has failed."]),
  N("enterprise", "Enabling infrastructure", "Explanation", "2027-06-25", BB,
    "Enabling infrastructure allows coordinated action without coercion: products and services, tools and platforms, and customer-facing systems. A tool that pushes outcomes instead of supporting judgment violates wisdom, and if trust depends on persuasion, something upstream is broken.",
    ["Customer-facing systems should be honest, paced and coherent, never high-pressure or scripted to hide reality."]),
  N("enterprise", "Expressive infrastructure: ventures", "Explanation", "2027-06-25", BB,
    "Expressive infrastructure is where the business is experienced. The ventures are DPN, Property Valet, Obsidion, Occuppi and Formo, and each looks different, but each must never define reality, must obey the principles and must reinforce the covenant. People do not experience principles, they experience products, places, tools and interactions.",
    ["If it is misaligned, no amount of good intent will compensate.", "If it is aligned, people feel coherence without it being explained."]),
  N("enterprise", "Imagina and ATLAS: the source and the threshold", "Explanation", "2027-06-25", BB,
    "Imagina is the source: the generative substrate of all thinking, design and creation. It sits below the line, not lower but deeper. ATLAS is the operating system and the threshold between imagination below and execution above. It organises, standardises and enables everything else to function.",
    ["Imagina is not a brand in the system. Everything comes through it.", "ATLAS translates imagination into structure."]),
  N("enterprise", "DPN: the wealth layer", "Reference", "2027-06-25", BB,
    "DPN is where the system connects to the individual. It is the platform that enables access to property investment, structured, scalable and accessible. It enables entry, supports growth and builds independence. Gold represents it.",
    ["It operates at the level of individual participation."]),
  N("enterprise", "Property Valet: the service layer", "Reference", "2027-06-25", BB,
    "Property Valet is the service layer that makes everything work day to day. It ensures assets are managed, maintained and performing as intended. It supports operations, maintains standards and enables continuity. Bronze represents it.",
    ["Bronze stands for durability, service and time-tested function."]),
  N("enterprise", "Obsidion: the precision layer", "Reference", "2027-06-25", BB,
    "Obsidion operates at the level of financial clarity. It brings structure, precision and control to complex financial systems: it defines clarity, enables precision and delivers control. Volcanic titanium represents it.",
    ["It is described as the culmination of the system."]),
  N("enterprise", "Occuppi: the scale layer", "Reference", "2027-06-25", BB,
    "Occuppi is an institutional Build-to-Rent platform focused on accessibility to housing at scale. It is the system through which housing is delivered at scale, structured, repeatable and accessible. Aluminium represents it.",
    ["It operates at the level of delivery."]),
  N("enterprise", "Formo: the creation layer", "Reference", "2027-06-25", BB,
    "Formo is where the system becomes physical. It operates at the level of fabrication, translating ideas into built form so housing is designed and built differently. It shapes structure, enables production and delivers innovation. Formium represents it.",
    ["Advanced engineering, precision manufacturing and future materiality."]),

  /* Operations & Services */
  N("operations", "How the services fit together", "Explanation", "2027-07-15", "INFINA partner page, Property Valet site, portal catalogue",
    "Imagina's businesses meet customers at different points. DPN is the access layer for property investment. INFINA brings new-build opportunities to selected buyers agents, delivered on Meridian. Property Valet manages the property from handover. Deals and referrals are tracked end to end in Mercury.",
    ["DPN-referred customers flow to Property Valet, and the stage names carry that through.", "Each business keeps its own customer information by default."]),
  N("operations", "INFINA: the white-label new-build partner", "Reference", "2027-07-15", "INFINA partner page",
    "INFINA is a private stock, content and acquisition delivery platform for selected buyers agents. It gives them new-build capability without building another business behind them, and works with a deliberately small network. Opportunities, research and collateral carry the agent's brand, and the agent stays the face of the relationship.",
    ["Delivered on Meridian, a property sales and customer journey platform operated by Imagina.", "No email chains. No spreadsheets with seven tabs."]),
  N("operations", "INFINA: the eight-step journey", "Process", "2027-07-15", "INFINA partner page",
    "The agent identifies a client suited to new-build. When the brief is ready, INFINA brings the opportunities and the agent presents curated, investment-grade stock. An expression of interest secures the property, then INFINA coordinates contracts and acquisition, handles settlement behind the agent's brand, liaises with the builder through to handover and keeps the agent visible at every stage.",
    ["Contracts and acquisition cover solicitors, land and build contracts and unconditional exchange.", "MERCI marks each build milestone for the client, under the agent's brand.", "At handover, Property Valet is available to support management. The relationship stays with the agent."]),
  N("operations", "Meridian: the stocklist and customer journey", "Reference", "2027-07-15", "Meridian documentation",
    "Meridian is the stocklist and customer-journey portal used by imagina staff and external agency partners. Partners are granted access to properties in the stocklist through an expression of interest, and once a customer commits, their deal is followed through the customer journey. Some properties also have a subdivision proposal document generated for them.",
    ["Staff sign in through the ATLAS portal. Partners have their own login.", "PDFs of the stocklist, subdivision proposals and EOIs are generated in the app."]),
  N("operations", "The deal pipeline: from EOI to complete", "Process", "2027-07-15", "Meridian documentation",
    "A deal moves through nine stages: EOI, EOI Executed, Initial Deposit, Contracts Issued, Contracts Signed, Exchanged, Settled Pre-site, In Construction and Complete. A deal's current stage is the furthest one it has reached. Lost is a separate end state a deal can fall into from any stage, not a step forward.",
    ["After the deposit, stages are synced from Mercury.", "Signed documents are filed in Box."]),
  N("operations", "Expressions of interest", "Process", "2027-07-15", "Meridian documentation",
    "An expression of interest is how a partner secures a property for a customer. It is lodged through Meridian, where the customer signs in a guided in-app wizard, reached by a personal link rather than a login. Once signed, the document is filed in Box and the deal enters the pipeline.",
    ["The link carries its own permission, so it works without an account.", "It is the first stage of the deal pipeline."]),
  N("operations", "Property Valet: not managed, cared for", "Reference", "2027-07-15", "Property Valet website",
    "Property Valet is premium residential property management for investors across NSW, QLD and VIC: one team, one standard, three states. It describes itself as a property stewardship business and a wholly owned member of the Imagina Group. The idea is simple: a valet is someone you hand something you care about to, and you should not have to keep chasing.",
    ["Not managed. Cared for.", "Covers Sydney, Newcastle, Brisbane, Gold Coast and Melbourne."]),
  N("operations", "Property Valet: referral partners", "Process", "2027-07-15", "Property Valet portal documentation",
    "Buyers agents, accountants and advisors refer clients to Property Valet. They keep the client relationship and Property Valet delivers the standard. A referral needs no approval: it creates the customer and opens the opportunity in Mercury, and partners follow it in the portal. Staff see every partner's referrals, partners see only their own.",
    ["Stages: lead received, customer engaged, agreement sent, agreement returned, pending handover, completed.", "Stages move only when Mercury moves them. A lost deal shows its reason to the partner."]),
  N("operations", "Property Valet: tenant support and maintenance", "Process", "2027-07-15", "Property Valet website",
    "Tenants submit maintenance requests through their PropertyMe tenant portal, on a computer or in the PropertyMe for Tenants app. For urgent after-hours repairs, tenants use the trade contacts listed on their lease agreement.",
    ["Maintenance, lease enquiries, emergency repairs and rental support."]),
  N("operations", "Privacy across the imagina group", "Principle", "2027-07-15", "Property Valet privacy policy",
    "Information a customer gives Property Valet is held by Property Valet and is not automatically shared with other Imagina Group entities. It is shared only where it is directly necessary for the service, where the customer has asked for support in another area, or where they have given clear consent. Sharing for marketing needs clear consent.",
    ["Sharing is limited to what is relevant and reasonably necessary for the agreed purpose.", "Information collected includes contact, identity, banking and tenancy details, so it is handled carefully."]),
  N("operations", "Exchange tracking and finance specialists", "Process", "2027-07-15", "Portal app catalogue",
    "The Exchange Spreadsheet tracks customer exchange opportunities from active through to settled, with a finance specialist assigned to each. Opportunities are grouped by what is next: awaiting exchange, approaching settlement, awaiting build finance, approaching handover and settled.",
    ["View access is read-only. Contributors and above can change opportunities."]),
  N("operations", "Lead allocation", "Process", "2027-07-15", "Portal app catalogue",
    "Lead Allocation distributes leads, EOIs, servicing, assessments, applications and rate reviews to the team, month by month. It is under construction and will go live once its address is deployed.",
    ["View is read-only. Edit adds rows and allocates them."]),
  N("operations", "Depreciation requests and insurance applications", "Process", "2027-07-15", "Portal app catalogue",
    "For depreciation, documents are uploaded at property completion, the AI-filled request is reviewed and it is sent to Washington Brown. For landlord insurance, the EBM form fills RentCover applications from the documents, the client checks and signs, and the application goes to EBM.",
    ["A person reviews the AI-filled request before anything is sent."]),
  N("operations", "Fact finds", "Process", "2027-07-15", "Portal app catalogue",
    "The Fact Find app captures and manages customer fact finds. Staff sign in through ATLAS, and its customer-facing wording follows Imagina Voice, where wit lives in the framing around a field and never inside what is recorded.",
    ["A fact find holds personal and financial detail, so it sits outside what AVA draws on."]),
  N("operations", "Mercury: the record for deals and referrals", "Reference", "2027-07-15", "Meridian and Property Valet portal documentation",
    "Mercury is where deal and referral stages are held. Meridian syncs deal stages after the deposit through a webhook, and the Property Valet portal moves a referral's stage only when Mercury does. If Mercury fails when a referral is created, the referral is kept and the team is told to add it by hand.",
    ["One source for stages means partners and staff see the same answer."]),
  N("operations", "Tools for running the team", "Reference", "2027-07-15", "Portal app catalogue",
    "Onboarding gives new starters everything they need to get set up. Tasks tracks the team's to-dos, categories and recurring work. Surveys creates and publishes staff surveys and shows results. Tests sends timed assessments to candidates and reviews results. PIP is the Property Investment Plan for staff. Apprecier is the recognition app.",
    ["Surveys is hidden entirely from roles with no access, even when a survey is published."]),

  /* Brand: Design & Voice */
  N("brand", "Imagina Voice: the four qualities", "Reference", "2027-03-01", IV,
    "Imagina Voice has four qualities, held in strict order: clarity, confidence, wit and inspiration. Clarity and confidence are always required. Wit and inspiration are applied according to context, never forced. Dry is not a safe default, a functional but flat piece of copy is a failure state.",
    ["Clarity is the foundation: understood in one read, or it fails.", "Confidence is the posture: decided, never thinking out loud.", "Wit is the edge. Inspiration is the depth, best cut by a reviewer."]),
  N("brand", "Wit with the reader, never at them", "Principle", "2027-03-01", IV,
    "Wit is load-bearing, not garnish, and the drier the artefact the harder it has to work: a compliance form needs wit more than a billboard does. It is with the reader, never at them, true first and funny second. In the room where someone is hurting, warmth stays and wit stays home.",
    ["The test: does this make the reader feel smarter and lighter, or smaller? If smaller, cut it.", "Wit lives in the framing around a field, never inside what is recorded."]),
  N("brand", "The dinner-party test", "Principle", "2026-09-30", IV,
    "Would they go home and tell someone? That is the standard every piece of copy is held to. A form, portal screen or proposal that nobody would ever mention was not actually finished, so rewrite it.",
    ["If copy sounds like it could have been written by anyone, delete it and rewrite it."]),
  N("brand", "Copy by context", "Process", "2027-03-01", IV,
    "Transactional copy needs clarity and confidence, with wit optional. Customer-facing forms, FAQs and onboarding are where wit does real work. Marketing dissolves a reader's hesitation with them and never mocks their prior behaviour. Support, incident and complaint copy drops wit entirely and leans on calm, reassuring confidence.",
    ["Every string a customer or partner reads counts: labels, empty states, toasts, emails, PDFs."]),
  N("brand", "Imagina Design Language: the rules", "Reference", "2027-03-01", DL,
    "Design language governs how things are presented. The palette is monochrome by default, with three approved status colours for active, pending and error. Several patterns are never used: colour accents without meaning, drop shadows on cards or modals, pill buttons, floating labels, zebra striping, all-caps button labels and centred text in functional UI.",
    ["Corner radius is 4px at most.", "Design language is how things look. Voice is what they say."]),
  N("brand", "Design tokens and the shared UI library", "Reference", "2027-03-01", DL,
    "The design language lives in one machine-readable token file, and every ATLAS app builds its interface from the shared UI library rather than hand-rolling components. If the library has no component for something, the app builds it from the library's tokens and says so, instead of inventing a new visual style.",
    ["One primary button per view, ghost or text for the rest.", "No new colours."]),

  /* ATLAS Platform & Delivery */
  N("platform", "Atlas 1.0: staff sign in once", "Explanation", "2027-01-25", "Portal documentation",
    "Staff sign in once at the ATLAS portal with Microsoft Entra, and every app recognises them through a shared sign-in that lasts eight hours. Apps keep no staff session of their own. Signed-out visitors are sent to the portal and back, and signing out ends the session everywhere.",
    ["Atlas 1.0 was named on 21 October 2026, when every app moved to portal sign-in.", "A small number of apps keep a separate login for non-staff, such as partners and external guests."]),
  N("platform", "Roles and app access", "Reference", "2027-01-25", "Portal documentation",
    "There are four roles. Super Admin gets every app plus the portal console, excluding People & Culture. Culture Contributor is Contributor plus People & Culture in Enterprise Map. Contributor can edit within permitted apps. User is read-only where an app supports it. Each person also has a list of permitted apps, and unticked means no access.",
    ["Apps read each person's access live, so a change on the Users tab applies straight away.", "Some apps limit which roles can use them."]),
  N("platform", "The apps in ATLAS", "Reference", "2027-01-25", "Portal app catalogue",
    "ATLAS carries the Enterprise Map, Meridian, Vision Day, Tasks, Exchange Spreadsheet, Lead Allocation, Depreciation Requests, EBM Form, Fact Find, Property Valet Portal, Surveys, Tests, Systems Map, Onboarding and PIP. Each opens in its own tab from the portal grid.",
    ["Enterprise Map: organisational structure as an interactive solar system.", "Meridian: the stocklist and partner portal.", "Systems Map: read-only documentation of the systems landscape.", "Lead Allocation is under construction."]),
  N("platform", "How an idea becomes a live app", "Process", "2027-02-20", PL,
    "An app moves through four stages: Brief, Figma, Dev and Publish. The brief defines intent and scale before anyone opens a design tool. Figma is where every visual decision is made. A developer builds a live, editable app from the approved design, and publishing to production is automatic.",
    ["No screens are drawn against an unsigned brief.", "No colour, shadow or shape outside the approved design standards leaves the design stage.", "Content that stays editable loops through Builder.io."]),
  N("platform", "One record of every project", "Explanation", "2027-02-20", PL,
    "The plan is for atlas-tasks to hold the one real record of every project: its stage, owner and a plain-English log of what changed, written automatically when a developer makes a change. The portal only displays it and never keeps a separate copy, so there is one answer to what the status of a project is.",
    ["The project-tracking part of atlas-tasks is planned, not yet built."]),
  N("platform", "Which apps stay editable after launch", "Reference", "2027-02-20", PL,
    "Marketing and content sites, such as the landing page, infina-landing and the Obsidion page, are fully editable through Builder.io. The portal has some editable sections. Data-driven apps behind sign-in, such as Tasks, StockList, Enterprise Map, Meridian and Vision Day, are dev-only.",
    ["Editable content is written as a prop from the start, so connecting it later is a registration step, not a rebuild."]),
  N("platform", "Adding a new app to ATLAS", "Process", "2027-02-20", "Portal documentation",
    "A new app is scaffolded in the current pattern, with portal sign-in and the shared design tokens. It is then registered in the portal's app catalogue and switched to active. Finally, people are given the app on the Users tab. Super Admins get every catalogue app automatically, and everyone else needs it ticked.",
    ["Manual steps outside the code: Entra registration, package token, DNS and Vercel.", "An app can limit which roles may have it."])
];

export const cat = (id: string) => CATS.find((c) => c.id === id)!;
export const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
export const overdue = (x: Item, now = new Date()) => new Date(x.review) < now;

/* ---------- retrieval (mock): a keyword match over titles and summaries ---------- */
const STOP = new Set("what when where which does this that with from have they them your about there their would could should imagina how who why the and for are our you can any its not but all one use tell give explain steps".split(" "));
const words = (s: string) => (s.toLowerCase().match(/[a-z]{3,}/g) || []).filter((w) => !STOP.has(w));
const near = (a: string, b: string) => a.startsWith(b) || b.startsWith(a);

export function find(q: string): Item[] {
  const toks = words(q);
  const scored = ITEMS.map((x) => {
    const tw = words(x.title), sw = words(x.summary);
    let s = 0;
    toks.forEach((t) => { if (tw.some((w) => near(w, t))) s += 3; else if (sw.some((w) => near(w, t))) s += 1; });
    return { x, s };
  }).filter((r) => r.s > 0).sort((a, b) => b.s - a.s);
  if (!scored.length || scored[0].s < 3) return [];
  return scored.filter((r) => r.s >= scored[0].s * 0.6).slice(0, 3).map((r) => r.x);
}
