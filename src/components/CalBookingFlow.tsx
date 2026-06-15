"use client";

import { useEffect, useState } from "react";
import CalBooking from "@/components/CalBooking";

type FlowBooking = {
  step: string;
  day: string;
  title: string;
  calLink: string;
  months: string[];
};

// Schritt-Logik: Der erste Termin (Tag 1) muss gebucht sein, bevor sich die
// folgenden (Tag 2) öffnen. So kann niemand Tag 2 vor Tag 1 legen.
export default function CalBookingFlow({
  bookings,
  accentBg,
  variant,
}: {
  bookings: FlowBooking[];
  accentBg: string;
  variant: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const storageKey = `adn-tag1-gebucht-${variant}`;

  // Gebucht-Status über Reloads hinweg merken (weiche Führung, keine Sperre).
  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === "1") setUnlocked(true);
    } catch {
      // localStorage nicht verfügbar (z. B. privater Modus) -> einfach ignorieren
    }
  }, [storageKey]);

  function unlock() {
    setUnlocked(true);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // ignorieren
    }
  }

  const [first, ...rest] = bookings;

  return (
    <div className="grid gap-5">
      <BookingArticle booking={first} accentBg={accentBg}>
        <CalBooking
          calLink={first.calLink}
          months={first.months}
          title={`Buchung für ${first.day}`}
          onBooked={unlock}
        />
      </BookingArticle>

      {rest.map((b) => (
        <BookingArticle key={b.calLink} booking={b} accentBg={accentBg}>
          {unlocked ? (
            <CalBooking
              calLink={b.calLink}
              months={b.months}
              title={`Buchung für ${b.day}`}
            />
          ) : (
            <LockedPanel onUnlock={unlock} />
          )}
        </BookingArticle>
      ))}
    </div>
  );
}

function BookingArticle({
  booking,
  accentBg,
  children,
}: {
  booking: FlowBooking;
  accentBg: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="overflow-hidden rounded-[10px] border border-line bg-white"
      data-reveal
    >
      <div className="flex items-center gap-4 px-5 pb-3 pt-5 sm:px-6">
        <span
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white",
            accentBg,
          ].join(" ")}
          aria-hidden="true"
        >
          {booking.step}
        </span>
        <div>
          <span className="mb-1 block text-label uppercase text-muted">
            {booking.day}
          </span>
          <h3 className="mb-0 text-[22px] font-medium leading-[1.25]">
            <span className="sr-only">Schritt {booking.step}: </span>
            {booking.title}
          </h3>
        </div>
      </div>
      {children}
    </article>
  );
}

function LockedPanel({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border-t border-line bg-black/[0.015] px-6 py-14 text-center">
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-icon-container ring-1 ring-teal/12">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-teal"
        >
          <rect x="4" y="11" width="16" height="9" rx="2.5" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
      <div>
        <p className="text-[17px] font-medium text-ink">
          Tag 2 öffnet sich nach Tag 1
        </p>
        <p className="mx-auto mt-1 max-w-[360px] text-[14px] leading-[1.6] text-muted">
          Buche zuerst oben deinen Termin für Tag 1 — danach kannst du hier
          deinen Tag 2 wählen.
        </p>
      </div>
      <button
        type="button"
        onClick={onUnlock}
        className="text-[13px] font-medium text-violet underline-offset-2 hover:underline"
      >
        Tag 1 schon gebucht? Hier freischalten
      </button>
    </div>
  );
}
