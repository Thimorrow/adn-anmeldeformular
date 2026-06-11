import Image from "next/image";

const bookings = [
  {
    step: "Tag 1 von 2",
    title: "Dieses Training zuerst buchen",
    url: "https://calendly.com/adn-yesterday/grundlagen-training-vor-ort?hide_event_type_details=1&hide_gdpr_banner=1",
  },
  {
    step: "Tag 2 von 2",
    title: "Dieses Training danach buchen",
    url: "https://calendly.com/adn-yesterday/grundlagen-training-vor-ort-clone-1?hide_event_type_details=1&hide_gdpr_banner=1",
  },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 flex min-h-[68px] items-center justify-between gap-6 bg-white/80 px-5 py-3.5 backdrop-blur-xl max-sm:items-start max-sm:gap-2 sm:px-10 lg:px-16">
        <a
          className="inline-flex items-center gap-3 text-[13px] font-medium text-ink no-underline"
          href="/"
          aria-label="Yesterday Academy"
        >
          <Image src="/academy-mark.svg" alt="" width={30} height={30} priority />
          <span>yesterday academy</span>
        </a>
        <a
          className="inline-flex min-h-10 items-center border-b border-current text-[13px] font-medium text-ink-soft no-underline"
          href="#buchung"
        >
          Termine buchen
        </a>
      </header>

      <main className="px-3 pb-10 sm:px-6 lg:px-12">
        <section className="mx-auto grid max-w-[1180px] items-stretch gap-5 py-4 sm:py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
          <div className="flex min-h-[430px] min-w-0 flex-col justify-center rounded-[28px] border border-shell bg-panel px-8 py-10 shadow-card sm:px-12 lg:px-14">
            <p className="mb-3 text-label uppercase text-muted">
              ADN KI-Transformation
            </p>
            <h1 className="mb-6 max-w-[760px] text-[38px] font-normal leading-[1.05] tracking-[-0.8px] text-ink sm:text-[50px] lg:text-[58px] lg:tracking-[-1.4px]">
              Termine buchen für KI Training vor Ort
            </h1>
            <p className="mb-8 max-w-[700px] text-[15px] leading-[1.62] text-muted sm:text-[17px]">
              Das Training ist Teil des KI-Transformationsprogramms bei ADN und
              wird von yesterday als Partner für die KI-Transformation
              durchgeführt. Ziel ist, dass du KI sicher in deinem Arbeitsalltag
              einsetzt – vom ersten Umgang mit dem Werkzeug bis hin zu eigenen
              KI-Helfern für wiederkehrende Aufgaben.
            </p>
            <a
              className="group inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-full bg-button-primary px-6 text-[13px] font-medium leading-none text-white no-underline shadow-button transition hover:-translate-y-px hover:bg-button-primary-hover"
              href="#buchung"
            >
              <span className="text-white">Termine auswählen</span>
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/12 text-white transition group-hover:translate-x-0.5 group-hover:bg-white/18"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>

          <div
            className="flex min-w-0 flex-col justify-between rounded-[28px] bg-hero-gradient p-6 text-white shadow-hero sm:p-8 lg:p-9"
            aria-label="Trainingsübersicht"
          >
            <div>
              <p className="mb-3 text-label uppercase text-white/65">Vor Ort</p>
              <h2 className="mb-4 text-[28px] font-normal leading-[1.12] tracking-[-0.4px] sm:text-[34px]">
                Zwei Tage, eine klare Reihenfolge.
              </h2>
              <p className="mb-7 text-[15px] leading-[1.55] text-white/75">
                Beide Termine gehören zusammen. Tag 1 legt die Grundlage, Tag 2
                übersetzt das Gelernte in eigene KI-Helfer und Team-Umsetzung.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <TrainingStep
                index="01"
                title="Grundlagen-Training"
                body="Zuerst buchen."
                variant="dark"
              />
              <div className="my-3 ml-5 h-12 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
              <TrainingStep
                index="02"
                title="Fortgeschrittenen-Training"
                body="Danach buchen."
                variant="dark"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto mb-7 max-w-[1180px] rounded-[28px] border border-shell bg-panel p-6 sm:p-8">
          <SectionHeading label="Ablauf">
            Zwei aufeinander aufbauende Trainingstage
          </SectionHeading>

          <div className="mb-4 grid gap-4 lg:grid-cols-2">
            <TrainingCard
              label="Tag 1"
              title="Grundlagen-Training"
              body="Erstes praktisches Ausprobieren, verständliche Einführung in die Grundlagen der KI und sicherer Umgang mit dem Werkzeug im Arbeitsalltag."
            />
            <TrainingCard
              label="Tag 2"
              title="Fortgeschrittenen-Training"
              body="Vom einfachen Fragen-Stellen zum Einrichten eigener KI-Helfer für wiederkehrende Aufgaben, inklusive Grenzen der KI und einem persönlichen Plan für die Umsetzung im Team."
            />
          </div>

          <aside className="my-4 grid gap-4 rounded-2xl border border-orange/25 bg-notice p-5 sm:grid-cols-[42px_1fr]">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-orange font-semibold text-white">
              !
            </div>
            <div>
              <h3 className="mb-2.5 text-xl font-medium leading-[1.3]">
                Bitte zuerst Tag 1 buchen
              </h3>
              <p className="mb-0 text-[15px] leading-[1.55] text-muted">
                Buche zuerst Tag 1 und anschließend Tag 2. Die Termine für Tag 1
                liegen alle zeitlich vor den Terminen für Tag 2 – achte bei der
                Auswahl darauf, dass dein Tag-2-Termin nach deinem Tag-1-Termin
                liegt.
              </p>
            </div>
          </aside>

          <div className="grid gap-4 lg:grid-cols-2">
            <Detail label="Format">
              Beide Tage finden vor Ort im ADN-Gebäude statt.
            </Detail>
            <Detail label="Kontakt">
              Bei Fragen oder zum Umbuchen wende dich bitte an Vanessa Fröhlich.
            </Detail>
          </div>
        </section>

        <section
          id="buchung"
          className="mx-auto mb-7 max-w-[1180px] rounded-[28px] border border-shell bg-panel p-6 sm:p-8"
        >
          <SectionHeading label="Buchung">
            Beide Termine nacheinander auswählen
          </SectionHeading>

          <div className="grid gap-5 xl:grid-cols-2">
            {bookings.map((booking) => (
              <article
                key={booking.url}
                className="overflow-hidden rounded-[10px] border border-line bg-white"
              >
                <div className="px-5 pb-3 pt-5 sm:px-6">
                  <span className="mb-2 block text-label uppercase text-muted">
                    {booking.step}
                  </span>
                  <h3 className="mb-0 text-xl font-medium leading-[1.3]">
                    {booking.title}
                  </h3>
                </div>
                <div
                  className="calendly-inline-widget h-[700px] min-w-0 sm:h-[760px] sm:min-w-[320px] xl:h-[820px]"
                  data-url={booking.url}
                  title={`Calendly Buchung für ${booking.step}`}
                />
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-end gap-2.5 px-5 pb-6 pt-3 text-label uppercase text-footer sm:px-10 lg:px-16">
        <span>All right reserved © 2026</span>
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
    <div className="grid grid-cols-[48px_1fr] items-start gap-4">
      <span
        className={[
          "flex h-[42px] w-[42px] items-center justify-center rounded-[14px] text-xs font-medium",
          dark ? "bg-white/15 text-white" : "bg-icon-container text-violet",
        ].join(" ")}
      >
        {index}
      </span>
      <div>
        <h2 className="mb-2 text-xl font-medium leading-[1.3]">{title}</h2>
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
    <div className="mb-6 max-w-[720px]">
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
    <article className="rounded-[10px] border border-line bg-white p-5 sm:p-6">
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
    <div className="rounded-xl bg-white/60 px-5 py-[18px]">
      <span className="mb-2 block text-label uppercase text-muted">{label}</span>
      <p className="mb-0 text-[15px] leading-[1.55] text-muted">{children}</p>
    </div>
  );
}
