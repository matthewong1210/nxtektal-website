/**
 * How the system does the work — the operating loop, who takes part, what
 * NXTektal builds versus uses, and the separate product-improvement loop.
 *
 * Plain data so the homepage chapters can be held to the approved narrative
 * by tests: the operating loop stays Sense → Decide → Coordinate → Execute →
 * Confirm (and matches the roadmap's OPERATING_LOOP), proposed work always
 * passes a person, third-party equipment is never assumed compatible, the
 * improvement loop is a development method rather than self-learning, and no
 * deployment, performance, or interchangeable-hardware claim can creep in.
 */

export type LoopStep = { name: string; body: string };

/** The operating loop — how one job gets done, in approved order. */
export const LOOP_STEPS: LoopStep[] = [
  {
    name: "SENSE",
    body: "Sensors, the robots, and the facility’s existing systems report what is happening on site: ball inventory, demand, equipment state, robot status.",
  },
  {
    name: "DECIDE",
    body: "The Site Brain works out what work is needed and when, within the goals and operating rules the manager sets. Proposed work is approved, changed, or rejected by a person.",
  },
  {
    name: "COORDINATE",
    body: "Approved work is assigned across staff, robots, and the existing equipment that can be connected, with each handoff sequenced between them.",
  },
  {
    name: "EXECUTE",
    body: "Robots carry out the physical job. People and existing machines handle the steps assigned to them.",
  },
  {
    name: "CONFIRM",
    body: "Each handoff and result is confirmed and logged. An exception stops the affected step and goes to a person; everything else continues.",
  },
];

export type Participant = { name: string; role: string; steps: string };

/** Who takes part in the loop, and which steps each one owns. */
export const PARTICIPANTS: Participant[] = [
  {
    name: "Facility manager and staff",
    role: "Set the goals and operating rules. Approve, change, or reject proposed work, review flagged exceptions, and handle the steps no machine is assigned to.",
    steps: "Decide · Execute · Confirm",
  },
  {
    name: "Robots and sensors",
    role: "The machines and sensing a job needs. NXTektal designs what does not exist yet — the first is a collection robot — and uses suitable third-party equipment where it does.",
    steps: "Sense · Execute",
  },
  {
    name: "Existing equipment",
    role: "Washers, dispensers, and other site systems stay in place. Those that can be connected report status or receive the handoff; compatibility is checked site by site.",
    steps: "Sense · Execute",
  },
];

/** What NXTektal builds and what it uses — stated without implying every device is ours or every device is compatible. */
export const BUILD_OR_USE_NOTE =
  "NXTektal develops the software and the hardware the job needs. Where a suitable third-party machine or sensor exists, we use it. Where the job needs a machine or an interface that does not exist, we build it. Not every piece is ours, and no third-party device is assumed compatible until it has been checked.";

/** Status note for the chapter: this is the operating design, exercised in simulation today. */
export const DESIGN_STATUS_NOTE =
  "This is the operating design we are building. Today the loop runs in the Range Operations Simulator, not at a facility, and every result the Site Brain reports can be reviewed by a person.";

/** The product-improvement loop — how deployments change the product. A method, not self-learning. */
export const IMPROVEMENT_LOOP: LoopStep[] = [
  {
    name: "RECORD",
    body: "Each deployment will log what the system observed, what it decided, what people did, and where it needed help: failures, manual interventions, exceptions.",
  },
  {
    name: "ANALYZE",
    body: "The team reviews that record to find what failed, what slowed the job down, and what still needed a person.",
  },
  {
    name: "IMPROVE",
    body: "Changes go into the software, the hardware, or the way a site is set up and commissioned.",
  },
  {
    name: "TEST",
    body: "Changes are checked in simulation, then on prototype hardware, and in the field once pilots begin.",
  },
  {
    name: "DELIVER",
    body: "The next deployment, and the next job, will start from what the last one taught us.",
  },
];

export const IMPROVEMENT_NOTE =
  "This is our development method, not a self-learning system. The product does not retrain itself in the field, we do not claim it gets better on its own with every run, and we make no claim to a robot foundation model of our own.";
