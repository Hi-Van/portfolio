export type Theme = 'light' | 'dark';

const THEME_KEY = 'vs-theme';

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

export function writeStoredTheme(theme: Theme): void {
	try {
		window.localStorage.setItem(THEME_KEY, theme);
	} catch {
		// Storage can be blocked; the DOM attribute still carries the choice.
	}
}
