"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    n: "I",
    title: "Off until you say so.",
    body: "Detection, voice triggers, location sharing and recording all start switched off. Onboarding tells you what each one records before you turn it on.",
  },
  {
    n: "II",
    title: "No audio leaves the phone.",
    body: "Sound classification and keyword spotting run on the device. No transcripts. Evidence is encrypted and stored locally, never uploaded.",
  },
  {
    n: "III",
    title: "No hidden tracking.",
    body: "Sharing needs both people to agree, and the status is always visible. Anyone can stop, privately, with a single phrase.",
  },
  {
    n: "IV",
    title: "Made for real phones.",
    body: "Low-end Android, patchy coverage, bright sun, one hand, a racing heart. Big targets, high contrast, English and Urdu.",
  },
];

export default function Principles() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    <section id="privacy" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <motion.p
        aria-hidden
        style={{ x }}
        className="pointer-events-none whitespace-nowrap font-serif text-[clamp(90px,16vw,240px)] italic leading-none text-accent/25"
      >
        privacy by design · privacy by design
      </motion.p>

      <div className="mx-auto -mt-[0.4em] max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">Principles we won’t trade</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            A safety app should never become{" "}
            <span className="font-serif font-normal italic text-accent-ink">another thing to fear.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 border-t border-line">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group grid gap-4 border-b border-line py-9 transition-colors hover:bg-ink/[.025] md:grid-cols-[120px_1fr_1.2fr] md:items-baseline md:gap-10"
            >
              <span className="font-serif text-3xl italic text-accent-ink transition-colors group-hover:text-accent-ink">{p.n}</span>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-lg leading-relaxed text-muted">{p.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
