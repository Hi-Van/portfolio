import { cn } from 'cn';

export function SkipLink({ className }: { className?: string }) {
	return (
		<a
			href="#main"
			className={cn(
				'skip fixed top-[-64px] left-4 z-[70] inline-flex min-h-11 items-center rounded-control bg-ink px-[18px] py-2.5 text-small font-medium text-paper transition-[top] duration-[160ms] ease-out focus-visible:top-4',
				className
			)}
		>
			Skip to content
		</a>
	);
}
