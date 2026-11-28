'use client';

import { Close, Menu } from 'pixelarticons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PIXEL_ICON_PROPS } from '@/components/icons';
import { NavMark } from '@/components/icons/nav-mark';
import { ThemeSwitch, ThemeToggle } from '@/components/theme-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from '@/components/use-theme';
import { SITE } from '@/content/site';
import { cn } from '@/lib/utils';

// The prototype captures its scroll baseline when the script runs, before the
// reader has moved the page. This module is evaluated before `load`, so it is
// the same baseline in the port; taking it in the effect would be too late if
// hydration finished after the first scroll.
const initialScrollY = typeof window === 'undefined' ? 0 : window.scrollY;

function BrandName() {
	return (
		<span className="brand__name font-pixel text-[18px] leading-none font-normal tracking-[0] whitespace-nowrap">
			{SITE.nameSegments.map((segment, index) =>
				segment.mark ? (
					<span
						key={`${segment.text}-${index}`}
						className="brand__hl text-data"
					>
						{segment.text}
					</span>
				) : (
					<span key={`${segment.text}-${index}`}>{segment.text}</span>
				)
			)}
		</span>
	);
}

export function SiteHeader() {
	const { theme, toggle } = useTheme();
	const [open, setOpen] = useState(false);

	const headerRef = useRef<HTMLElement>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	const openRef = useRef(false);
	const lastYRef = useRef(0);
	const pinnedUntilRef = useRef(0);

	const setMenuOpen = useCallback((next: boolean) => {
		openRef.current = next;
		setOpen(next);
	}, []);

	const onNavLinkClick = useCallback(() => {
		// A nav click scrolls the page; keep the island up long enough that it
		// does not disappear under the pointer that just used it.
		pinnedUntilRef.current = Date.now() + 1000;
		setMenuOpen(false);
	}, [setMenuOpen]);

	useEffect(() => {
		const header = headerRef.current;
		if (!header) return;

		lastYRef.current = initialScrollY;

		const onScroll = () => {
			const y = window.scrollY;

			// The shadow follows the page, not the pin: a nav click scrolls the
			// page too, and the island should read as lifted the moment it does.
			if (y > 8) header.setAttribute('data-scrolled', '');
			else header.removeAttribute('data-scrolled');

			if (Date.now() < pinnedUntilRef.current) {
				header.removeAttribute('data-hidden');
				lastYRef.current = y;
				return;
			}

			// Never hide while keyboard focus is inside: the reader is using the
			// island. A pointer click also focuses its target, so gate on
			// :focus-visible; otherwise a mouse nav click would hold the island
			// up on every later scroll until focus leaves the header.
			const active = document.activeElement;
			if (
				active instanceof HTMLElement &&
				header.contains(active) &&
				active.matches(':focus-visible')
			) {
				header.removeAttribute('data-hidden');
				lastYRef.current = y;
				return;
			}

			// Never hide while the mobile menu is open.
			if (openRef.current) {
				header.removeAttribute('data-hidden');
				lastYRef.current = y;
				return;
			}

			if (y > 180 && y > lastYRef.current + 6) {
				setMenuOpen(false);
				header.setAttribute('data-hidden', '');
			} else if (y < lastYRef.current - 6 || y < 180) {
				header.removeAttribute('data-hidden');
			}

			lastYRef.current = y;
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		const onFocusIn = (event: FocusEvent) => {
			if (event.target instanceof Node && header.contains(event.target)) {
				header.removeAttribute('data-hidden');
			}
		};

		document.addEventListener('focusin', onFocusIn);

		return () => {
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('focusin', onFocusIn);
		};
	}, [setMenuOpen]);

	// The panel is phone-only and the trigger disappears at the desktop layout.
	// Close the menu when the viewport crosses that line, so an open panel is
	// never left mounted without a visible control to dismiss it.
	useEffect(() => {
		const query = window.matchMedia('(min-width: 861px)');
		const onChange = (event: MediaQueryListEvent) => {
			if (event.matches) setMenuOpen(false);
		};

		query.addEventListener('change', onChange);

		return () => query.removeEventListener('change', onChange);
	}, [setMenuOpen]);

	return (
		<header
			ref={headerRef}
			id="site-header"
			className="top group/top pointer-events-none fixed top-4 right-0 left-0 z-[60] flex justify-center px-4 [transition:transform_280ms_cubic-bezier(0.23,1,0.32,1),opacity_200ms_ease-out] data-[hidden]:[transform:translateY(-120%)] data-[hidden]:opacity-0 max-[861px]:top-2.5 max-[861px]:px-3 print:hidden"
		>
			<div
				ref={barRef}
				className="bar pointer-events-auto relative flex h-[60px] min-w-[640px] max-w-[calc(100vw-32px)] items-center justify-between gap-0 rounded-island border border-[color-mix(in_srgb,var(--ink)_14%,transparent)] bg-[var(--island-fill)] px-[7px] pl-[22px] shadow-[var(--island-shadow)] backdrop-blur-[8px] transition-[box-shadow,background-color] duration-200 ease-out group-data-[scrolled]/top:shadow-[var(--island-shadow-scrolled)] max-[861px]:h-14 max-[861px]:w-full max-[861px]:min-w-0 max-[861px]:px-3 max-[861px]:pl-4 dark:border-[color-mix(in_srgb,var(--ink)_18%,transparent)]"
			>
				<a
					href="#top"
					className="brand inline-flex h-11 items-center gap-3 text-[15px] font-medium tracking-[-0.01em] text-ink max-[381px]:gap-2"
				>
					<span className="inline-flex size-6 shrink-0 items-center justify-center [&>svg]:size-6">
						<NavMark />
					</span>
					<BrandName />
				</a>

				<nav
					aria-label="Site"
					className="nav hidden min-[861px]:ml-auto min-[861px]:flex min-[861px]:items-center min-[861px]:justify-end min-[861px]:gap-1 min-[861px]:pr-6"
				>
					{SITE.nav.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={onNavLinkClick}
							className={cn(
								buttonVariants({
									variant: 'ghost',
									size: 'nav',
								}),
								'text-small'
							)}
						>
							{item.label}
						</a>
					))}
				</nav>

				<div className="top__actions flex items-center gap-2">
					<ThemeToggle theme={theme} onToggle={toggle} />

					<Popover open={open} onOpenChange={setMenuOpen}>
						<PopoverTrigger
							render={
								<Button
									ref={menuButtonRef}
									type="button"
									variant="ghost"
									size="icon"
									className="menu-btn min-[861px]:hidden text-ink"
									aria-label={
										open ? 'Close menu' : 'Open menu'
									}
									aria-controls={
										open ? 'site-nav' : undefined
									}
								>
									{open ? (
										<Close {...PIXEL_ICON_PROPS} />
									) : (
										<Menu {...PIXEL_ICON_PROPS} />
									)}
								</Button>
							}
						/>
						<PopoverContent
							id="site-nav"
							anchor={barRef}
							side="bottom"
							align="center"
							sideOffset={8}
							role="navigation"
							aria-label="Site"
							render={<nav />}
							className="nav"
						>
							{SITE.nav.map((item) => (
								<a
									key={item.href}
									href={item.href}
									onClick={onNavLinkClick}
									className="flex h-11 items-center rounded-secondary px-3.5 text-nav font-medium text-copy transition-colors duration-150 ease-out hover:bg-tint hover:text-ink"
								>
									{item.label}
								</a>
							))}
							<ThemeSwitch theme={theme} onToggle={toggle} />
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	);
}
