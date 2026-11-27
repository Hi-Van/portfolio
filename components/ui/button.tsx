import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'group/button inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-control border border-transparent bg-clip-padding text-nav font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,border-color,color,transform] duration-[160ms] ease-out select-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-data disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				fill: 'bg-ink text-paper hover:bg-[var(--btn-hover)] active:scale-[0.985]',
				line: 'border-line-strong bg-transparent text-ink hover:border-ink hover:bg-tint active:scale-[0.985]',
				ghost: 'text-copy hover:bg-tint hover:text-ink',
				icon: 'size-11 border-[color-mix(in_srgb,var(--ink)_22%,transparent)] bg-transparent p-0 text-ink hover:border-ink hover:bg-tint',
			},
			size: {
				control: 'px-5',
				icon: 'size-11 p-0',
				nav: 'h-11 px-3.5 max-[860px]:rounded-secondary',
			},
		},
		defaultVariants: {
			variant: 'fill',
			size: 'control',
		},
	}
);

function Button({
	className,
	variant = 'fill',
	size = 'control',
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
