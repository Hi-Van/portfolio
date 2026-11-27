'use client';

import { useCallback, useEffect, useState } from 'react';
import { resolveTheme, type Theme, writeStoredTheme } from '@/lib/theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Reads the theme the inline layout script already applied. Nothing is resolved
 * on the server, so the first client render matches the markup and the effect
 * then syncs the state with the DOM.
 */
export function useTheme() {
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		const root = document.documentElement;
		const media = window.matchMedia(DARK_QUERY);

		setTheme(resolveTheme(root.getAttribute('data-theme'), media.matches));

		// Only follow the OS while no explicit attribute exists. The layout
		// script writes the attribute from storage before paint.
		const onChange = () => {
			if (!root.hasAttribute('data-theme')) {
				setTheme(media.matches ? 'dark' : 'light');
			}
		};

		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, []);

	const toggle = useCallback(() => {
		const root = document.documentElement;
		const current = resolveTheme(
			root.getAttribute('data-theme'),
			window.matchMedia(DARK_QUERY).matches
		);
		const next: Theme = current === 'dark' ? 'light' : 'dark';

		root.setAttribute('data-theme', next);
		writeStoredTheme(next);
		setTheme(next);
	}, []);

	return { theme, toggle };
}
