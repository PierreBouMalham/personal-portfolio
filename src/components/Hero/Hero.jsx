import { useEffect, useRef } from "react";
import { profile } from "../../data/content.js";
import "./Hero.css";

/* ============================================================
   Cortex-style hero: lead paragraph / hairline divider / subcopy
   split over the prism-streaks scene, with a colossal "Pierre"
   wordmark bleeding off the bottom edge. Desktop composition is
   a fixed 1440×800 design stage scaled uniformly to the viewport.
   ============================================================ */

const WORDMARK = ["P", "i", "e", "r", "r", "e"];
const LETTER_DELAYS = [220, 310, 400, 490, 580, 670];

export default function Hero() {
  const stageRef = useRef(null);

  useEffect(() => {
    const fit = () => {
      if (stageRef.current) {
        stageRef.current.style.transform = `scale(${window.innerWidth / 1440})`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const subcopy = `${profile.tagline} based in ${profile.location} — I design and ship systems that unlock smarter, faster growth.`;

  return (
    <section className="c-hero" id="top">
      <h1 className="sr-only">{profile.name}</h1>

      {/* bottom tint scrim under the wordmark */}
      <div className="c-hero__scrim" aria-hidden="true" />

      {/* colossal wordmark bleeding off the bottom */}
      <div className="c-hero__wordmark" aria-hidden="true">
        {WORDMARK.map((ch, i) => (
          <span
            key={i}
            className={`a a-letter ${i % 2 === 0 ? "ga" : "gb"}`}
            style={{ "--dur": "1300ms", "--d": `${LETTER_DELAYS[i]}ms` }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* ---- desktop composition (≥1024px): 1440×800 design stage ---- */}
      <div className="c-hero__desktop">
        <div className="c-stage" ref={stageRef}>
          <p
            className="c-lead grad-lead a a-lead"
            style={{ "--dur": "1100ms", "--d": "300ms" }}
          >
            {profile.summary}
          </p>

          <div
            className="c-divider a a-div"
            style={{ "--dur": "900ms", "--d": "620ms" }}
            aria-hidden="true"
          />

          <p className="c-sub a a-sub" style={{ "--dur": "1000ms", "--d": "780ms" }}>
            {subcopy}
          </p>

          <a
            className="c-cta a a-cta"
            style={{ "--dur": "800ms", "--d": "920ms" }}
            href={profile.cvUrl}
            download
          >
            Download CV
          </a>
        </div>
      </div>

      {/* ---- mobile / tablet composition (<1024px) ---- */}
      <div className="c-hero__mobile">
        <div className="c-hero__mcopy">
          <p
            className="c-mlead grad-lead a a-lead"
            style={{ "--dur": "1100ms", "--d": "300ms" }}
          >
            {profile.summary}
          </p>

          <div
            className="c-mdivider a a-div"
            style={{ "--dur": "900ms", "--d": "620ms" }}
            aria-hidden="true"
          />

          <p className="c-msub a a-sub" style={{ "--dur": "1000ms", "--d": "780ms" }}>
            {subcopy}
          </p>

          <a
            className="c-mcta a a-cta"
            style={{ "--dur": "800ms", "--d": "920ms" }}
            href={profile.cvUrl}
            download
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
