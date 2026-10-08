/**
 * How the system works — the operating loop and the participants.
 *
 * Plain data so the homepage "How it works" chapter can be held to the
 * approved narrative by tests: the loop stays Sense → Plan → Coordinate →
 * Execute → Verify (and matches the roadmap's OPERATING_LOOP), every
 * participant's role is stated as a design intent, proposed work always
 * passes a person, and no deployment, performance, or
 * interchangeable-hardware claim can creep in through copy edits.
 */

export type LoopStep = { name: string; body: string };

/** The operating loop, in approved order. */
export const LOOP_STEPS: LoopStep[] = [
  {
    name: "SENSE",
    body: "Sensors and the facility’s existing systems report ball inventory, demand, equipment state, and robot status to the Site Brain.",
  },
  {
    name: "PLAN",
    body: "The Site Brain works out what work is needed and when, within the goals and operating rules the manager sets. Proposed work is approved, changed, or rejected by a person.",
  },
  {
    name: "COORDINATE",
    body: "Approved work is assigned across staff, NXTektal robots, and compatible existing equipment, with each handoff sequenced between them.",
  },
  {
    name: "EXECUTE",
    body: "Task-specific robots carry out the physical job. People and existing machines handle the steps assigned to them.",
  },
  {
    name: "VERIFY",
    body: "Each handoff and result is confirmed and logged. Exceptions are flagged to a person instead of being hidden in the workflow.",
  },
];

export type Participant = { name: string; role: string; steps: string };

/** Who takes part in the loop, and which steps each one owns. */
export const PARTICIPANTS: Participant[] = [
  {
    name: "Facility manager and staff",
    role: "Set the goals and operating rules. Approve, change, or reject proposed work, review flagged exceptions, and handle the steps no machine is assigned to.",
    steps: "Plan · Execute · Verify",
  },
  {
    name: "NXTektal robots",
    role: "Machines designed for a specific outdoor job. The first is a collection robot that sweeps the range, returns, and docks at the handoff unit, reporting its status as it goes.",
    steps: "Sense · Execute",
  },
  {
    name: "Sensors and existing equipment",
    role: "Washers, dispensers, and compatible site systems stay in place and take part in the workflow. Compatibility is assessed site by site.",
    steps: "Sense · Execute",
  },
];

/** Status note for the chapter: this is the operating design, exercised in simulation today. */
export const DESIGN_STATUS_NOTE =
  "This is the operating design we are building. Today the loop runs in the Range Operations Simulator, not at a facility, and every result the Site Brain reports can be reviewed by a person.";
