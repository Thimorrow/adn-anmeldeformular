import type { Metadata } from "next";
import CalBooking from "@/components/CalBooking";

export const metadata: Metadata = {
  title: "cal.com Monatswahl-Demo",
  robots: { index: false, follow: false },
};

// Demo: klickbare Monats-Pills. Klick auf einen Monat lädt den Kalender direkt
// in diesem Monat (cal.com-Embed wird neu initialisiert -> kurzes Nachladen).

const EXAMPLES = [
  {
    title: "Vor Ort · Tag 1",
    calLink: "yesterday-ai/adn-vor-ort-training-tag-1",
    months: ["2026-07", "2026-08"],
  },
  {
    title: "Vor Ort · Tag 2",
    calLink: "yesterday-ai/adn-training-vor-ort-tag-2",
    months: ["2026-08", "2026-09"],
  },
];

export default function CalDemoPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-12">
      <header className="mb-8">
        <p className="mb-2 text-label uppercase text-muted">Interne Demo</p>
        <h1 className="mb-3 text-[32px] font-normal leading-[1.1] tracking-[-0.6px] sm:text-[40px]">
          Klickbare Monatswahl
        </h1>
        <p className="max-w-[760px] text-[15px] leading-[1.6] text-muted">
          Klick oben auf <strong>Juli</strong> oder <strong>August</strong> — der
          Kalender springt in den gewählten Monat (lädt dabei kurz neu). Der
          aktive Monat ist violett gefüllt.
        </p>
      </header>

      <div className="grid gap-6">
        {EXAMPLES.map((e) => (
          <section
            key={e.calLink}
            className="rounded-[16px] border border-shell bg-panel p-5 sm:p-6"
          >
            <h2 className="mb-4 text-[18px] font-medium leading-[1.25]">
              {e.title}
            </h2>
            <CalBooking
              calLink={e.calLink}
              months={e.months}
              title={`Demo ${e.title}`}
            />
          </section>
        ))}
      </div>
    </main>
  );
}
