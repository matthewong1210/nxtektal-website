import Image from "next/image";
import Reveal from "../../app/reveal";

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Founder bios restate the same facts as before (degrees, programs, roles,
 * manufacturing network) with the emphasis on site operations, robots,
 * software, and delivery. Nothing is added that was not already on record;
 * no member is removed.
 */
export const founders = [
  {
    initials: "MH",
    name: "Matthew Huang",
    role: "Co-Founder & Chief Executive Officer",
    email: "matthew@nxtektal.com",
    photo: "/founders/matthew-huang.jpg",
    bio: "Matthew leads customer development — the facility conversations behind the pilot program — along with company strategy, fundraising, and North American partnerships. UC Berkeley graduate.",
  },
  {
    initials: "SG",
    name: "Steven Guo",
    role: "Co-Founder & Chief Technology Officer",
    email: "steven@nxtektal.com",
    photo: "/founders/steven-guo.jpg",
    bio: "Steven leads robotics engineering, system architecture, and product development: the collection robot, the Site Brain, and the Range Operations Simulator its decision rules are developed in. Hands-on experience from Formula SAE and competitive robotics; studies Physics and Economics at UC Berkeley.",
  },
  {
    initials: "JC",
    name: "Jason Chen",
    role: "Co-Founder & Chief Operating Officer",
    email: "jasonchen@nxtektal.com",
    photo: "/founders/jason-chen.jpg",
    bio: "Jason leads manufacturing, supply chain, production, and China operations — how prototypes get built and how a validated machine gets produced — with access to a multi-factory manufacturing network, component and electronics suppliers, and export channels serving Europe and the United States. Engineering student at the University of British Columbia.",
  },
];

export default function FounderSection() {
  return (
    <section className="block founders-block" id="company">
      <div className="block-inner">
        <Reveal>
          <div className="eyebrow">THE FOUNDERS</div>
          <h2>Customer development, robot engineering, and manufacturing — the three jobs behind delivering outdoor work.</h2>
        </Reveal>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <Reveal key={founder.name} delay={index * 60}>
              <article className="founder">
                {"photo" in founder && founder.photo ? (
                  <Image
                    className="founder-photo"
                    src={founder.photo}
                    alt={`Portrait of ${founder.name}`}
                    width={168}
                    height={168}
                    sizes="84px"
                  />
                ) : (
                  <div className="founder-initials" aria-hidden="true">{founder.initials}</div>
                )}
                <h3>{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <p className="founder-bio">{founder.bio}</p>
                <a
                  className="founder-email"
                  href={`mailto:${founder.email}`}
                  aria-label={`Email ${founder.name}`}
                >
                  {founder.email} <Arrow />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
