import Image from "next/image";
import Reveal from "../../app/reveal";
import RobotVideo from "./RobotVideo";

const photos = [
  {
    src: "/robot/robot-roller.jpg",
    alt: "Front view of the NXTektal ball collection robot, showing the collection roller, stereo depth cameras, and 360-degree lidar",
  },
  {
    src: "/robot/robot-hopper.jpg",
    alt: "Top view of the NXTektal ball collection robot with its onboard hopper filled with range balls",
  },
  {
    src: "/robot/robot-angle.jpg",
    alt: "Three-quarter view of the NXTektal ball collection robot on a driving range at dusk",
  },
];

export default function MachineSection() {
  return (
    <section className="block machine-block" id="machine">
      <div className="block-inner">
        <Reveal>
          <div className="eyebrow">THE MACHINE</div>
          <h2>One machine, built around one workflow.</h2>
          <p className="machine-intro">
            Collection roller, onboard hopper, stereo depth cameras, and 360° lidar—purpose-built for demand-responsive ball collection and handoff.
          </p>
        </Reveal>
        <div className="machine-media">
          <Reveal className="machine-video">
            <RobotVideo />
          </Reveal>
          <div className="machine-photos">
            {photos.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 90}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 760px) 100vw, 33vw"
                  loading="lazy"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
