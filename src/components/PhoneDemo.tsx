"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Lock, MapPin, MessageSquareText, Mic, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE } from "./site";

// Timeline of the looping SOS demo, in milliseconds per phase.
const PHASES = [2200, 1500, 1600, 3600, 3000] as const;
const FINAL = PHASES.length - 1;

const CONTACTS = [
  { name: "Ammi", phone: "+92 300 ••• 4417" },
  { name: "Bilal Bhai", phone: "+92 321 ••• 0982" },
  { name: "Sana Khala", phone: "+92 333 ••• 5126" },
];

function SignalBars({ level }: { level: number }) {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-sm"
          style={{ height: 4 + i * 2.5 }}
          animate={{ backgroundColor: i < level ? "#1B1F23" : "rgba(27,31,35,.15)" }}
          transition={{ duration: 0.35, delay: (3 - i) * 0.12 }}
        />
      ))}
    </span>
  );
}

export default function PhoneDemo() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const shown = reduce ? FINAL : phase;

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASES[phase]);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  const offline = shown >= 2;
  const firing = shown >= 1;

  return (
    <div
      className="relative mx-auto w-[min(100%,300px)]"
      role="img"
      aria-label="Demo: an SOS is held down, the phone loses internet, and the alert goes out by SMS to three family contacts with the location."
    >
      {/* Radar rings */}
      <div aria-hidden className="absolute left-1/2 top-[56%] -z-10 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border ${
              firing ? "border-sos/40" : "border-accent/25"
            }`}
            animate={reduce ? undefined : { scale: [0.6, 2.1], opacity: [0.7, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative aspect-[9/19] rounded-[44px] border border-line-strong bg-[#1B1F23] p-2.5 shadow-[0_40px_120px_-30px_rgba(27,31,35,.45),inset_0_0_0_1px_rgba(255,255,255,.03)]">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[36px] bg-gradient-to-b from-mint to-surface">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 font-mono text-[10px] text-ink-soft">
            <span>9:41</span>
            <span className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={offline ? "off" : "on"}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className={offline ? "text-sos-ink" : ""}
                >
                  {offline ? "No data" : "4G"}
                </motion.span>
              </AnimatePresence>
              <SignalBars level={offline ? 0 : 4} />
            </span>
          </div>

          <div className="flex flex-1 flex-col px-5 pt-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-faint">Muhaffiz</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={shown < 1 ? "a" : shown < 3 ? "b" : "c"}
                className="mt-1 font-display text-lg leading-tight text-ink"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {shown < 1 ? "You’re safe. Hold if you’re not." : shown < 3 ? "Sending SOS…" : "Help is on the way."}
              </motion.p>
            </AnimatePresence>

            {/* SOS button */}
            <div className="relative mx-auto mt-6 grid size-32 place-items-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(229,72,61,.18)" strokeWidth="3" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="var(--sos)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: firing ? 1 : 0 }}
                  transition={{ duration: firing && shown === 1 ? 1.3 : 0.4, ease: "linear" }}
                />
              </svg>
              <motion.div
                className="grid size-24 place-items-center rounded-full bg-sos font-display text-2xl font-bold tracking-wider text-white shadow-[0_0_50px_rgba(229,72,61,.45)]"
                animate={
                  reduce
                    ? undefined
                    : shown === 0
                      ? { scale: [1, 1.05, 1] }
                      : shown === 1
                        ? { scale: 0.92 }
                        : { scale: 1 }
                }
                transition={shown === 0 ? { duration: 1.6, repeat: Infinity } : { duration: 0.3 }}
              >
                SOS
              </motion.div>
            </div>

            {/* Delivery log */}
            <div className="mt-6 min-h-[150px] space-y-2">
              <AnimatePresence>
                {shown >= 2 && (
                  <motion.div
                    key="tier"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-line bg-white/75 px-3 py-2 text-[10.5px] text-ink-soft"
                  >
                    <MessageSquareText className="size-3.5 shrink-0 text-accent-ink" aria-hidden />
                    No internet. Switching to SMS.
                  </motion.div>
                )}
                {shown >= 3 &&
                  CONTACTS.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: reduce ? 0 : 0.35 + i * 0.45, ease: EASE }}
                      className="flex items-center justify-between rounded-xl bg-ink/[.04] px-3 py-2"
                    >
                      <span>
                        <span className="block text-[11px] font-medium text-ink">{c.name}</span>
                        <span className="block font-mono text-[9px] text-faint">{c.phone}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-accent-ink">
                        <Check className="size-3" aria-hidden /> SMS sent
                      </span>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {shown >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: reduce ? 0 : 1.7 }}
                  className="mt-2 flex items-center gap-1.5 text-[10px] text-muted"
                >
                  <MapPin className="size-3 text-accent-ink" aria-hidden />
                  Saddar, Rawalpindi · 33.5973, 73.0479
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {shown >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-auto mb-4 space-y-1.5 rounded-2xl border border-line bg-white/75 p-3 text-[10px] text-ink-soft"
                >
                  <p className="flex items-center gap-1.5">
                    <Mic className="size-3 text-sos-ink" aria-hidden />
                    Recording on this phone only
                    <Lock className="ml-auto size-3 text-faint" aria-hidden />
                  </p>
                  <p className="flex items-center gap-1.5 text-muted">
                    <ShieldAlert className="size-3 text-accent-ink" aria-hidden />
                    No reply in 3 min → alerts Police 15
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
