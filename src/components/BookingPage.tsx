import Image from "next/image";
import Link from "next/link";
import CalendlyWidget from "@/components/CalendlyWidget";
import PageAnimations from "@/components/PageAnimations";

type Variant = "vor-ort" | "digital";

type Booking = {
  step: string;
  day: string;
  title: string;
  url: string;
};

type Content = {
  heroTitle: string;
  heroText: string;
  bookingHeading: string;
  infoHeading: string;
  notice: React.ReactNode;
  bookings: Booking[];
  cards: { label: string; title: string; body: string }[];
  format: string;
};

const CONTENT: Record<Variant, Content> = {
  "vor-ort": {
    heroTitle: "Buche deine zwei Trainingstage vor Ort",
    heroText:
      "Dein KI-Training beginnt mit zwei Präsenztagen im ADN Gebäude. Wähle unten zuerst einen Termin für Tag 1 und danach einen für Tag 2.",
    bookingHeading: "Beide Termine vor Ort auswählen",
    infoHeading: "Was dich an den zwei Tagen vor Ort erwartet",
    notice: (
      <>
        <strong className="font-medium text-ink">Wichtig:</strong> Dein Termin
        für Tag 2 muss nach deinem Termin für Tag 1 liegen.
      </>
    ),
    bookings: [
      {
        step: "1",
        day: "Tag 1 · Grundlagen-Training",
        title: "Termin für Tag 1 wählen",
        url: "https://calendly.com/adn-yesterday/grundlagen-training-vor-ort?hide_event_type_details=1&hide_gdpr_banner=1",
      },
      {
        step: "2",
        day: "Tag 2 · Fortgeschrittenen-Training",
        title: "Termin für Tag 2 wählen",
        url: "https://calendly.com/adn-yesterday/grundlagen-training-vor-ort-clone-1?hide_event_type_details=1&hide_gdpr_banner=1",
      },
    ],
    cards: [
      {
        label: "Tag 1",
        title: "Grundlagen-Training",
        body: "Gemeinsamer Einstieg im ADN Gebäude: erstes praktisches Ausprobieren, verständliche Einführung in die Grundlagen der KI und sicherer Umgang mit dem Werkzeug im Arbeitsalltag.",
      },
      {
        label: "Tag 2",
        title: "Fortgeschrittenen-Training",
        body: "Weiter vor Ort: vom einfachen Fragen stellen zum Einrichten eigener KI Helfer für wiederkehrende Aufgaben, inklusive Grenzen der KI und einem persönlichen Plan für die Umsetzung im Team.",
      },
    ],
    format:
      "Beide Tage finden vor Ort im ADN Gebäude statt. Das Training ist Teil des KI Transformationsprogramms bei ADN und wird von yesterday durchgeführt.",
  },
  digital: {
    heroTitle: "Buche deine zwei digitalen Trainingstage",
    heroText:
      "Das digitale Training baut auf den Tagen vor Ort auf und läuft remote von deinem Arbeitsplatz aus. Wähle auch hier zuerst einen Termin für Tag 1 und danach einen für Tag 2.",
    bookingHeading: "Beide digitalen Termine auswählen",
    infoHeading: "Was dich an den zwei digitalen Tagen erwartet",
    notice: (
      <>
        <strong className="font-medium text-ink">Wichtig:</strong> Buche zuerst
        das{" "}
        <Link href="/" className="font-medium text-ink underline">
          Training vor Ort
        </Link>
        . Dein Termin für Tag 2 muss nach deinem Termin für Tag 1 liegen.
      </>
    ),
    bookings: [
      {
        step: "1",
        day: "Tag 1 · Grundlagen-Training",
        title: "Termin für Tag 1 wählen",
        url: "https://calendly.com/adn-yesterday/grundlagen-training-vor-ort-clone?hide_event_type_details=1&hide_gdpr_banner=1",
      },
      {
        step: "2",
        day: "Tag 2 · Fortgeschrittenen-Training",
        title: "Termin für Tag 2 wählen",
        url: "https://calendly.com/adn-yesterday/grundlagen-training-digital-clone?hide_event_type_details=1&hide_gdpr_banner=1",
      },
    ],
    cards: [
      {
        label: "Tag 1",
        title: "Grundlagen-Training",
        body: "Remote von deinem Arbeitsplatz aus: Vertiefung der Grundlagen aus dem Training vor Ort und sicheres Anwenden des Werkzeugs in deinen eigenen Aufgaben.",
      },
      {
        label: "Tag 2",
        title: "Fortgeschrittenen-Training",
        body: "Ebenfalls remote: eigene KI Helfer für wiederkehrende Aufgaben einrichten, Grenzen der KI kennenlernen und ein persönlicher Plan für die Umsetzung im Team.",
      },
    ],
    format:
      "Beide Tage finden remote statt. Das Training ist Teil des KI Transformationsprogramms bei ADN und wird von yesterday durchgeführt.",
  },
};

