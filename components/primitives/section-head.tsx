import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeadProps = {
	id: string;
	icon: ReactNode;
	label: string;
	note?: string;
	className?: string;
};

export function SectionHead({
	id,
	icon,
	label,
	note,
	className,
}: SectionHeadProps) {
	return (
		<div
			className={cn(
				'section__head flex items-baseline justify-between gap-6 border-b border-line-strong pb-[18px] max-[520px]:flex-col max-[520px]:gap-1.5',
				className
			)}
		>
			<h2
				id={id}
				className="label inline-flex items-center gap-2 text-micro font-medium tracking-[0.1em] text-subtle uppercase"
			>
				{icon}
				{label}
			</h2>
			{note ? (
				<p className="section__note text-small text-subtle">{note}</p>
			) : null}
		</div>
	);
}
