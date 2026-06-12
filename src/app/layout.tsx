import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADN KI-Transformation | Trainingstermine buchen",
  description: "Termine buchen für die ADN KI-Trainings mit yesterday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: das Inline-Script unten setzt js-anim auf <html>,
    // bevor React hydriert — der Klassen-Unterschied ist beabsichtigt.
    <html lang="de" suppressHydrationWarning>
      <body>
        <script
          // Markiert vor dem ersten Paint, dass JS läuft: globals.css versteckt
          // animierte Elemente nur unter html.js-anim, GSAP blendet sie wieder ein.
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js-anim");`,
          }}
        />
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
