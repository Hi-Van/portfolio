import type { BandCell, TextRun } from './types';

export const HERO_DECK: TextRun[] = [
	{ text: 'Human visualizing ' },
	{ text: '1&0', code: true },
	{
		text: " for other humans. Right now I'm a software engineer on the growth team at ",
	},
	{ text: 'Atlassian', strong: true },
	{ text: '.' },
];

export const PROOF_LABEL = 'Cooler parts of my experience';

export const PROOF_BAND: BandCell[] = [
	{
		figure: '832,000',
		unit: 'page views added',
		say: "I built the logged-in hero and landing page for our Team '26 Rovo tour. It's 3% of Atlassian.com traffic now.",
	},
	{
		figure: '28.1%',
		unit: 'higher D1 to D6 retention',
		say: 'JIRA Service Management used to be hard-coded React. I moved it onto a drag-and-drop authoring platform and sign-ups went up 10%.',
	},
	{
		figure: '450,000',
		unit: 'records per second',
		say: 'At Walmart, event-driven pipelines file clothing layouts on their own, at 450,000 records a second.',
	},
];
