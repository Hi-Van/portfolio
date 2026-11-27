'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cn } from '@/lib/utils';

/**
 * The prototype switch: the target is the full 50 by 44 button, the visual
 * track is drawn with `before:` at 34 by 20, and a 14px round thumb rides on
 * top. Base UI keeps role="switch" and aria-checked on the button.
 */
function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
	return (
		<SwitchPrimitive.Root
			nativeButton
			render={<button type="button" />}
			data-slot="switch"
			className={cn(
				'group/switch relative inline-flex h-[44px] w-[50px] shrink-0 items-center justify-center rounded-control border-0 bg-transparent p-0 text-ink transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-50',
				"before:absolute before:top-1/2 before:left-1/2 before:h-5 before:w-[34px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:rounded-[6px] before:border before:border-line-strong before:bg-transparent before:transition-[background-color,border-color] before:duration-[160ms] before:ease-out",
				'data-checked:before:border-data data-checked:before:bg-[color-mix(in_srgb,var(--data)_16%,transparent)]',
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className="pointer-events-none absolute top-[15px] left-[10px] block size-[14px] rounded-full bg-subtle transition-[transform,background-color] duration-[160ms] ease-out data-checked:[transform:translateX(14px)] data-checked:bg-data"
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
