"use client";

import { useEffect, useRef, useState } from "react";

type CalApi = ((...args: unknown[]) => void) & {
  ns?: Record<string, (...args: unknown[]) => void>;
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

// EU-Region von cal.com. Script und Origin müssen zusammenpassen.
const CAL_ORIGIN = "https://cal.eu";
const CAL_SRC = "https://cal.eu/embed/embed.js";
// Marken-Violet (--academy-violet), damit cal.com farblich zur Seite passt.
const BRAND_VIOLET = "#6652ff";
// Falls das cal.com-Script blockiert wird oder hängt, nach dieser Zeit aufgeben
// und den Fallback zeigen, statt den Nutzer auf eine leere Box starren zu lassen.
const LOAD_TIMEOUT_MS = 10000;

/* eslint-disable */
// Offizieller cal.com Embed-Bootstrap (verbatim aus dem Inline-Snippet).
// Legt window.Cal als Queue an UND lädt embed.js beim ersten Aufruf nach.
// Ohne diesen Stub wirft embed.js intern "Cal is not defined".
function ensureCalBootstrap() {
  if ((window as any).Cal) return;
  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, CAL_SRC, "init");
}
/* eslint-enable */

type Status = "loading" | "ready" | "error";

// Verhindert doppelte Inline-Initialisierung pro Namespace (z. B. React
// StrictMode im Dev ruft Effekte zweimal auf).
const initialized = new Set<string>();

export default function CalWidget({
  calLink,
  title,
}: {
  calLink: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  // Eigener Namespace pro Embed, sonst überschreibt das zweite Widget das erste.
  const namespace = calLink.replace(/[^a-zA-Z0-9]/g, "-");

  useEffect(() => {
    // TEMP/DEMO: ?calfail=1 in der URL erzwingt den Fehler-Screen. Wieder entfernen.
    if (new URLSearchParams(window.location.search).has("calfail")) {
      setStatus("error");
      return;
    }

    ensureCalBootstrap();
    const Cal = window.Cal;
    const container = containerRef.current;
    if (!Cal || !container) {
      setStatus("error");
      return;
    }

    Cal("init", namespace, { origin: CAL_ORIGIN });
    const ns = Cal.ns?.[namespace];
    if (!ns) {
      setStatus("error");
      return;
    }

    if (!initialized.has(namespace)) {
      initialized.add(namespace);
      ns("inline", {
        elementOrSelector: container,
        calLink,
        config: { layout: "month_view" },
      });
      ns("ui", {
        theme: "light", // Seite ist weiß; cal.com soll nicht dem System folgen
        layout: "month_view",
        hideEventTypeDetails: false, // bei Vor-Ort zeigt das Adresse + Dauer
        cssVarsPerTheme: {
          light: { "cal-brand": BRAND_VIOLET },
          dark: { "cal-brand": BRAND_VIOLET },
        },
      });
      ns("on", { action: "linkReady", callback: () => setStatus("ready") });
      // Lädt das gewählte Event-Iframe nicht, denselben Fallback zeigen.
      ns("on", { action: "linkFailed", callback: () => setStatus("error") });
    } else {
      // Embed existiert bereits (Iframe ist schon initialisiert) -> nicht erneut laden.
      setStatus("ready");
    }

    const timeout = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [calLink, namespace]);

  return (
    <div className="relative h-[700px] min-w-0 sm:h-[760px] sm:min-w-[320px] xl:h-[820px]">
      <div
        ref={containerRef}
        className="h-full w-full overflow-auto"
        title={title}
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
