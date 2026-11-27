import { Icon } from '@/components/icons';
import { PROOF_BAND, PROOF_LABEL } from '@/content/hero';

export function ProofBand() {
	return (
		<div className="proof mt-[84px] text-left">
			<div className="section__head flex items-baseline justify-between gap-6 border-b border-line-strong pb-[18px] max-[521px]:flex-col max-[521px]:gap-1.5">
				<h2
					className="label inline-flex items-center gap-2 text-micro font-medium tracking-[0.1em] text-subtle uppercase"
					id="proof-title"
				>
					<Icon name="proof" size={24} />
					{PROOF_LABEL}
				</h2>
			</div>
			<div className="band grid grid-cols-3 border-b border-line-strong text-left max-[861px]:grid-cols-1">
				{PROOF_BAND.map((cell) => (
					<div
						className="band__cell border-l border-line pt-[28px] pr-[30px] pb-[30px] pl-[30px] first:border-l-0 first:pl-0 max-[861px]:border-t max-[861px]:border-l-0 max-[861px]:px-0 max-[861px]:pt-[22px] max-[861px]:pb-6 max-[861px]:first:border-t-0"
						key={cell.figure}
					>
						<span className="band__num block font-pixel text-num font-normal tracking-normal text-data tabular-nums">
							{cell.figure}
						</span>
						<span className="band__unit mt-1.5 block text-small font-medium tracking-[-0.01em] text-ink">
							{cell.unit}
						</span>
						<p className="band__say mt-2.5 max-w-[34ch] text-[14.5px] leading-[1.55] text-copy max-[861px]:max-w-[52ch]">
							{cell.say}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
