import { Icon } from '@/components/icons';
import type { WorkRowData } from '@/content/work';

export function WorkRow({ row }: { row: WorkRowData }) {
	return (
		<article className="row">
			<div className="row__head flex items-start gap-3.5 max-[861px]:flex-wrap">
				<div className="row__titles min-w-0 flex-1">
					<h3 className="row__title flex items-start gap-2 text-[20px] leading-[1.3] font-medium tracking-[-0.015em]">
						<Icon
							name={row.icon}
							size={24}
							className="mt-px shrink-0 text-copy"
						/>
						{row.title}
					</h3>
					<p className="row__org row__meta mt-[3px] flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-copy">
						<Icon
							name="person"
							size={16}
							className="mx-1 shrink-0 text-subtle"
						/>
						{row.org}
						<span className="row__loc inline-flex items-center gap-1.5 text-subtle">
							<Icon
								name="pin"
								size={16}
								className="shrink-0 text-subtle"
							/>
							{row.city}
						</span>
					</p>
				</div>
				<p className="row__when ml-auto flex flex-none items-center gap-[7px] pt-[5px] text-small font-medium whitespace-nowrap text-subtle tabular-nums max-[861px]:mt-1 max-[861px]:ml-0 max-[861px]:basis-full max-[861px]:pt-0">
					<Icon
						name="calendar"
						size={16}
						className="shrink-0 text-subtle"
					/>
					{row.dates}
				</p>
			</div>
			<ul className="row__items items mt-4 border-t border-line">
				{row.items.map((item, index) => (
					<li
						key={`${row.org}-${index}`}
						className="item grid grid-cols-[132px_1fr] gap-x-7 gap-y-1 border-b border-line py-[13px] last:border-b-0 last:pb-[2px] max-[861px]:grid-cols-1 max-[861px]:gap-y-1.5 max-[861px]:py-3 max-[861px]:last:pb-[2px]"
					>
						{item.figure ? (
							<span className="item__metric flex flex-col gap-0.5 max-[861px]:flex-row max-[861px]:items-baseline max-[861px]:gap-[7px]">
								<b className="font-pixel text-[22px] leading-[1.25] font-normal tracking-normal text-data tabular-nums max-[861px]:text-[20px]">
									{item.figure}
								</b>
								<span className="text-micro leading-[1.3] font-medium tracking-[0.01em] text-subtle">
									{item.figureLabel}
								</span>
							</span>
						) : (
							<span className="item__metric" aria-hidden="true" />
						)}
						<p className="m-0 max-w-[60ch] text-[16px] leading-[1.55] text-copy">
							{item.text}
						</p>
					</li>
				))}
			</ul>
		</article>
	);
}
