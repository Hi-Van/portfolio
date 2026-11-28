'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { cn } from '@/lib/utils';

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = 'center',
	side = 'bottom',
	sideOffset = 4,
	anchor,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<
		PopoverPrimitive.Positioner.Props,
		'align' | 'side' | 'sideOffset' | 'anchor'
	>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				anchor={anchor}
				align={align}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(
						'z-50 flex w-[calc(100vw-24px)] flex-col gap-0 rounded-island border border-line-strong bg-paper p-1.5 text-nav text-ink shadow-[var(--menu-shadow)]',
						className
					)}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

export { Popover, PopoverContent, PopoverTrigger };
