import { Icon } from '@/components/icons';
import { SectionHead } from '@/components/primitives/section-head';
import { Shell } from '@/components/primitives/shell';
import { WorkRow } from '@/components/work-row';
import { WORK_NOTE, WORK_ROWS } from '@/content/work';

export function Work() {
	return (
		<Shell
			as="section"
			id="work"
			aria-labelledby="work-title"
			className="section scroll-mt-[112px] pt-section"
		>
			<SectionHead
				id="work-title"
				icon={<Icon name="work" size={24} className="text-subtle" />}
				label="Work"
				note={WORK_NOTE}
			/>
			<div className="rows mt-1 flex flex-col gap-[68px] max-[861px]:gap-[46px]">
				{WORK_ROWS.map((row) => (
					<WorkRow key={row.org} row={row} />
				))}
			</div>
		</Shell>
	);
}
