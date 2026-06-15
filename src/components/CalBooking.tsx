"use client";

import { useState } from "react";
import CalWidget from "@/components/CalWidget";

const MONTH_NAMES = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

// "2026-07" -> "Juli" (Jahr nur anhängen, falls mehrere Jahre im Spiel sind)
function formatMonth(ym: string, withYear: boolean) {
  const [year, month] = ym.split("-");
  const name = MONTH_NAMES[Number(month) - 1] ?? ym;
  return withYear ? `${name} ${year}` : name;
}

export default function CalBooking({
  calLink,
  months,
  title,
}: {
  calLink: string;
  months: string[]; // Monate mit freien Terminen (JJJJ-MM), aufsteigend
  title: string;
}) {
  const [active, setActive] = useState(months[0]);
  const multiMonth = months.length > 1;
  // Jahr nur zeigen, wenn die Termine über mehrere Jahre verteilt sind.
  const withYear = new Set(months.map((m) => m.split("-")[0])).size > 1;

  return (
    <>
      {multiMonth && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-violet/[0.06] px-5 py-3.5">
          <span className="flex items-center gap-2 text-[14px] text-ink">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-violet"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5" />
              <path d="M12 8h.01" />
            </svg>
            Freie Termine in mehreren Monaten — Monat wählen:
          </span>
          <span className="flex flex-wrap gap-2">
            {months.map((m) => {
              const isActive = m === active;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setActive(m)}
                  aria-pressed={isActive}
                  className={[
                    "inline-flex min-h-8 items-center rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150 ease-out",
                    isActive
                      ? "bg-violet text-white"
                      : "border border-violet/40 text-ink hover:bg-violet/10",
                  ].join(" ")}
                >
                  {formatMonth(m, withYear)}
                </button>
              );
            })}
          </span>
        </div>
      )}
      {/* Alle Monate werden sofort vorgeladen und liegen im selben Grid-Feld
          übereinander; nur der aktive ist sichtbar. Inaktive behalten ihre
          Größe (visibility statt display), damit der Embed korrekt
          dimensioniert bleibt und jeder Wechsel – auch der erste – sofort ist. */}
      <div className="grid">
        {months.map((m) => (
          <div
            key={m}
            className={[
              "[grid-area:1/1]",
              m === active ? "" : "invisible pointer-events-none",
            ].join(" ")}
          >
            <CalWidget calLink={calLink} month={m} title={title} />
          </div>
        ))}
      </div>
    </>
  );
}
