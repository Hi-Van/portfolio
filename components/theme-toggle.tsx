'use client';

import { Icon } from '@/components/icons';
import { AnimatedIcon } from '@/components/icons/animated-icon';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { Theme } from '@/lib/theme';

type ThemeControlProps = {
	theme: Theme | null;
	onToggle: () => void;
};

/**
 * The island's theme button. The prototype swaps a moon for a sun, so the
 * light state shows the static moon and the dark state the animated sun.
 */
export function ThemeToggle({ theme, onToggle }: ThemeControlProps) {
	const dark = theme === 'dark';

	return (
		<Button
			type="button"
			variant="icon"
			size="icon"
			className="icon-btn theme-toggle max-[861px]:hidden"
			aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
			aria-pressed={dark}
			data-theme-toggle=""
			onClick={onToggle}
		>
			{dark ? (
				<AnimatedIcon name="themeSun" size={24} />
			) : (
				<Icon name="themeMoon" size={24} />
			)}
		</Button>
	);
}

/**
 * The mobile row: the label is the visible name for the switch, and both the
 * label and the 50 by 44 switch drive the same theme state.
 */
export function ThemeSwitch({
	theme,
	onToggle,
	id = 'theme-switch',
}: ThemeControlProps & { id?: string }) {
	const dark = theme === 'dark';

	return (
		<div className="flex h-12 w-full items-center gap-2.5 border-t border-line px-3.5">
			<Label
				htmlFor={id}
				className="flex-1 text-nav font-medium text-ink"
			>
				Dark mode
			</Label>
			<Switch
				id={id}
				checked={dark}
				onCheckedChange={onToggle}
				aria-label="Dark mode"
				data-theme-toggle=""
				className="theme-toggle"
			/>
		</div>
	);
}
