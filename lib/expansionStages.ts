/**
 * How it scales — stage data, the Site Brain core, what carries over, and
 * pure helpers (Phase 2D Sprint 3 map; narrative updated for the
 * "robots and the operating system behind them" positioning).
 *
 * The chapter's three stages, the Site Brain core, the transferable
 * operating loop, and the carry-over lists live here as data so tests can
 * hold the section to the approved narrative: only the first job is in
 * development, the next job is a validation step rather than a product,
 * later sites are direction, what carries over is design intent, and no
 * deployment claim can creep into the map.
 */

export type ExpansionStage = {
  /** 1-based stage number, also the default map emphasis order. */
  number: 1 | 2 | 3;
  label: string;
  title: string;
  status: "IN DEVELOPMENT" | "NEXT TO VALIDATE · NOT STARTED" | "LATER DIRECTION";
  capabilities: string[];
};

export const EXPANSION_STAGES: ExpansionStage[] = [
  {
    number: 1,
    label: "FIRST JOB",
    title: "Range-Ball Collection and Handoff",
    status: "IN DEVELOPMENT",
    capabilities: [
      "Ball availability monitoring",
      "Demand-responsive scheduling",
      "Collection by the NXTektal collection robot",
      "Return to the handoff point",
      "Transfer into the existing washer intake (mechanism in development)",
      "Transfer confirmation before collection resumes",
      "Exception handling",
    ],
  },
  {
    number: 2,
    label: "NEXT TO VALIDATE",
    title: "Mowing and Grounds Work on Golf Facilities",
    status: "NEXT TO VALIDATE · NOT STARTED",
    capabilities: [
      "Mowing — the second job we intend to validate first",
      "Turf and soil checks",
      "Bunker care",
      "Course inspection",
      "Equipment inspection",
      "Spraying and irrigation checks, under product-label rules",
    ],
  },
  {
    number: 3,
    label: "LATER DIRECTION",
    title: "Similar Outdoor Facilities",
    status: "LATER DIRECTION",
    capabilities: [
      "The second job, once validated on a golf facility, delivered at a similar outdoor facility",
      "Carried-over perception, task interface, control software, and deployment tools",
      "Site-specific configuration and compatibility checks",
      "Multi-robot and multi-crew coordination where a site needs it",
      "Facility-wide reporting",
    ],
  },
];

/** The stage selected before any interaction — never auto-advanced. */
export const DEFAULT_STAGE = 1;

export type RecurringJob = {
  name: string;
  body: string;
  /** The expansion stage this job belongs to; its status pill is derived from that stage. */
  stage: 1 | 2 | 3;
  tone: "first" | "next" | "later";
  status: string;
};

/** The status pill a job shows for its stage — always the stage's own status, so the two lists cannot disagree. */
export function jobStatusForStage(stage: 1 | 2 | 3): string {
  const s = EXPANSION_STAGES[stage - 1];
  return stage === 1 ? `FIRST JOB · ${s.status}` : s.status;
}

const TONE: Record<1 | 2 | 3, RecurringJob["tone"]> = { 1: "first", 2: "next", 3: "later" };

function job(name: string, body: string, stage: 1 | 2 | 3): RecurringJob {
  return { name, body, stage, tone: TONE[stage], status: jobStatusForStage(stage) };
}

/**
 * The recurring outdoor work a golf facility does, and where NXTektal stands
 * on each. Listed in the order we intend to take it on: the first job, then
 * stage-2 work on the same facilities with mowing first. None of stage 2 is
 * started; its order is intent, not a schedule.
 */
export const RECURRING_JOBS: RecurringJob[] = [
  job(
    "Range-ball collection and handoff",
    "Collect the outfield, bring the balls back, transfer them into the existing washer, confirm the run.",
    1,
  ),
  job("Mowing", "Fairways, rough, and practice areas cut to a stated height, on a schedule, around play.", 2),
  job("Bunker care and course inspection", "Raking, surface checks, and condition reports around the course.", 2),
  job(
    "Spraying and irrigation checks",
    "Scheduled applications and checks across zones, under product-label rules that are legally binding and differ by site.",
    2,
  ),
];

