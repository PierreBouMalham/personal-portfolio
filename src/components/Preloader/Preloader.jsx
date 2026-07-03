import { useEffect, useRef, useState } from "react";
import "./Preloader.css";

/* ============================================================
   White preloader curtain: 0→100% counter (bottom-right) +
   four-square clockwise loader (top-left). At 100% it holds
   300ms, fires the global `play` moment (body.is-play cues all
   hero entrances) and lifts away like a curtain.
   ============================================================ */

const COUNT_DUR = 2600; // counter run time (ms)
const STEP_MS = 600; // square chase cadence
const LIFT_MS = 1000; // curtain lift duration

/* per square: 4 clockwise step positions [tx,ty] in rem (pitch = 2.75 + 0.75) */
const OFFSETS = [
  [[0, 0], [3.5, 0], [3.5, 3.5], [0, 3.5]], // TL
  [[0, 0], [0, 3.5], [-3.5, 3.5], [-3.5, 0]], // TR
  [[0, 0], [0, -3.5], [3.5, -3.5], [3.5, 0]], // BL
  [[0, 0], [-3.5, 0], [-3.5, -3.5], [0, -3.5]], // BR
];

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    document.body.classList.add("is-loading");

    const timers = [];
    let rafId;

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-play"); // the `play` moment
      setLifting(true);
      timers.push(setTimeout(() => setGone(true), LIFT_MS + 100));
    };

    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min((now - t0) / COUNT_DUR, 1);
      setCount(Math.round(100 * easeOutCubic(k)));
      if (k < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        timers.push(setTimeout(reveal, 300)); // hold 300ms at 100%
      }
    };
    rafId = requestAnimationFrame(tick);

    const chase = setInterval(() => setStep((s) => (s + 1) % 4), STEP_MS);

    /* safety nets — never leave the hero hidden */
    timers.push(setTimeout(reveal, COUNT_DUR + 2000));
    timers.push(setTimeout(reveal, 8000));

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(chase);
      timers.forEach(clearTimeout);
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader ${lifting ? "preloader--lift" : ""}`} aria-hidden="true">
      <div className="preloader__squares">
        {OFFSETS.map((offsets, i) => {
          const [tx, ty] = offsets[step];
          return (
            <i
              key={i}
              className={i === 0 || i === 3 ? "fill" : "line"}
              style={{ transform: `translate(${tx}rem, ${ty}rem)` }}
            />
          );
        })}
      </div>
      <div className="preloader__counter">{count}%</div>
    </div>
  );
}
