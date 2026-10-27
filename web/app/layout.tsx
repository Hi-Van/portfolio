import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, Literata } from "next/font/google";
import { ChatProvider } from "../components/agent/chat-provider";
import { SiteFooter } from "../components/shell/site-footer";
import { SiteHeader } from "../components/shell/site-header";
import { SkipLink } from "../components/shell/skip-link";
import { site } from "../content/site";
import { Providers } from "./providers";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const reading = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

const ui = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "Van Sirisouk",
    template: "%s · Van Sirisouk",
  },
  description:
    "A measurement-first portfolio: the systems, the numbers, and how they were produced.",
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${reading.variable} ${ui.variable}`}
    >
      <body>
        <Providers>
          <ChatProvider>
            <SkipLink />
            <SiteHeader />
            {children}
            <SiteFooter />
          </ChatProvider>
        </Providers>
      </body>
    </html>
  );
}
