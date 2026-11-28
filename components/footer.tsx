import { Icon } from '@/components/icons';
import { FooterScene } from '@/components/icons/footer-scene';
import { Shell } from '@/components/primitives/shell';
import { SITE } from '@/content/site';

const INLINE_ICON =
	'ico ico--inline my-0 mr-[2px] ml-px inline-block size-4 align-[-3px]';

const CREDIT_LINK =
	'underline decoration-line-strong underline-offset-2 hover:text-ink hover:decoration-data';

// ponytail: the static export freezes the footer year at build time.
// Upgrade: render the year on the client if a stale year matters.
const year = new Date().getFullYear();

const nav = [
	...SITE.nav,
	{
		label: 'Résumé',
		href: `mailto:${SITE.email}?subject=${encodeURIComponent('Résumé')}`,
	},
	{ label: 'Top', href: '#top' },
];

export function Footer() {
	return (
		<Shell
			as="footer"
			className="foot relative mt-[72px] flex flex-wrap items-center justify-between gap-x-6 gap-y-[10px] overflow-hidden pt-6 pb-[160px] text-small text-subtle before:absolute before:top-0 before:right-pad before:left-pad before:h-px before:bg-line-strong before:content-['']"
		>
			<div className="foot__main foot__inner relative z-10 flex w-full flex-wrap items-baseline justify-between gap-x-10 gap-y-[14px] max-[521px]:gap-y-0">
				<p className="foot__who m-0 leading-[1.55] text-subtle">
					<span className="foot__id foot__name whitespace-nowrap">
						<b className="font-semibold text-copy">Van Sirisouk</b>,
						Software Engineer. {year}.
					</span>
					<br />
					<a
						className="foot__mail inline-flex min-h-11 items-center text-copy underline decoration-line-strong underline-offset-2 hover:text-ink hover:decoration-data"
						href={`mailto:${SITE.email}`}
					>
						{SITE.email}
					</a>
				</p>
				<nav
					aria-label="Footer"
					className="flex flex-wrap gap-x-[18px]"
				>
					{nav.map((item) => (
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
					<span className="foot__lead italic">Made with</span>{' '}
					<Icon name="heart" size={16} className={INLINE_ICON} /> by{' '}
					<Icon name="footerUser" size={16} className={INLINE_ICON} />{' '}
					and{' '}
					<Icon
						name="footerRobot"
						size={16}
						className={INLINE_ICON}
					/>{' '}
					in {SITE.location}
				</span>
				<span className="foot__credit flex flex-col items-end gap-[2px] text-right max-[521px]:items-start max-[521px]:text-left">
					<span>
						<span className="foot__lead italic">Built with</span>{' '}
						<a
							href="https://www.deepseek.com"
							rel="noopener"
							className={CREDIT_LINK}
						>
							DeepSeek
						</a>
						{', '}
						<a
							href="https://hermes-agent.nousresearch.com"
							rel="noopener"
							className={CREDIT_LINK}
						>
							Hermes Agent
						</a>
						{', and '}
						<a
							href="https://opencode.ai"
							rel="noopener"
							className={CREDIT_LINK}
						>
							OpenCode
						</a>
						{'.'}
					</span>
					<span>
						<span className="foot__lead italic">Icons by</span>{' '}
						<a
							href="https://pxlkit.xyz"
							rel="noopener"
							className={CREDIT_LINK}
						>
							Pxlkit
						</a>{' '}
						and{' '}
						<a
							href="https://pixelarticons.com"
							rel="noopener"
							className={CREDIT_LINK}
						>
							Pixelarticons
						</a>
						{'.'}
					</span>
				</span>
			</div>
			<FooterScene />
		</Shell>
	);
}
