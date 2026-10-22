/**
 * First-job copy contracts — the development-scope split, the three
 * component cards, the progress tracks, and the hero caption. They live
 * here as data so the truthfulness tests can hold them to the approved
 * wording: the mechanism-neutral handoff sentence, the status vocabulary,
 * and the concept/simulation labels.
 */

export type ScopeCard = {
  key: "now" | "vision";
  label: string;
  status: string;
  title: string;
  items: string[];
  note: string;
};

export type SystemComponent = { title: string; body: string };

export type BuildTrack = { name: string; items: { name: string; status: string }[] };

/** The mechanism-neutral handoff sentence, verbatim where the brief names it. */
export const HANDOFF_REFERENCE =
  "Collected balls return to a handoff point for transfer into the range’s existing washer intake. The workflow requires transfer confirmation before collection resumes.";

/** Hero background caption — the film contains the concept handoff segment, so the label sits next to the frame. */
export const HERO_CAPTION =
  "Background: concept visualization, not footage of a deployed system. It shows a transfer mechanism that is under development, and machines that are later direction, not in development.";

/* Current development scope versus the full supply vision — kept apart on purpose. */
export const SCOPE: ScopeCard[] = [
  {
    key: "now",
    label: "IN DEVELOPMENT NOW",
    status: "FIRST JOB",
    title: "Collection, return, handoff, confirmation.",
    items: [
      "Monitoring ball availability and demand across the range.",
      "Scheduling collection runs within the rules the manager sets.",
      "The collection robot: sweep priority zones, carry the collected balls, return to the handoff point.",
      "Handoff and transfer into the existing washer intake — the transfer mechanism is under development.",
      "Transfer confirmation and exception handling, required before the next run.",
    ],
    note: "A designed workflow, exercised in simulation; prototype hardware in development. Not yet run at a facility.",
  },
  {
    key: "vision",
    label: "NOT CLAIMED YET",
    status: "FULL SUPPLY VISION",
    title: "Balls back in the dispenser when players need them.",
    items: [
      "The dispenser stays supplied through the busiest hours, and staff stop running the collection loop by hand.",
      "Washing and dispensing stay with the facility’s existing equipment, which NXTektal does not control. Balls reaching the washer intake is not “supply restored”.",
    ],
    note: "The product goal, stated as a goal. Whether the tee line stays supplied is measured only at a pilot; we will write it as a result then.",
  },
];

/* What NXTektal brings to the first job. */
export const SYSTEM_COMPONENTS: SystemComponent[] = [
  {
    title: "Site Brain",
    body: "NXTektal’s scheduling and coordination software. Tracks ball availability, demand, equipment state, and robot status, and schedules collection runs within the manager’s rules. Runs in the Range Operations Simulator today; not connected to a site.",
  },
  {
    title: "Collection Robot",
    body: "An NXTektal collection robot designed for this job: a front roller picker and ball handling on a mobile base, which sweeps priority zones, carries the collected balls, and returns to the handoff point. Prototype in development.",
  },
  {
    title: "Handoff and Transfer",
    body: "Collected balls return to a handoff point for transfer into the range’s existing washer intake. The workflow requires transfer confirmation before collection resumes. Transfer mechanism under development; compatibility confirmed per site.",
  },
];

/* Current progress — statuses are the honest state of each track. */
export const STATUS_DATE = "October 2026";
export const BUILD_TRACKS: BuildTrack[] = [
  {
    name: "Site Brain · Software",
    items: [
      { name: "Range Operations Simulator", status: "WORKING · SIMULATION ONLY" },
      { name: "Facility state and decision rules", status: "WORKING · SIMULATION ONLY" },
      { name: "Sensor and equipment interfaces", status: "DESIGNED · NOT CONNECTED" },
      { name: "Manager dashboard", status: "CONCEPT UI" },
    ],
  },
  {
    name: "Machines · Hardware",
    items: [
      { name: "Collection robot", status: "PROTOTYPE IN DEVELOPMENT" },
      { name: "Handoff transfer mechanism", status: "IN DEVELOPMENT · NOT SELECTED" },
      { name: "Transfer confirmation", status: "REQUIRED · NOT FIELD-TESTED" },
      { name: "Robot-to-handoff integration", status: "IN DEVELOPMENT" },
    ],
  },
  {
    name: "Field · Pilots",
    items: [
      { name: "Facility workflow mapping", status: "PILOT PREPARATION" },
      { name: "Pilot site assessments", status: "OPEN" },
      { name: "Field performance data", status: "NONE YET" },
    ],
  },
];
