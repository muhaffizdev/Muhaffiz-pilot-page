"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { EMERGENCY, GITHUB_URL, NAV_LINKS } from "./site";

const TEAM = [
  { name: "Muhammad Shamoil", role: "Developer" },
  { name: "Ali Raza", role: "Developer" },
  { name: "Kanwal Batool", role: "Supervisor" },
];

export default function Closing() {
  const reduce = useReducedMotion();

  return (
    <>
      <section id="team" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">Who’s building it</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-[clamp(30px,3.8vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                A final-year project at Air University, Islamabad.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md leading-relaxed text-muted">
                BS Software Engineering, class of 2027. Muhaffiz is in development for Android, and we’re
                building it in the open.
              </p>
            </Reveal>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {TEAM.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.08} className="flex items-center justify-between py-5">
                <span className="font-display text-xl text-ink">{m.name}</span>
                <span className="text-sm text-faint">{m.role}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative isolate mx-5 mb-5 overflow-hidden rounded-[36px] border border-line bg-mint md:mx-10">
        <div aria-hidden className="hairline-grid absolute inset-0 -z-10 opacity-60" />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(92,194,189,.45),transparent_65%)]"
          animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
          <div className="relative mb-10 grid size-28 place-items-center rounded-full border border-accent/20" aria-hidden>
            <span className="absolute -inset-2.5 animate-spin-slow rounded-full border border-transparent border-t-accent" />
            <span className="font-serif text-5xl text-accent-ink">M</span>
          </div>
          <Reveal>
            <p lang="ur" dir="rtl" className="font-urdu text-3xl leading-[2.2] text-accent-ink md:text-4xl">
              محافظ
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-2 font-display text-[clamp(36px,5.4vw,72px)] font-semibold leading-[1] tracking-[-0.04em]">
              Safety that doesn’t{" "}
              <span className="font-serif font-normal italic text-accent-ink">wait for a signal.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted">
              We’re building Muhaffiz now. Follow along on GitHub to see it take shape.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Follow the build on GitHub
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-10 pt-12 text-sm lg:flex-row lg:items-center lg:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display font-semibold tracking-[0.16em]">
          <span className="size-2 rounded-full bg-accent" />
          MUHAFFIZ
          <span className="w-full font-sans lg:ml-3 lg:w-auto text-xs font-normal tracking-normal text-faint">
            © {new Date().getFullYear()} · Offline-first safety for women and children
          </span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-muted">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-ink-soft">
          <span className="text-faint">Emergency</span>
          {EMERGENCY.map((e) => (
            <a
              key={e.number}
              href={`tel:${e.number}`}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-sos-ink hover:underline"
            >
              <Phone className="size-3.5" aria-hidden />
              {e.number}
              <span className="font-normal text-faint">{e.label}</span>
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
