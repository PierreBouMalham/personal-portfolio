import "./Marquee.css";

const items = [
  "Full-Stack Engineer",
  "React",
  "Spring Boot",
  "AI Integration",
  "Laravel",
  "Angular",
  "TypeScript",
  "Real-Time Systems",
];

function Group({ hidden }) {
  return (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__diamond" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
