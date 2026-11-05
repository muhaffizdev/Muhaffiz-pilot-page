"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { EASE } from "./site";

const STEPS = [
  {
    title: "Asleep until something is loud.",
    body: "A low-power service waits for a sudden spike in volume. Until then it isn’t listening for words, and it isn’t recording.",
  },
  {
    title: "A sudden spike wakes it up.",
    body: "Only a sharp jump past the threshold passes the gate. Everyday noise like traffic, TV or a busy bazaar stays below it.",
  },
  {
    title: "The phone decides what it heard.",
    body: "An on-device sound model labels the short burst: screaming, shouting, or neither. There’s no transcript, and the audio is thrown away.",
  },
  {
    title: "Movement has to agree.",
    body: "The accelerometer and gyroscope look for a sudden drop or struggle. Sound and motion together cut false alarms.",
  },
  {
    title: "You get 20 seconds to say no.",
    body: "The phone vibrates gently. One tap cancels and nothing happens. If you don’t tap, the SOS goes out.",
  },
];

// Deterministic bar heights so server and client render the same.
const BARS = Array.from({ length: 36 }, (_, i) => 0.18 + (((i * 7) % 11) / 11) * 0.22);

function Waveform({ spike }: { spike: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-40 items-center gap-[5px]">
      <span className="absolute inset-x-0 top-[22%] border-t border-dashed border-accent/40">
        <span className="absolute -top-5 right-0 font-mono text-[10px] text-accent-ink">threshold</span>
      </span>
      {BARS.map((h, i) => {
        const center = Math.abs(i - 18) < 5;
        const peak = spike && center ? 0.95 - Math.abs(i - 18) * 0.08 : h;
        return (
          <motion.span
            key={i}
            className={`w-full rounded-full ${spike && center ? "bg-sos" : "bg-accent/70"}`}
            animate={
              reduce
                ? { height: `${peak * 100}%` }
                : { height: [`${peak * 100}%`, `${peak * 70}%`, `${peak * 100}%`] }
            }
            transition={{ duration: 1.1 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

function Classifier() {
  const rows = [
    { label: "Screaming", v: 0.91, hot: true },
    { label: "Shouting", v: 0.06 },
    { label: "Background", v: 0.03 },
  ];
  return (
    <div className="space-y-5">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-2 flex justify-between font-mono text-xs">
            <span className={r.hot ? "text-ink" : "text-muted"}>{r.label}</span>
            <span className={r.hot ? "text-sos-ink" : "text-faint"}>{r.v.toFixed(2)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-ink/5">
            <motion.div
              className={`h-full rounded-full ${r.hot ? "bg-sos" : "bg-accent/50"}`}
              initial={{ width: 0 }}
              animate={{ width: `${r.v * 100}%` }}
              transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE }}
            />
          </div>
        </div>
      ))}
      <p className="pt-2 font-mono text-[11px] text-faint">runs on the phone · no transcript · audio discarded</p>
    </div>
  );
}

function Motion() {
  return (
    <svg viewBox="0 0 320 140" className="w-full" aria-hidden>
      <path d="M0 70 H320" stroke="var(--line)" />
      <motion.path
        d="M0 70 C20 66 30 74 50 70 S90 66 110 70 S140 72 150 68 L165 18 L178 124 L192 30 L205 108 L218 60 C240 72 260 66 280 70 S310 72 320 70"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.rect
        x="150"
        y="10"
        width="72"
        height="122"
        rx="10"
        fill="rgba(229,72,61,.08)"
        stroke="rgba(229,72,61,.5)"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />
      <motion.text
        x="186"
        y="6"
        textAnchor="middle"
        className="fill-sos-ink font-mono text-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        sudden drop
      </motion.text>
    </svg>
  );
}

function Countdown() {
  const reduce = useReducedMotion();
  const [left, setLeft] = useState(20);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setLeft((s) => (s <= 1 ? 20 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid size-44 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(27,31,35,.08)" strokeWidth="4" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ pathLength: left / 20 }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <motion.span
          className="font-display text-6xl font-semibold tabular-nums"
          animate={reduce ? undefined : { x: [0, -1.5, 1.5, 0] }}
          transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 0.75 }}
        >
          {left}
        </motion.span>
      </div>
      <span className="mt-6 inline-flex min-h-12 items-center rounded-full border border-line-strong px-8 text-sm text-ink">
        Tap to cancel
      </span>
    </div>
  );
}

function Visual({ active }: { active: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: EASE }}
        className="w-full"
      >
        {active <= 1 && <Waveform spike={active === 1} />}
        {active === 2 && <Classifier />}
        {active === 3 && <Motion />}
        {active === 4 && <Countdown />}
      </motion.div>
    </AnimatePresence>
  );
}

function StepText({ index, onActive }: { index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <li ref={ref} className="flex min-h-[55vh] flex-col justify-center py-10 lg:min-h-[70vh]">
      <motion.div
        animate={{ opacity: inView ? 1 : 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono text-xs text-accent-ink">0{index + 1} / 05</p>
        <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] md:text-[40px] md:leading-[1.08]">
          {STEPS[index].title}
        </h3>
        <p className="mt-5 max-w-md leading-relaxed text-muted">{STEPS[index].body}</p>
      </motion.div>
    </li>
  );
}

export default function Detection() {
  const [active, setActive] = useState(0);

  return (
    <section id="detection" className="relative border-y border-line bg-mint/50">
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-10 md:pt-40">
        <Reveal>
          <p className="eyebrow">Automatic danger detection</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            For when you can’t reach the button.{" "}
            <span className="font-serif font-normal italic text-accent-ink">Nothing leaves the phone.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-sm text-faint">Off by default. You switch it on, and you can switch it off.</p>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="sticky top-24 z-10 lg:top-0 lg:flex lg:h-svh lg:items-center">
          <div className="relative mt-10 flex min-h-[300px] w-full items-center overflow-hidden rounded-[28px] border border-line bg-surface/90 p-8 backdrop-blur lg:mt-0 lg:min-h-[420px] lg:p-12">
            <div aria-hidden className="hairline-grid absolute inset-0 opacity-50" />
            <div className="relative w-full">
              <Visual active={active} />
            </div>
            <div className="absolute bottom-5 left-8 right-8 flex gap-1.5" aria-hidden>
              {STEPS.map((_, i) => (
                <span key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                  <motion.span
                    className="block h-full bg-accent"
                    animate={{ width: i <= active ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        <ol>
          {STEPS.map((_, i) => (
            <StepText key={i} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}
