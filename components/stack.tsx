'use client';

import { AnimatedPxlKitIcon } from '@pxlkit/core';
import { SpinningGear } from '@pxlkit/ui';
import { Icon } from '@/components/icons';
import { SectionHead } from '@/components/primitives/section-head';
import { Shell } from '@/components/primitives/shell';
import { STACK_GROUPS, STACK_NOTE } from '@/content/stack';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function Stack() {
	const reduced = useReducedMotion();

	return (
		<Shell
			as="section"
			id="stack"
			aria-labelledby="stack-title"
			className="section scroll-mt-[112px] pt-section"
		>
			<SectionHead
				id="stack-title"
				icon={
					<AnimatedPxlKitIcon
						icon={SpinningGear}
						size={24}
						decorative
						playing={!reduced}
					/>
				}
				label="Stack"
				note={STACK_NOTE}
			/>
			<dl className="stack border-b border-line-strong">
				{STACK_GROUPS.map((group) => (
					<div
						key={group.label}
						className="stack__group grid grid-cols-[200px_1fr] gap-x-10 gap-y-1.5 border-t border-line py-5 first:border-t-0 max-[861px]:grid-cols-1 max-[861px]:gap-0 max-[861px]:py-4"
					>
						<dt className="inline-flex items-center gap-2 pt-[3px] text-small font-medium tracking-[-0.01em] text-subtle">
							<Icon name={group.icon} size={24} />
							{group.label}
						</dt>
						<dd className="m-0 max-w-[600px] text-[15px] leading-[1.7] text-ink">
							{group.items.join(', ')}
						</dd>
					</div>
				))}
			</dl>
		</Shell>
	);
}
