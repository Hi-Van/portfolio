import { Clock } from '@/components/clock';
import { Icon } from '@/components/icons';
import { Shell } from '@/components/primitives/shell';
import { ProofBand } from '@/components/proof-band';
import { buttonVariants } from '@/components/ui/button';
import { HERO_DECK } from '@/content/hero';
import { SITE } from '@/content/site';
import { cn } from '@/lib/utils';

export function Hero() {
	return (
		<Shell
			as="section"
			className="hero pt-[116px] text-center max-[860px]:pt-[92px]"
			aria-labelledby="hero-title"
		>
			<p className="eyebrow inline-flex h-8 items-center gap-[10px] rounded-chip border border-line-strong bg-panel pr-[13px] pl-[10px] text-small font-medium tracking-[-0.01em] text-copy max-[520px]:h-auto max-[520px]:min-h-[34px] max-[520px]:flex-wrap max-[520px]:justify-center max-[520px]:gap-y-px max-[520px]:px-[13px] max-[520px]:py-[7px] max-[520px]:text-center max-[520px]:text-[clamp(11px,calc((100vw_-_48px)/28.5),13px)]">
				<Icon name="heroPin" size={24} />
				<span>{SITE.location}</span>
				<span
					className="eyebrow__sep h-3.5 w-px bg-line-strong"
					aria-hidden="true"
				/>
				<Clock />
			</p>

			<h1
				id="hero-title"
				className="mx-auto mt-[26px] max-w-[18ch] font-pixel text-display font-normal tracking-normal [font-variation-settings:normal]"
			>
				{SITE.nameSegments.map((segment) =>
					segment.mark ? (
						<span
							className="hero__mark text-data"
							key={segment.text}
						>
							{segment.text}
						</span>
					) : (
						segment.text
					)
				)}
			</h1>

			<p className="hero__deck mx-auto mt-6 max-w-[54ch] text-lead text-copy max-[860px]:max-w-[46ch]">
				{HERO_DECK.map((run) => {
					if (run.code) {
						return (
							<code
								className="rounded-secondary border border-line-strong bg-panel px-1.5 py-px font-pixel text-ink max-[860px]:text-[18px]"
								key={run.text}
							>
								{run.text}
							</code>
						);
					}

					if (run.strong) {
						return (
							<b className="font-medium text-ink" key={run.text}>
								{run.text}
							</b>
						);
					}

					return run.text;
				})}
			</p>

			<div className="hero__actions mt-[30px] flex flex-wrap items-center justify-center gap-x-[14px] gap-y-3 max-[520px]:gap-x-3 max-[520px]:gap-y-2.5">
				{/* biome-ignore lint/a11y/useSemanticElements: the prototype's labelled link strip is a group, not a form fieldset */}
				<div
					className="socials socials--fill inline-flex rounded-control"
					role="group"
					aria-label="Elsewhere"
				>
					{SITE.socials.map((social, index) => (
						<a
							className={cn(
								'inline-flex size-11 items-center justify-center border border-chip-line bg-ink text-paper transition-colors duration-[160ms] ease-out hover:relative hover:bg-[var(--social-hover)] focus-visible:relative focus-visible:outline-paper focus-visible:outline-offset-[-3px] first:rounded-l-control last:rounded-r-control',
								index > 0 && '-ml-px'
							)}
							href={social.href}
							key={social.label}
							rel={social.rel}
							aria-label={social.label}
						>
							<Icon name={social.icon} size={24} />
						</a>
					))}
				</div>

				<a
					className={buttonVariants({
						variant: 'line',
						className: 'btn btn--line',
					})}
					href={SITE.workLink}
				>
					See the work
					<Icon name="arrow" size={24} />
				</a>
			</div>

			<ProofBand />
		</Shell>
	);
}
