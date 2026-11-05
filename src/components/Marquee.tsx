const ITEMS: { text: string; urdu?: boolean }[] = [
  { text: "SOS by SMS at zero signal" },
  { text: "محافظ", urdu: true },
  { text: "Detection on the device" },
  { text: "آپ کی حفاظت، آپ کے ہاتھ میں", urdu: true },
  { text: "Sharing only with consent" },
  { text: "Decoy screen under pressure" },
  { text: "مدد، جب انٹرنیٹ نہ ہو", urdu: true },
  { text: "Evidence kept encrypted on your phone" },
];

/** Infinite bilingual ticker. Duplicated once so the loop is seamless. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map((item) => (
        <li key={item.text} className="flex items-center gap-10 whitespace-nowrap">
          <span
            lang={item.urdu ? "ur" : undefined}
            dir={item.urdu ? "rtl" : undefined}
            className={
              item.urdu
                ? "font-urdu text-2xl leading-[2.2] text-accent-ink md:text-3xl"
                : "font-display text-xl text-ink-soft md:text-2xl"
            }
          >
            {item.text}
          </span>
          <span className="size-1.5 rounded-full bg-accent/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-mint/60 py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
