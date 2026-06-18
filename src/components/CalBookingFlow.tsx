"use client";

import CalBooking from "@/components/CalBooking";

type FlowBooking = {
  step: string;
  day: string;
  title: string;
  calLink: string;
  months: string[];
};

// Beide Trainingstage sind direkt buchbar. Die Reihenfolge (Tag 2 nach Tag 1)
// ist nur eine weiche Empfehlung im Hinweistext – keine harte Sperre, weil die
// Freischalt-Logik in der Praxis zu Buchungs-Bugs geführt hat.
export default function CalBookingFlow({
  bookings,
  accentBg,
}: {
  bookings: FlowBooking[];
  accentBg: string;
  variant: string;
}) {
  return (
    <div className="grid gap-5">
      {bookings.map((b) => (
        <BookingArticle key={b.calLink} booking={b} accentBg={accentBg}>
          <CalBooking
            calLink={b.calLink}
            months={b.months}
            title={`Buchung für ${b.day}`}
          />
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
