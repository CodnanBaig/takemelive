"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    const ease = 0.18;

    let rafId = 0;
    const animate = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("pointermove", move, { passive: true });

    const hoverables = "a, button, .hover-reveal, [data-cursor=hover]";
    const over = (e: Event) => {
      const t = e.target as Element | null;
      if (t?.closest(hoverables)) cursor.classList.add("is-hover");
    };
    const out = (e: Event) => {
      const t = e.target as Element | null;
      if (t?.closest(hoverables)) cursor.classList.remove("is-hover");
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    const down = () => (cursor.style.opacity = "0.85");
    const up = () => (cursor.style.opacity = "1");
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);

    // Optional magnetic effect on elements with data-magnetic
    const strength = 0.25;
    const magnets = Array.from(document.querySelectorAll("[data-magnetic]")) as HTMLElement[];
    const rects = new WeakMap<HTMLElement, DOMRect>();

    const updateRect = (el: HTMLElement) => rects.set(el, el.getBoundingClientRect());
    const onResizeScroll = () => magnets.forEach(updateRect);
    magnets.forEach(updateRect);
    window.addEventListener("resize", onResizeScroll);
    window.addEventListener("scroll", onResizeScroll, { passive: true });

    const onMagMove = (el: HTMLElement) => (e: MouseEvent) => {
      const rect = rects.get(el);
      if (!rect) return;
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };
    const onMagLeave = (el: HTMLElement) => () => {
      el.style.transform = "translate(0,0)";
    };
    magnets.forEach((el) => {
      el.addEventListener("mousemove", onMagMove(el));
      el.addEventListener("mouseleave", onMagLeave(el));
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      window.removeEventListener("resize", onResizeScroll);
      window.removeEventListener("scroll", onResizeScroll);
      magnets.forEach((el) => {
        el.removeEventListener("mousemove", onMagMove(el));
        el.removeEventListener("mouseleave", onMagLeave(el));
      });
    };
  }, []);

  return <div id="cursor" ref={ref} />;
}



