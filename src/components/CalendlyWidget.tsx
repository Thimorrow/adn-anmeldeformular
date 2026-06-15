"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js";
// Falls das Calendly-Script blockiert wird oder hängt, nach dieser Zeit aufgeben
// und den Fallback zeigen, statt den Nutzer auf eine leere Box starren zu lassen.
const LOAD_TIMEOUT_MS = 10000;

// Geteilter Lade-Status: Beide Widgets teilen sich dasselbe Calendly-Script
// (Next dedupliziert die src), daher feuert onError nur für eine Instanz.
// Über diesen Store kippen bei einem Ausfall alle Widgets gemeinsam auf "error".
type Status = "loading" | "ready" | "error";
let scriptStatus: Status = "loading";
let forced = false; // TEMP/DEMO: rastet einen erzwungenen Status ein (?calendlyfail=1)
const listeners = new Set<() => void>();

function setScriptStatus(next: Status, force = false) {
  if (force) {
    forced = true;
    scriptStatus = next;
    listeners.forEach((notify) => notify());
    return;
  }
  if (forced) return; // erzwungener Status (Demo) gewinnt gegen onReady/Timeout
  // "ready" gewinnt: ein geladenes Script bleibt geladen, auch wenn ein später
  // ablaufender Timeout noch "error" melden möchte.
  if (scriptStatus === next || scriptStatus === "ready") return;
  scriptStatus = next;
  listeners.forEach((notify) => notify());
}

function useScriptStatus() {
  return useSyncExternalStore(
    (notify) => {
      listeners.add(notify);
      return () => listeners.delete(notify);
    },
    () => scriptStatus,
    () => "loading" as Status
  );
}

export default function CalendlyWidget({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const status = useScriptStatus();

  const init = useCallback(() => {
    if (!window.Calendly) return;
    const container = containerRef.current;
    if (container && !container.querySelector("iframe")) {
      window.Calendly.initInlineWidget({ url, parentElement: container });
    }
  }, [url]);

  // Script geladen -> jedes Widget initialisiert sein EIGENES Embed.
  // Nicht an onReady hängen: next/script feuert onReady nur für eine Instanz der
  // deduplizierten src, sonst bliebe das zweite Widget leer.
  useEffect(() => {
    if (status === "ready") init();
  }, [status, init]);

  useEffect(() => {
    if (status !== "loading") return;
    const id = window.setTimeout(() => setScriptStatus("error"), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [status]);

  // TEMP/DEMO: ?calendlyfail=1 in der URL erzwingt den Fehler-Screen. Wieder entfernen.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("calendlyfail")) {
      setScriptStatus("error", true);
    }
  }, []);

  return (
    <div className="relative h-[700px] min-w-0 sm:h-[760px] sm:min-w-[320px] xl:h-[820px]">
      <div
        ref={containerRef}
        className="calendly-inline-widget h-full w-full"
        title={title}
        data-auto-load="false"
      />
      {status === "error" && (
        <div
          role="alert"
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-[10px] bg-white px-6 text-center"
        >
          <ErrorIllustration />
          <div className="space-y-2">
            <p className="text-[19px] font-medium tracking-[-0.2px] text-ink">
              Die Buchung lädt gerade nicht.
            </p>
            <p className="mx-auto max-w-[340px] text-[14px] leading-[1.6] text-muted">
              Ausgerechnet beim KI-Training hakt die Technik. Die Ironie haben
              wir notiert. Im Training selbst läuft&rsquo;s dann runder,
              versprochen.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-button-primary px-6 text-[13px] font-medium text-white shadow-button transition-colors duration-200 ease-out hover:bg-button-primary-hover active:scale-[0.98] motion-reduce:transition-none"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:rotate-180 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <path d="M21 3v6h-6" />
            </svg>
            Seite neu laden
          </button>
          <p className="text-[13px] leading-[1.55] text-muted">
            Klappt es weiterhin nicht, melde dich bei{" "}
            <span className="font-medium text-ink-soft">Vanessa Fröhlich</span>.
          </p>
        </div>
      )}
      <Script
        src={CALENDLY_SRC}
        strategy="afterInteractive"
        onReady={() => setScriptStatus("ready")}
        onError={() => setScriptStatus("error")}
      />
    </div>
  );
}

// Offline-Roboter in Marken-Teal: flache „Augen" (abgeschaltet), Orange-Antenne
// und gestrichelte Signal-Bögen, die pulsierend „nach Verbindung suchen".
function ErrorIllustration() {
  return (
    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-icon-container ring-1 ring-teal/12">
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <g
          className="animate-pulse stroke-muted motion-reduce:animate-none"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2 3"
        >
          <path d="M31 9.5a8 8 0 0 1 5.8 5.8" />
          <path d="M32 5a13 13 0 0 1 9.4 9.4" />
        </g>
        <line
          x1="24"
          y1="8"
          x2="24"
          y2="13"
          className="stroke-teal"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="6" r="2.3" className="fill-orange" />
        <rect
          x="11"
          y="13"
          width="26"
          height="22"
          rx="7"
          className="fill-white stroke-teal"
          strokeWidth="2"
        />
        <g className="stroke-teal" strokeWidth="1.8" strokeLinecap="round">
          <line x1="9" y1="22" x2="11" y2="22" />
          <line x1="37" y1="22" x2="39" y2="22" />
        </g>
        <g className="stroke-teal" strokeWidth="2.4" strokeLinecap="round">
          <line x1="17" y1="23" x2="21.5" y2="23" />
          <line x1="26.5" y1="23" x2="31" y2="23" />
        </g>
        <line
          x1="20"
          y1="29.5"
          x2="28"
          y2="29.5"
          className="stroke-muted"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
