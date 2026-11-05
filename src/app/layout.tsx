import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "600"],
});

const title = "Muhaffiz: Offline-First Safety for Women and Children";
const description =
  "Muhaffiz is an Android safety app for Pakistan. SOS that falls back to SMS when there is no internet, on-device danger detection, and family sharing built on consent.";

export const metadata: Metadata = {
  metadataBase: new URL("https://muhaffiz.app"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://muhaffiz.app",
    siteName: "Muhaffiz",
    locale: "en_PK",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#F7F8F6",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${instrument.variable} ${nastaliq.variable} antialiased`}
    >
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
