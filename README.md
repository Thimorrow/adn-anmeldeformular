# ADN Anmeldeformular

Buchungsseite für das KI-Transformations-Training von **ADN** mit **yesterday academy**.
Teilnehmer buchen ihre zwei Trainingstage (Tag 1 + Tag 2) direkt über eingebettete
[Cal.eu](https://cal.eu)-Kalender.

**Live:** https://anmeldeformular-adn.vercel.app

## Stack

- **Next.js 16** (App Router) + React 19
- **Tailwind CSS 4**
- **GSAP** für Scroll-/Hero-Animationen
- Buchungs-Embeds via **Cal.eu** (EU-Region von cal.com), Calendly als Alt-Variante
- Deployment: **Vercel** (Auto-Deploy bei Push auf `main`)

## Routen

| Pfad | Variante | Provider | Zweck |
|------|----------|----------|-------|
| `/` | — | — | Redirect → `/vor-ort` |
| `/vor-ort` | Vor Ort (Bochum) | Cal.eu | Aktive Vor-Ort-Buchung |
| `/digital` | Remote | Cal.eu | Aktive Remote-Buchung |
| `/calendly/vor-ort` | Vor Ort | Calendly | Fallback-/Alt-Variante |
| `/calendly/digital` | Remote | Calendly | Fallback-/Alt-Variante |

Alle Seiten rendern dieselbe Komponente `BookingPage` mit unterschiedlichen Props
(`variant`, `provider`).

## Architektur

```
src/app/<route>/page.tsx   →  dünner Wrapper, setzt Metadata + <BookingPage …/>
src/components/
  BookingPage.tsx          →  ZENTRALE Inhalts-/Daten-Quelle (CONTENT-Objekt) + Layout
  CalBookingFlow.tsx       →  rendert die Buchungs-Karten (Cal-Variante)
  CalBooking.tsx           →  Monats-Umschalter über einem Cal-Embed
  CalWidget.tsx            →  eigentlicher Cal.eu-Embed (Bootstrap, Status, Fallback)
  CalendlyWidget.tsx       →  Calendly-Embed (für /calendly/*-Routen)
  PageAnimations.tsx       →  GSAP Scroll-Reveal + Hero-Animationen
```

Die **einzige Stelle mit Inhalten und Buchungslinks** ist das `CONTENT`-Objekt in
`src/components/BookingPage.tsx`. Texte, Karten und Termine werden dort gepflegt.

## Buchungslinks ändern (häufigster Pflege-Task)

Buchungslinks und verfügbare Monate stehen im `CONTENT`-Objekt in
[`src/components/BookingPage.tsx`](src/components/BookingPage.tsx), je Variante unter `bookings[]`.

Ein Eintrag pro Trainingstag:

```ts
{
  step: "1",
  day: "Tag 1 · Grundlagen-Training",
  title: "Termin wählen",
  url: "https://calendly.com/…",            // nur für die /calendly/*-Variante genutzt
  calLink: "yesterdayacademy/adn-digital-1", // Cal.eu: username/event-slug OHNE Domain
  months: ["2026-07", "2026-08"],            // Monate mit freien Slots (JJJJ-MM), aufsteigend; [0] = Startmonat
},
```

**Wichtig zum `calLink`:**

- Nur `username/event-slug` eintragen — **ohne** `https://cal.eu/`.
  Beispiel: aus `https://cal.eu/yesterdayacademy/adn-digital-1` wird
  `calLink: "yesterdayacademy/adn-digital-1"`.
- Die Domain (`cal.eu`) ist fest in `CalWidget.tsx` als `CAL_ORIGIN` gesetzt.
- `months` steuert die Monats-Buttons über dem Kalender. Stimmen die Monate nicht mit
  den real freigeschalteten Cal-Slots überein, landet der Nutzer auf einem leeren Monat.
- Stimmt der Slug nicht exakt, zeigt das Widget den Fallback
  („Die Buchung lädt gerade nicht").

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000  → /vor-ort
npm run build    # Produktions-Build (Verifikation vor Deploy)
npm run start    # Build lokal servieren
```

## Deployment

Vercel deployt automatisch bei Push auf `main`:

```bash
git add -A && git commit -m "…"
git push origin main
```

Anschließend auf der Live-Seite prüfen, ob beide Embeds laden.

## Kontakt für Teilnehmer

Fragen / Umbuchungen laufen über **Vanessa Fröhlich** (im Footer & Info-Bereich hinterlegt).
