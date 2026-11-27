import { Icon } from '@/components/icons';
import { FooterScene } from '@/components/icons/footer-scene';
import { Shell } from '@/components/primitives/shell';
import { FOOTER, type FooterRun } from '@/content/footer';

const INLINE_ICON =
	'ico ico--inline my-0 mr-[2px] ml-px inline-block size-4 align-[-3px]';

const CREDIT_LINK =
	'underline decoration-line-strong underline-offset-2 hover:text-ink hover:decoration-data';

function FooterRunNode({ run }: { run: FooterRun }) {
	if ('text' in run) {
		return run.lead ? (
			<span className="foot__lead italic">{run.text}</span>
		) : (
			run.text
		);
	}

	if ('icon' in run) {
		return <Icon name={run.icon} size={16} className={INLINE_ICON} />;
	}

	return (
		<a href={run.link.href} rel={run.link.rel} className={CREDIT_LINK}>
			{run.link.label}
		</a>
	);
}

function FooterRuns({ runs }: { runs: FooterRun[] }) {
	return (
		<>
			{runs.map((run) => (
				<FooterRunNode key={run.key} run={run} />
			))}
		</>
	);
}

export function Footer() {
	return (
		<Shell
			as="footer"
			className="foot relative mt-[72px] flex flex-wrap items-center justify-between gap-x-6 gap-y-[10px] overflow-hidden pt-6 pb-[160px] text-small text-subtle before:absolute before:top-0 before:right-pad before:left-pad before:h-px before:bg-line-strong before:content-['']"
		>
			<div className="foot__main foot__inner relative z-10 flex w-full flex-wrap items-baseline justify-between gap-x-10 gap-y-[14px] max-[521px]:gap-y-0">
				<p className="foot__who m-0 leading-[1.55] text-subtle">
					<span className="foot__id foot__name whitespace-nowrap">
						<b className="font-semibold text-copy">
							{FOOTER.identity.name}
						</b>
						, {FOOTER.identity.role}. {FOOTER.identity.year}.
					</span>
					<br />
					<a
						className="foot__mail inline-flex min-h-11 items-center text-copy underline decoration-line-strong underline-offset-2 hover:text-ink hover:decoration-data"
						href={FOOTER.mail.href}
					>
						{FOOTER.mail.label}
					</a>
				</p>
				<nav
					aria-label="Footer"
					className="flex flex-wrap gap-x-[18px]"
				>
					{FOOTER.nav.map((item) => (
						<a
							key={item.href}
							className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-ink"
							href={item.href}
						>
							{item.label}
						</a>
					))}
				</nav>
			</div>
			<div className="foot__meta relative z-10 order-3 mt-[22px] flex basis-full flex-wrap items-baseline justify-between gap-x-8 gap-y-1 text-[12px] text-subtle max-[521px]:mt-[14px]">
				<span className="foot__made block">
					<FooterRuns runs={FOOTER.made} />
				</span>
				<span className="foot__credit flex flex-col items-end gap-[2px] text-right max-[521px]:items-start max-[521px]:text-left">
					{FOOTER.credits.map((line) => (
						<span key={line[0].key}>
							<FooterRuns runs={line} />
						</span>
					))}
				</span>
			</div>
			<FooterScene />
		</Shell>
	);
}
