import { Icon } from '@/components/icons';
import { SectionHead } from '@/components/primitives/section-head';
import { Shell } from '@/components/primitives/shell';
import {
	ABOUT_FACTS,
	ABOUT_LABEL,
	ABOUT_NOTE,
	ABOUT_PARAGRAPHS,
} from '@/content/about';

export function About() {
	return (
		<Shell
			as="section"
			id="about"
			aria-labelledby="about-title"
			className="section scroll-mt-[112px] pt-section"
		>
			<SectionHead
				id="about-title"
				icon={<Icon name="about" size={24} />}
				label="About"
				note={ABOUT_NOTE}
			/>
			<div className="about about__grid grid grid-cols-[180px_minmax(0,1fr)_260px] items-start gap-x-12 pt-[26px] max-[1081px]:grid-cols-[168px_minmax(0,1fr)] max-[1081px]:gap-x-8 max-[1081px]:gap-y-2 max-[861px]:grid-cols-1 max-[861px]:gap-1.5">
				<p className="about__short label inline-flex items-center gap-2 self-start text-micro font-medium tracking-[0.1em] text-subtle uppercase">
					{ABOUT_LABEL}
				</p>
				<div className="about__copy space-y-4">
					{ABOUT_PARAGRAPHS.map((paragraph) => (
						<p key={paragraph[0].text}>
							{paragraph.map((run) =>
								run.strong ? (
									<span
										key={run.text}
										className="em font-medium text-ink"
									>
										{run.text}
									</span>
								) : (
									<span key={run.text}>{run.text}</span>
								)
							)}
						</p>
					))}
				</div>
				<dl className="facts grid gap-0 max-[1081px]:col-start-2 max-[1081px]:mt-[30px] max-[861px]:col-start-auto max-[861px]:mt-6">
					{ABOUT_FACTS.map((fact) => (
						<div
							key={fact.term}
							className="mb-3.5 border-b border-line pb-3.5 text-[14.5px] leading-[1.45] last:mb-0 last:border-b-0 last:pb-0"
						>
							<dt className="mb-[3px] text-micro leading-[1.45] font-medium tracking-[0.1em] text-subtle uppercase">
								{fact.term}
							</dt>
							<dd className="m-0 text-ink">{fact.detail}</dd>
						</div>
					))}
				</dl>
			</div>
		</Shell>
	);
}
