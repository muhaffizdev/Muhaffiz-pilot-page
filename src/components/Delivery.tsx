"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { BellRing, Hand, Radio, Siren, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import Reveal from "./Reveal";

type Step = {
  icon: LucideIcon;
  kicker: string;
  title: string;
  body: string;
  chips: string[];
};

const STEPS: Step[] = [
  {
    icon: Hand,
    kicker: "01 · Trigger",
    title: "However you can, it starts the same way.",
    body: "Hold the SOS button, use the lock-screen shortcut, say your safe phrase, or let detection notice. Every trigger feeds one engine, so they all behave the same.",
    chips: ["SOS button", "Lock screen", "Loud phrase", "Silent duress phrase", "Auto-detection"],
  },
  {
    icon: Radio,
    kicker: "02 · Check the signal",
    title: "The phone works out what it can reach.",
    body: "Muhaffiz sorts the connection into three tiers: none, some, or good. It never waits on a network that isn’t there.",
    chips: ["Tier 1 · no connection", "Tier 2 · any connection", "Tier 3 · good connection"],
  },
  {
    icon: BellRing,
    kicker: "03 · Deliver",
    title: "SMS first when it has to, everything when it can.",
    body: "With zero data your location goes out by SMS. With a connection it also goes by WhatsApp, push and email. Anything queued offline is sent the moment you’re back.",
    chips: ["SMS", "WhatsApp", "Push", "Email", "Queue & retry"],
  },
  {
    icon: Siren,
    kicker: "04 · Escalate",
    title: "If nobody answers, it doesn’t stop there.",
    body: "When no one acknowledges within 3 minutes, a 30-second warning gives you a chance to cancel. Then the alert goes to the authority numbers you choose, Police 15 and Rescue 1122 by default.",
    chips: ["3 min timer", "30 s cancel", "Police 15", "Rescue 1122"],
  },
];

function StepItem({ step, index, progress }: { step: Step; index: number; progress: MotionValue<number> }) {
  const at = index / (STEPS.length - 1);
  const lit = useTransform(progress, [Math.max(0, at - 0.12), at], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.85, 1]);
  const textOpacity = useTransform(lit, [0, 1], [0.35, 1]);
  const Icon = step.icon;
  const isLast = index === STEPS.length - 1;

  return (
    <li className="relative grid grid-cols-[56px_1fr] gap-6 pb-20 last:pb-0 md:grid-cols-[72px_1fr] md:gap-10">
      <motion.span
        style={{ scale }}
        className="relative z-10 grid size-14 place-items-center rounded-2xl border border-line-strong bg-surface md:size-[72px]"
      >
        <motion.span
          style={{ opacity: lit }}
          className={`absolute inset-0 rounded-2xl ${isLast ? "bg-sos/15 ring-1 ring-sos/50" : "bg-accent/12 ring-1 ring-accent/50"}`}
        />
        <Icon className={`relative size-6 ${isLast ? "text-sos-ink" : "text-accent-ink"}`} aria-hidden />
      </motion.span>
      <motion.div style={{ opacity: textOpacity }}>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">{step.kicker}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] md:text-[32px] md:leading-tight">
          {step.title}
        </h3>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">{step.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {step.chips.map((c) => (
            <li key={c} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft">
              {c}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

export default function Delivery() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="how" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <div className="max-w-3xl">
        <Reveal>
          <p className="eyebrow">How an SOS reaches someone</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 font-display text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Built for the moment{" "}
            <span className="font-serif font-normal italic text-accent-ink">the bars drop to zero.</span>
          </h2>
        </Reveal>
      </div>

      <ol ref={listRef} className="relative mt-20">
        <span aria-hidden className="absolute bottom-0 left-7 top-0 w-px bg-line md:left-9" />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-7 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-sos md:left-9"
        />
        {STEPS.map((s, i) => (
          <StepItem key={s.kicker} step={s} index={i} progress={progress} />
        ))}
      </ol>
    </section>
  );
}
