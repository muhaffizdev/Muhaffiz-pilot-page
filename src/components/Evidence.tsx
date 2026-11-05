"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { EASE } from "./site";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 87, suffix: "%", label: "worry about their safety often or almost always" },
  { value: 71, suffix: "%", label: "said “needs internet” is what stops them using a safety app" },
  { value: 29, suffix: "%", label: "use nothing at all to share where they are" },
  { value: 87, suffix: "%", label: "would use an app like Muhaffiz" },
];

export default function Evidence() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">Why we’re building it</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Most safety apps stop working{" "}
              <span className="font-serif font-normal italic text-accent-ink">exactly when you need them.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              We asked people in Pakistan what keeps them from using one. Only 1 of 31 had ever used a
              dedicated safety app. The answer we heard most: it needs the internet, and that’s the
              first thing you lose in a basement, a lift or a rickshaw on the edge of town.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {STATS.map((s, i) => (
            <motion.li
              key={s.label}
              className="group relative bg-surface p-8 md:p-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <span className="absolute inset-0 bg-[radial-gradient(400px_circle_at_0%_0%,rgba(92,194,189,.08),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="relative font-display text-[clamp(56px,7vw,88px)] font-semibold leading-none tracking-[-0.05em] text-ink">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="relative mt-4 max-w-[26ch] text-sm leading-relaxed text-muted">{s.label}</p>
            </motion.li>
          ))}
          <li className="bg-surface px-8 py-5 text-xs leading-relaxed text-faint sm:col-span-2 md:px-10">
            Survey of 73 people. Percentages come from the first 31 responses analysed; the full set
            mirrored them. Backed by four in-depth interviews.
          </li>
        </ul>
      </div>
    </section>
  );
}
