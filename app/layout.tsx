import type { ReactNode } from "react";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { AppProviders } from "@/components/providers";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69c72ed246489d192593bd92" />
        <meta
          name="talentapp:project_verification"
          content="ace2f6eb7c31cba3e0cb53b0190e5524f392f31e6b9acc538e24f5eab0417a4e028a38e656011de442e87f0e996f157a2db629d58b4ca843549b06964858a0de"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2453FF" />
        <title>task-board</title>
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <AppProviders>
          <div className="app-shell">
            <main className="page-shell">{children}</main>
            <BottomNav />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
