import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

type ShellProps = ComponentPropsWithoutRef<'div'> & {
	as?: ElementType;
};

export function Shell({
	as: Component = 'div',
	className,
	...props
}: ShellProps) {
	return (
		<Component
			className={cn(
				'shell mx-auto w-full max-w-[calc(var(--frame)+var(--pad)*2)] px-pad',
				className
			)}
			{...props}
		/>
	);
}
