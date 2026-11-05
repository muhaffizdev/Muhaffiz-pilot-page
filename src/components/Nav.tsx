"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { EASE, EMERGENCY, GITHUB_URL, NAV_LINKS } from "./site";

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Emergency strip: the only place the emergency colour appears outside the SOS demo. */}
      <div className="flex items-center justify-center gap-3 bg-ink px-4 py-1.5 text-[11px] text-white/85">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-sos" />
          <span className="relative inline-flex size-1.5 rounded-full bg-sos" />
        </span>
        <span>In danger right now?</span>
        {EMERGENCY.map((e) => (
          <a
            key={e.number}
            href={`tel:${e.number}`}
            className="inline-flex min-h-6 items-center gap-1 font-semibold text-sos-on-dark underline-offset-4 hover:underline"
          >
            <Phone className="size-3" aria-hidden />
            {e.number} <span className="hidden font-normal text-white/70 sm:inline">{e.label}</span>
          </a>
        ))}
      </div>

      <motion.nav
        aria-label="Main"
        className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 transition-colors duration-500 md:px-10"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      >
        <div
          className={`absolute inset-0 -z-10 border-b transition-all duration-500 ${
            scrolled
              ? "border-line bg-bg/75 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        />
        <a href="#top" className="flex min-h-11 items-center gap-2.5 font-display text-sm font-semibold tracking-[0.16em]">
          <span className="size-2.5 rounded-full bg-accent shadow-[0_0_16px_rgba(92,194,189,.75)]" />
          MUHAFFIZ
        </a>

        <ul className="hidden items-center gap-8 text-[13px] text-muted lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative py-2 transition-colors hover:text-ink">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center rounded-full border border-line-strong px-5 text-[13px] font-medium text-ink transition-colors hover:border-accent hover:text-accent-ink sm:inline-flex"
          >
            Follow the build
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-b border-line bg-bg/95 px-5 pb-6 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ul className="flex flex-col pt-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, ease: EASE }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-line font-display text-lg text-ink"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent font-medium text-ink"
            >
              Follow the build
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
