import Image from "next/image";
import Reveal from "../../app/reveal";

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const founders = [
  {
    initials: "MH",
    name: "Matthew Huang",
    role: "Co-Founder & Chief Executive Officer",
    email: "matthew@nxtektal.com",
    bio: "Matthew is a UC Berkeley graduate with experience spanning business development, financial services, sales, and early-stage ventures. At NXTektal, he leads company strategy, customer development, fundraising, and North American partnerships—connecting real-world operational needs with the company’s engineering and manufacturing capabilities.",
  },
  {
    initials: "SG",
    name: "Steven Guo",
    role: "Co-Founder & Chief Technology Officer",
    email: "steven@nxtektal.com",
    photo: "/founders/steven-guo.jpg",
    bio: "Steven is a UC Berkeley student studying Physics and Economics, with hands-on experience in mechanical engineering, Formula SAE, and competitive robotics. At NXTektal, he leads robotics engineering, system architecture, and product development.",
  },
  {
    initials: "JC",
    name: "Jason Chen",
    role: "Co-Founder & Chief Operating Officer",
    email: "jasonchen@nxtektal.com",
    photo: "/founders/jason-chen.jpg",
    bio: "Jason is an engineering student at the University of British Columbia with access to a multi-factory manufacturing network, established component and electronics suppliers, and export channels serving Europe and the United States. At NXTektal, he leads manufacturing, supply chain, production, and China operations.",
  },
];

export default function FounderSection() {
  return (
    <section className="block founders-block" id="founders">
      <div className="block-inner">
        <Reveal>
          <div className="eyebrow">THE FOUNDERS</div>
          <h2>Built across markets, machines, and manufacturing.</h2>
          <p className="founders-intro">
            NXTektal brings together customer development and capital, robotics and systems engineering, and global manufacturing execution.
          </p>
        </Reveal>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <Reveal key={founder.name} delay={index * 90}>
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
