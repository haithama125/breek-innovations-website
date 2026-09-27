"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (reduce) {
      nodes.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    nodes.forEach((el) => {
      const delay = Number(el.getAttribute("data-reveal") || "0");
      el.style.transitionDelay = `${delay}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    nodes.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
