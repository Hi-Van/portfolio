'use client';

import { type AnimatedPxlKitData, AnimatedPxlKitIcon } from '@pxlkit/core';
import { SpinningGear } from '@pxlkit/ui';
import { PulsingSun } from '@pxlkit/weather';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type AnimatedEntry = {
	icon: AnimatedPxlKitData;
};

const ANIMATED_ICONS = {
	stack: { icon: SpinningGear },
	themeSun: { icon: PulsingSun },
} satisfies Record<string, AnimatedEntry>;

export type AnimatedIconName = keyof typeof ANIMATED_ICONS;

type AnimatedIconProps = {
	name: AnimatedIconName;
	size?: number;
	className?: string;
};

export function AnimatedIcon({
	name,
	size = 24,
	className,
}: AnimatedIconProps) {
	const reduced = useReducedMotion();
	const entry = ANIMATED_ICONS[name];

	return (
		<span
			data-slot="icon"
			aria-hidden="true"
			data-reduced-motion={reduced}
			className={className}
		>
			<AnimatedPxlKitIcon
				icon={entry.icon}
				size={size}
				decorative
				trigger="loop"
				fps={4 / 1.1}
				playing={!reduced}
			/>
		</span>
	);
}
