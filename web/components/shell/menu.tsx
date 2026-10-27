"use client";

import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fromKey, isCurrent, site } from "../../content/site";
import { ContactPill } from "./contact-pill";

/**
 * The narrow-viewport navigation is a disclosure, not a menu: a button with an
 * expanded state and the link list beneath it. A menu primitive would impose
 * application-menu semantics on site navigation. See design.md D16.
 */
export function Menu() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const close = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", close);
    return () => wide.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      buttonRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-panel"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-action border border-line-strong px-3 font-ui text-label text-ink"
      >
        {open ? "Close" : "Menu"}
      </button>

      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <AnimatePresence initial={false}>
            {open ? (
              <m.div
                key="panel"
                id="menu-panel"
                ref={panelRef}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute inset-x-0 top-full border-b border-line bg-paper"
              >
                <nav
                  aria-label="Primary"
                  className="mx-auto flex max-w-frame flex-col gap-1 px-gutter py-4"
                >
                  {site.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={
                        isCurrent(pathname, item.href) ? "page" : undefined
                      }
                      className="inline-flex min-h-11 items-center font-ui text-body-small text-ink"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href={`/ask?from=${fromKey(pathname)}`}
                    aria-current={pathname.startsWith("/ask") ? "page" : undefined}
                    className="inline-flex min-h-11 items-center font-ui text-body-small text-ink"
                  >
                    Ask
                  </Link>
                  <div className="pt-2">
                    <ContactPill compact />
                  </div>
                </nav>
              </m.div>
            ) : null}
          </AnimatePresence>
        </MotionConfig>
      </LazyMotion>
    </div>
  );
}
