import { Icon } from '@/components/icons';

export function ProofBand() {
	return (
		<div className="proof mt-[84px] text-left">
			<div className="section__head flex items-baseline justify-between gap-6 border-b border-line-strong pb-[18px] max-[521px]:flex-col max-[521px]:gap-1.5">
				<h2
					className="label inline-flex items-center gap-2 text-micro font-medium tracking-[0.1em] text-subtle uppercase"
					id="proof-title"
				>
					<Icon name="proof" size={24} />
					Cooler parts of my experience
				</h2>
			</div>
			<div className="band grid grid-cols-3 border-b border-line-strong text-left max-[861px]:grid-cols-1">
				<div className="band__cell border-l border-line pt-[28px] pr-[30px] pb-[30px] pl-[30px] first:border-l-0 first:pl-0 max-[861px]:border-t max-[861px]:border-l-0 max-[861px]:px-0 max-[861px]:pt-[22px] max-[861px]:pb-6 max-[861px]:first:border-t-0">
					<span className="band__num block font-pixel text-num font-normal tracking-normal text-data tabular-nums">
						832,000
					</span>
					<span className="band__unit mt-1.5 block text-small font-medium tracking-[-0.01em] text-ink">
						page views added
					</span>
					<p className="band__say mt-2.5 max-w-[34ch] text-[14.5px] leading-[1.55] text-copy max-[861px]:max-w-[52ch]">
						{
							"I built the logged-in hero and landing page for our Team '26 Rovo tour. It's 3% of Atlassian.com traffic now."
						}
					</p>
				</div>
				<div className="band__cell border-l border-line pt-[28px] pr-[30px] pb-[30px] pl-[30px] first:border-l-0 first:pl-0 max-[861px]:border-t max-[861px]:border-l-0 max-[861px]:px-0 max-[861px]:pt-[22px] max-[861px]:pb-6 max-[861px]:first:border-t-0">
					<span className="band__num block font-pixel text-num font-normal tracking-normal text-data tabular-nums">
						28.1%
					</span>
					<span className="band__unit mt-1.5 block text-small font-medium tracking-[-0.01em] text-ink">
						higher D1 to D6 retention
					</span>
					<p className="band__say mt-2.5 max-w-[34ch] text-[14.5px] leading-[1.55] text-copy max-[861px]:max-w-[52ch]">
						{
							'JIRA Service Management used to be hard-coded React. I moved it onto a drag-and-drop authoring platform and sign-ups went up 10%.'
						}
					</p>
				</div>
				<div className="band__cell border-l border-line pt-[28px] pr-[30px] pb-[30px] pl-[30px] first:border-l-0 first:pl-0 max-[861px]:border-t max-[861px]:border-l-0 max-[861px]:px-0 max-[861px]:pt-[22px] max-[861px]:pb-6 max-[861px]:first:border-t-0">
					<span className="band__num block font-pixel text-num font-normal tracking-normal text-data tabular-nums">
						450,000
					</span>
					<span className="band__unit mt-1.5 block text-small font-medium tracking-[-0.01em] text-ink">
						records per second
					</span>
					<p className="band__say mt-2.5 max-w-[34ch] text-[14.5px] leading-[1.55] text-copy max-[861px]:max-w-[52ch]">
						{
							'At Walmart, event-driven pipelines file clothing layouts on their own, at 450,000 records a second.'
						}
					</p>
				</div>
			</div>
		</div>
	);
}
