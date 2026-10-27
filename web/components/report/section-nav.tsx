"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "abstract", label: "Abstract" },
  { id: "problem", label: "1 Problem" },
  { id: "systems", label: "2 Systems" },
  { id: "scale", label: "3 Scale" },
  { id: "method", label: "4 Method" },
  { id: "contact", label: "Contact" },
];

/** In-page navigation that states which section is in view, at every width. */
export function SectionNav() {
  const [active, setActive] = useState<string>("abstract");

  useEffect(() => {
    const elements = ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Report sections"
      className="sticky top-16 z-20 -mx-gutter border-y border-line bg-paper px-gutter"
    >
      <ul className="flex flex-wrap items-center gap-x-4">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="inline-flex min-h-11 items-center font-ui text-label text-muted transition-colors duration-200 hover:text-ink aria-[current=location]:text-ink"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
