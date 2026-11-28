# Icon simplification spec, 2026-11-27

## Purpose

Remove the two icon registries and the animated wrapper. Import Pxlkit and Pixelarticons
icons at their call sites, and keep one base SVG shell for custom art. Preserve the
existing visuals, the decorative accessibility contract, and reduced-motion behaviour.

## Current state

- `components/icons/index.tsx` holds a 24-entry name registry and an `Icon` component that
  branches between Pixelarticons SVG components and Pxlkit data URIs.
- `components/icons/animated-icon.tsx` holds a 2-entry animated registry and a wrapper that
  pauses Pxlkit's JS frame loop with `useReducedMotion`.
- Nine components import `Icon` or `AnimatedIcon`. `content/work.ts` imports `IconName`.
- Tests use `[data-slot="icon"]`, the animated `span`, and `data-reduced-motion` as hooks.

## Decisions

1. **Delete `components/icons/animated-icon.tsx`.** Keep `hooks/use-reduced-motion.ts`.
2. **The base `Icon` becomes a bare SVG shell.** It sets `shapeRendering="crispEdges"`,
   `aria-hidden="true"`, `focusable="false"`, and `data-slot="icon"`, then spreads
   `SVGProps<SVGSVGElement>`. Custom art supplies its own `width`, `height`, `viewBox`,
   `className`, and children or `dangerouslySetInnerHTML`. `NavMark` and `FooterScene`
   render through it.
3. **Static Pxlkit icons use `PxlKitIcon`** from `@pxlkit/core` with `icon`, `size`,
   `decorative`, and `className`. Static Pixelarticons use the named component from
   `pixelarticons/react` with `width`, `height`, `shapeRendering="crispEdges"`,
   `aria-hidden="true"`, `focusable="false"`, `data-slot="icon"`, and `className`.
4. **Animated icons use `AnimatedPxlKitIcon`** from `@pxlkit/core`, with
   `playing={!useReducedMotion()}` and `decorative`. `ThemeToggle` and `ThemeSwitch` already
   live in a client module. `components/stack.tsx` becomes a client module so its section
   icon can call the hook; its markup is still server-rendered on first paint.
5. **`content/work.ts` stores the icon component.** Replace `icon: IconName` with
   `icon: ComponentType<SVGProps<SVGSVGElement>>` and put the Pixelarticons component in
   each row. `work-row.tsx` renders it directly.
6. **Tests stop depending on the wrapper.** Hidden icons assert `svg[aria-hidden="true"]`
   and `img[alt=""]`. The animated/static distinction asserts the Pxlkit animated wrapper
   (`div:has(> img)`) instead of `span[data-slot="icon"]`. The reduced-motion test asserts
   the `src` does not change while reduced motion is on, instead of reading
   `data-reduced-motion`.
7. **`check-artifacts.mjs` keeps the no-sprite and no-hand-inlined-art rules.** Drop the
   removed animated module. Replace the two-file module allowlist with a scan of
   `components/` and `content/` for disallowed icon packages (Lucide, React Icons,
   Heroicons, Tabler, Phosphor, Radix Icons).
8. **Docs follow the code.** Update the `AGENTS.md` tree row, the icon task row, and the
   Lucide trap; update the `PORTING.md` icon and reduced-motion notes; update the `README.md`
   tree row.

## Non-goals

- Changing icon choices, sizes, colours, or layout.
- Removing animation. The gear and sun still animate.
- Editing `DESIGN.md` values or `MANIFEST.txt`.
- Touching the generated nav-mark or footer-scene markup.

## Verification

`npm run lint`, `npm run typecheck`, `npm run check`, and `npm run test:browsers`. The
rendered page must show the same icons in the same places, the animated sun and gear must
still animate, and they must hold their first frame under reduced motion.