export default function BookingPage({ variant }: { variant: Variant }) {
  const content = CONTENT[variant];
  const isVorOrt = variant === "vor-ort";
  const accentBg = "bg-teal";
  const chipLabel = isVorOrt ? "Training 1 · Vor Ort" : "Training 2 · Digital";

  return (
    <>
      <header className="sticky top-0 z-10 flex min-h-[68px] items-center justify-between gap-6 border-b border-line bg-white/80 px-5 py-3.5 backdrop-blur-xl max-sm:items-start max-sm:gap-2 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-10 lg:px-16">
        <a
          className="inline-flex items-center gap-3 text-[13px] font-medium text-ink no-underline sm:justify-self-start"
          href="/"
          aria-label="Yesterday Academy"
        >
          <Image src="/academy-mark.svg" alt="" width={30} height={30} priority />
          <span>yesterday academy</span>
        </a>
        <nav
          aria-label="Training wählen"
          className="relative grid grid-cols-2 items-center rounded-full border border-line bg-white p-1 shadow-card"
        >
          <span
            aria-hidden="true"
            className={[
              "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition duration-300 ease-out motion-reduce:transition-none",
              accentBg,
              isVorOrt ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          />
          <ToggleLink href="/" step="1" active={isVorOrt}>
            Vor Ort
          </ToggleLink>
          <ToggleLink href="/digital" step="2" active={!isVorOrt}>
            Digital
          </ToggleLink>
        </nav>
      </header>

      <main className="px-3 pb-10 sm:px-6 lg:px-12">
        <PageAnimations key={variant} />

        <section className="mx-auto grid max-w-[1180px] items-stretch gap-5 py-4 sm:py-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-8">
          <div className="flex min-w-0 flex-col justify-center rounded-[28px] border border-shell bg-panel px-8 py-9 shadow-card sm:px-12 lg:px-14">
            <p className="mb-3 text-label uppercase text-muted" data-hero-item>
              ADN KI-Transformation
            </p>
            <span
              className={[
                "mb-4 inline-flex w-fit items-center rounded-full px-4 py-2 text-[13px] font-medium text-white",
                accentBg,
              ].join(" ")}
              data-hero-item
            >
              {chipLabel}
            </span>
            <h1
              className="mb-5 max-w-[760px] text-[36px] font-normal leading-[1.05] tracking-[-0.8px] text-ink sm:text-[46px] lg:text-[52px] lg:tracking-[-1.2px]"
              data-hero-item
            >
              {content.heroTitle}
            </h1>
            <p
              className="mb-7 max-w-[700px] text-[15px] leading-[1.62] text-muted sm:text-[17px]"
              data-hero-item
            >
              {content.heroText}
            </p>
            <a
              className="group inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-full bg-button-primary px-6 text-[13px] font-medium leading-none text-white no-underline shadow-button transition-[background-color,transform] duration-200 ease-out hover:bg-button-primary-hover active:scale-[0.98] motion-reduce:transition-none"
              href="#buchung"
              data-hero-item
            >
              <span className="text-white">Jetzt Termine buchen</span>
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/12 text-white transition-[background-color,transform] duration-200 ease-out group-hover:translate-y-0.5 group-hover:bg-white/18 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </div>

          <section
            className="flex min-w-0 flex-col justify-center gap-5 rounded-[28px] bg-hero-gradient p-6 text-white shadow-hero sm:p-8 lg:p-9"
            aria-label="So funktioniert die Buchung"
            data-hero-panel
          >
            <div>
              <p className="mb-3 text-label uppercase text-white/65">
                So funktioniert&rsquo;s
              </p>
              <h2 className="mb-0 text-[26px] font-normal leading-[1.12] tracking-[-0.4px] sm:text-[30px]">
                Erst vor Ort, dann digital.
              </h2>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <TrainingStep
                index="01"
                title="Training vor Ort"
                body={
                  isVorOrt
                    ? "Buchst du hier auf dieser Seite."
                    : "Buchst du zuerst auf der ersten Seite."
                }
                variant="dark"
              />
              <div
                className="my-3 ml-5 h-12 w-0.5 rounded-full bg-white/20"
                aria-hidden="true"
                data-hero-step
              />
              <TrainingStep
                index="02"
                title="Digitales Training"
                body={
                  isVorOrt
                    ? "Buchst du danach im nächsten Schritt."
                    : "Buchst du jetzt hier auf dieser Seite."
                }
                variant="dark"
              />
            </div>
          </section>
        </section>

        <section
          id="buchung"
          className="mx-auto mb-7 max-w-[1180px] rounded-[28px] border border-shell bg-panel p-6 sm:p-8"
        >
          <SectionHeading label="Buchung">{content.bookingHeading}</SectionHeading>

          <p
            className="mb-6 flex items-center gap-3 rounded-2xl border border-orange/25 bg-notice px-4 py-3 text-[15px] leading-[1.55]"
            data-reveal
          >
            <span
              className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-orange font-semibold text-white"
              aria-hidden="true"
            >
              !
            </span>
            <span>{content.notice}</span>
          </p>

          <div className="grid gap-5 xl:grid-cols-2">
            {content.bookings.map((booking) => (
              <article
                key={booking.url}
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
                <CalendlyWidget
                  url={booking.url}
                  title={`Calendly Buchung für ${booking.day}`}
                />
              </article>
            ))}
          </div>

          {isVorOrt && (
            <Link
              href="/digital"
              className="group mt-6 flex min-h-[56px] flex-wrap items-center justify-between gap-3 rounded-2xl bg-button-primary px-6 py-4 text-[15px] font-medium text-white no-underline shadow-button transition-colors duration-200 ease-out hover:bg-button-primary-hover"
            >
              <span className="text-white">
                Beide Termine vor Ort gebucht? Weiter zum digitalen Training
              </span>
              <span
                aria-hidden="true"
                className="text-white transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </Link>
          )}
        </section>

        <section className="mx-auto mb-7 max-w-[1180px] rounded-[28px] border border-shell bg-panel p-6 sm:p-8">
          <SectionHeading label="Gut zu wissen">
            {content.infoHeading}
          </SectionHeading>

          <div className="mb-4 grid gap-4 lg:grid-cols-2">
            {content.cards.map((card) => (
              <TrainingCard
                key={card.label}
                label={card.label}
                title={card.title}
                body={card.body}
              />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Detail label="Format">{content.format}</Detail>
            <Detail label="Kontakt">
              Bei Fragen oder zum Umbuchen wende dich bitte an Vanessa Fröhlich.
            </Detail>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-end gap-2.5 px-5 pb-6 pt-3 text-label uppercase text-footer sm:px-10 lg:px-16">
        <span>Alle Rechte vorbehalten © 2026</span>
        <a href="#" aria-label="AGB folgen später">
          AGB
        </a>
        <a href="#" aria-label="Datenschutz folgt später">
          Datenschutz
        </a>
        <a href="#" aria-label="Impressum folgt später">
          Impressum
        </a>
        <a href="#" aria-label="Service Description folgt später">
          Service Description
        </a>
      </footer>
    </>
  );
}

function ToggleLink({
  href,
  step,
  active,
  children,
}: {
  href: string;
  step: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "relative inline-flex min-h-9 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-medium no-underline transition-colors duration-300 motion-reduce:transition-none",
        active ? "text-white" : "text-ink-soft",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-300 motion-reduce:transition-none",
          active ? "bg-white/15 text-white" : "bg-icon-container text-violet",
        ].join(" ")}
        aria-hidden="true"
      >
        {step}
      </span>
      <span
        className={[
          "transition-colors duration-300 motion-reduce:transition-none",
          active ? "text-white" : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </span>
    </Link>
  );
}

function TrainingStep({
  index,
  title,
  body,
  variant = "light",
}: {
  index: string;
  title: string;
  body: string;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";

  return (
    <div className="grid grid-cols-[48px_1fr] items-start gap-4" data-hero-step>
      <span
        className={[
          "flex h-[42px] w-[42px] items-center justify-center rounded-[14px] text-xs font-medium",
          dark ? "bg-white/15 text-white" : "bg-icon-container text-violet",
        ].join(" ")}
      >
        {index}
      </span>
      <div>
        <h3 className="mb-2 text-xl font-medium leading-[1.3]">{title}</h3>
        <p
          className={[
            "mb-0 text-[15px] leading-[1.55]",
            dark ? "text-white/70" : "text-muted",
          ].join(" ")}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 max-w-[720px]" data-reveal>
      <p className="mb-2 text-label uppercase text-muted">{label}</p>
      <h2 className="mb-0 text-[28px] font-normal leading-[1.1] tracking-[-0.5px] sm:text-[38px] lg:text-[44px] lg:tracking-[-0.9px]">
        {children}
      </h2>
    </div>
  );
}

function TrainingCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article
      className="rounded-[10px] border border-line bg-white p-5 sm:p-6"
      data-reveal
    >
      <span className="mb-2 block text-label uppercase text-muted">{label}</span>
      <h3 className="mb-2.5 text-xl font-medium leading-[1.3]">{title}</h3>
      <p className="mb-0 text-[15px] leading-[1.55] text-muted">{body}</p>
    </article>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white/60 px-5 py-[18px]" data-reveal>
      <span className="mb-2 block text-label uppercase text-muted">{label}</span>
      <p className="mb-0 text-[15px] leading-[1.55] text-muted">{children}</p>
    </div>
  );
}
