export type Theme = 'light' | 'dark';

export const THEME_KEY = 'vs-theme';

/**
 * The explicit choice wins. Without one the OS preference decides.
 */
export function resolveTheme(
	explicit: string | null | undefined,
	prefersDark: boolean
): Theme {
	if (explicit === 'dark' || explicit === 'light') return explicit;
	return prefersDark ? 'dark' : 'light';
}

export function readStoredTheme(): Theme | null {
	try {
		const value = window.localStorage.getItem(THEME_KEY);
		return value === 'dark' || value === 'light' ? value : null;
	} catch {
		return null;
	}
}

export function writeStoredTheme(theme: Theme): void {
	try {
		window.localStorage.setItem(THEME_KEY, theme);
	} catch {
		// Storage can be blocked; the DOM attribute still carries the choice.
	}
}
