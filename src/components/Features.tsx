"use client";

import { motion, useReducedMotion } from "motion/react";
import { BookOpen, FileWarning, Lock, Phone, Search, UsersRound } from "lucide-react";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import Reveal from "./Reveal";
import { EASE } from "./site";

function Tile({
  className = "",
  title,
  body,
  children,
  index,
}: {
  className?: string;
  title: string;
  body: string;
  children?: ReactNode;
  index: number;
}) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <motion.li
      onPointerMove={onMove}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: EASE }}
      className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface/80 p-7 md:p-8 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(420px circle at var(--x) var(--y), rgba(92,194,189,.09), transparent 60%)",
        }}
      />
      <div className="relative flex-1">{children}</div>
      <div className="relative mt-6">
        <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-ink">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </motion.li>
  );
}

function Calculator() {
  const reduce = useReducedMotion();
  const sequence = ["0", "12", "125", "125×", "125×4", "500"];
  const [i, setI] = useState(reduce ? sequence.length - 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % sequence.length), 900);
    return () => clearInterval(t);
  }, [reduce, sequence.length]);
  const keys = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+"];
  return (
    <div className="mx-auto w-[min(100%,250px)] rotate-[-3deg] rounded-[26px] border border-line-strong bg-[#0a0d0c] p-4 shadow-2xl transition-transform duration-700 group-hover:rotate-0">
      <div className="flex h-16 items-end justify-end px-2 font-mono text-4xl text-white">
        <motion.span key={i} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          {sequence[i]}
        </motion.span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2" aria-hidden>
        {keys.map((k) => (
          <span
            key={k}
            className={`grid aspect-square place-items-center rounded-full text-sm ${
              ["÷", "×", "−", "+"].includes(k) ? "bg-[#c9a227] text-black" : "bg-white/[.09] text-white/80"
            }`}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function Circle() {
  const reduce = useReducedMotion();
  const people = ["Ayesha", "Ammi", "Abbu", "Bilal"];
  return (
    <div className="relative flex h-36 items-center justify-between px-2">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 144" aria-hidden>
        <motion.path
          d="M40 72 C 120 10, 280 10, 360 72"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity=".45"
          strokeDasharray="5 6"
          animate={reduce ? undefined : { strokeDashoffset: [0, -44] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M40 72 C 120 134, 280 134, 360 72"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity=".25"
          strokeDasharray="5 6"
          animate={reduce ? undefined : { strokeDashoffset: [0, 44] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {people.map((p, i) => (
        <motion.span
          key={p}
          className="relative z-10 flex flex-col items-center gap-2"
          animate={reduce ? undefined : { y: [0, i % 2 ? 5 : -5, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="grid size-12 place-items-center rounded-full border border-accent/50 bg-surface font-display text-sm font-semibold text-accent-ink">
            {p[0]}
          </span>
          <span className="text-[11px] text-muted">{p}</span>
          <span className={`text-[10px] ${i === 2 ? "text-faint" : "text-accent-ink"}`}>
            {i === 2 ? "Last seen 14:20 · not live" : "Sharing"}
          </span>
        </motion.span>
      ))}
    </div>
  );
}

function Heatmap() {
  const reduce = useReducedMotion();
  // Fixed weights so the grid looks like real clustering, not noise.
  const cells = [
    0, 0, 1, 1, 0, 0, 0, 1, 2, 3, 1, 0, 0, 1, 3, 4, 2, 1, 0, 0, 2, 3, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2,
  ];
  const colour = ["rgba(92,194,189,.14)", "rgba(92,194,189,.45)", "rgba(232,180,80,.55)", "rgba(240,130,70,.65)", "rgba(229,72,61,.8)"];
  return (
    <div className="grid grid-cols-6 gap-1.5" aria-hidden>
      {cells.map((c, i) => (
        <motion.span
          key={i}
          className="aspect-square rounded-md"
          style={{ backgroundColor: colour[c] }}
          animate={reduce || c < 3 ? undefined : { opacity: [1, 0.55, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

function NearHelp() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto grid size-36 place-items-center" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-accent/30"
          animate={reduce ? undefined : { scale: [0.3, 1], opacity: [0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }}
        />
      ))}
      {[
        [12, 30],
        [78, 18],
        [86, 70],
        [24, 82],
      ].map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
          style={{ left: `${x}%`, top: `${y}%` }}
          animate={reduce ? undefined : { scale: [1, 1.5, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <span className="size-4 rounded-full bg-ink" />
    </div>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-12 place-items-center rounded-2xl border border-line-strong bg-mint text-accent-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
      {children}
    </span>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">What’s inside</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Everything a bad night{" "}
              <span className="font-serif font-normal italic text-accent-ink">might ask of a phone.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Nineteen modules, designed together around one rule: the phone should keep helping you even
            when the network, the battery or the person next to you won’t.
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
        <Tile
          index={0}
          className="lg:col-span-2 lg:row-span-2"
          title="Decoy mode"
          body="If someone makes you unlock your phone, they see an ordinary screen. A hidden gesture brings you back. SOS, voice triggers and location keep running underneath."
        >
          <div className="flex h-full items-center justify-center py-6">
            <Calculator />
          </div>
        </Tile>

        <Tile
          index={1}
          className="lg:col-span-2"
          title="Family Circle, built on consent"
          body="Both people accept before anything is shared. Stop sharing with your safe phrase, with no one’s approval and no alert to anyone else. Others just see your last location, marked not live."
        >
          <Circle />
        </Tile>

        <Tile
          index={2}
          title="Danger heatmap"
          body="Reports grouped into map cells, with older ones counting for less. Reporters are never shown."
        >
          <Heatmap />
        </Tile>

        <Tile
          index={3}
          title="Evidence on SOS"
          body="Audio recording starts only after an SOS fires. It’s encrypted and stays on your phone."
        >
          <IconBadge>
            <Lock className="size-5" aria-hidden />
          </IconBadge>
        </Tile>

        <Tile
          index={4}
          title="Near Help"
          body="Reach identity-checked helpers within a set radius. Offline, it says so clearly instead of failing quietly."
        >
          <NearHelp />
        </Tile>

        <Tile
          index={5}
          title="Missing-child report"
          body="Alert a guardian’s trusted contacts and verified people nearby, then hand off to official channels."
        >
          <IconBadge>
            <FileWarning className="size-5" aria-hidden />
          </IconBadge>
        </Tile>

        <Tile
          index={6}
          className="lg:col-span-2"
          title="Help that works offline"
          body="A safety library bundled with the app, searchable by meaning on the device, plus a directory of hospitals and helplines with one-tap calling, nearest first."
        >
          <div className="flex flex-wrap gap-3">
            <IconBadge>
              <BookOpen className="size-5" aria-hidden />
            </IconBadge>
            <IconBadge>
              <Search className="size-5" aria-hidden />
            </IconBadge>
            <IconBadge>
              <Phone className="size-5" aria-hidden />
            </IconBadge>
            <IconBadge>
              <UsersRound className="size-5" aria-hidden />
            </IconBadge>
          </div>
        </Tile>
      </ul>
    </section>
  );
}