/** Site Brain core — present and unchanged through all three stages. */
export const SITE_BRAIN_CORE = {
  name: "NXTektal Site Brain",
  functions: ["Sense", "Decide", "Coordinate", "Confirm", "Record"],
};

/** Later direction: the approved adjacent environments — nothing else. */
export const BEYOND_ENVIRONMENTS = [
  "Campuses",
  "Parks",
  "Sports Facilities",
  "Resorts",
  "Commercial Landscapes",
];

/** The transferable operating loop, in approved order (matches the How-it-works chapter). */
export const OPERATING_LOOP = [
  "SENSE",
  "DECIDE",
  "COORDINATE",
  "EXECUTE",
  "CONFIRM",
];

/** What is designed to carry from one job to the next — design intent until the second job is validated. */
export const CARRIES_OVER = [
  "Perception and the shared site state",
  "One task interface — the way every robot takes tasks and stops safely",
  "Decision and control software in the Site Brain",
  "Deployment and commissioning tools",
  "Mechanical modules where the job allows it, such as the mobile base",
];

/** What stays specific to each job and site. */
export const JOB_SPECIFIC = [
  "The ball-collection mechanism",
  "Mowing decks, sprayers, or other job tooling",
  "Each site’s equipment interface and operating rules",
  "Validation: every job is proven on its own before it ships",
];

export const CARRY_NOTE =
  "What carries over is a design intent until the second job is validated. A collection mechanism does not mow, and nothing here is promised to fit every site.";

/** Clamp any input to a valid stage number; invalid input falls back to the default. */
export function clampStage(value: number): 1 | 2 | 3 {
  return value === 2 || value === 3 ? value : DEFAULT_STAGE;
}

/**
 * Per-job reuse hypothesis — an engineering breakdown to validate, never a
 * statement of current capability. The work name staying the same does not
 * mean hardware, operating rules, or acceptance criteria stay the same.
 */
export type ReuseByJob = { job: string; reuse: string[]; confirm: string[] };

export const REUSE_BY_JOB: ReuseByJob[] = [
  {
    job: "Mowing",
    reuse: ["Work planning and coverage paths", "Part of the drive base and the mowing module", "Task records and exception handling"],
    confirm: ["Cut height and quality required", "Slopes, terrain, and ground conditions", "People and play on the course"],
  },
  {
    job: "Spraying",
    reuse: ["Mobile platform and positioning", "Zone management", "Part of the application control"],
    confirm: ["What is being treated and with what", "Equipment configuration", "Product label rules, which are legally binding and differ by site"],
  },
  {
    job: "Irrigation checks",
    reuse: ["Site state and demand judgment", "Zone scheduling", "Execution records"],
    confirm: ["Controlling existing irrigation or moving water", "Water supply and connection conditions"],
  },
  {
    job: "Inspection and transport",
    reuse: ["Task interface and route management", "Telemetry and exception handling"],
    confirm: ["What is inspected or carried", "Payload and loading interfaces", "Access and passage conditions"],
  },
];

/** What reuse has to show up as before it counts — business results, not component counts. All targets today. */
export const PROOF_METRICS = [
  "Faster installation at a new site",
  "Cheaper onboarding of the second job",
  "Fewer manual interventions per job",
  "Lower total cost to deliver a job",
];

export const PROOF_NOTE =
  "Reuse is a market opportunity, not a moat by itself. Commercial robotic mowers are already sold across golf courses, sports fields, and other green spaces, with fleet management and service behind them, so established vendors cover part of this work. How many components we reuse is an engineering metric; how much development, deployment, and service cost that saves is the business metric. All of these are targets today, not results.";
