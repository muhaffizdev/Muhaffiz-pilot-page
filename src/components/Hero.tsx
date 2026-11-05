"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import PhoneDemo from "./PhoneDemo";
import { EASE, GITHUB_URL } from "./site";

const LINE_ONE = ["Help", "that", "reaches", "you"];
const LINE_TWO = ["when", "the", "signal", "doesn’t."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor-following glow.
  const mx = useMotionValue(70);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(92,194,189,.28), transparent 60%)`;

  const word = (w: string, i: number, serif = false) => (
    <span key={w + i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className={`inline-block ${serif ? "font-serif font-normal italic text-accent-ink" : ""}`}
        initial={reduce ? false : { y: "110%", rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: EASE }}
      >
        {w}
      </motion.span>
      {" "}
    </span>
  );

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-32 pb-20"
    >
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ background: glow }} />
      <div aria-hidden className="hairline-grid absolute inset-0 -z-10 opacity-40" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="eyebrow flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <span className="h-px w-8 bg-accent" /> Offline-first safety · Pakistan
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(44px,7.4vw,104px)] font-semibold leading-[0.95] tracking-[-0.045em]">
            <span className="block">{LINE_ONE.map((w, i) => word(w, i))}</span>
            <span className="block">{LINE_TWO.map((w, i) => word(w, i + LINE_ONE.length, i >= 2))}</span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
          >
            Muhaffiz is an Android safety app for women and children. One tap sends your location to
            family, and when there’s no internet it goes by SMS. Danger detection runs on the phone,
            so no audio ever leaves it.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          >
            <a
              href="#how"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              See how it works
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-ink transition-colors hover:border-accent hover:text-accent-ink"
            >
              Follow the build
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {[
              ["0 KB", "data needed for an SMS SOS"],
              ["20 s", "to cancel a false alarm"],
              ["0", "seconds of audio uploaded"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-2xl font-semibold text-ink">{k}</dt>
                <dd className="mt-1 text-xs leading-snug text-faint">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: phoneY }}
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <PhoneDemo />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-faint md:flex"
        style={{ opacity: fade }}
      >
        Scroll
        <motion.span
          className="h-10 w-px origin-top bg-gradient-to-b from-accent to-transparent"
          animate={reduce ? undefined : { scaleY: [0, 1, 0], y: [0, 0, 20] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
