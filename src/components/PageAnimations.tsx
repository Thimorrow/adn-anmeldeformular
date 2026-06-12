"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PageAnimations() {
  // Kein scope-Selektor: Strings werden schon beim SSR aufgelöst (document fehlt dort).
  // Die data-Attribute existieren nur einmal pro Seite, daher sind globale Selektoren sicher.
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Startzustände per Inline-Style setzen, BEVOR die CSS-Sperre
      // (html.js-anim, siehe globals.css) fällt — sonst blitzen die Inhalte
      // zwischen erstem Paint und Hydration kurz auf.
      gsap.set(
        "[data-hero-item], [data-hero-panel], [data-hero-step], [data-reveal]",
        { autoAlpha: 0 }
      );
      document.documentElement.classList.remove("js-anim");

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.55 },
      });
      tl.fromTo(
        "[data-hero-item]",
        { y: 14 },
        { y: 0, autoAlpha: 1, stagger: 0.06, clearProps: "all" }
      )
        .fromTo(
          "[data-hero-panel]",
          { y: 18 },
          { y: 0, autoAlpha: 1, clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-step]",
          { y: 10 },
          { y: 0, autoAlpha: 1, stagger: 0.07, clearProps: "all" },
          "-=0.35"
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 16 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      document.documentElement.classList.remove("js-anim");
    });
  });

  return null;
}
