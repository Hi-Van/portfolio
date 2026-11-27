import type { Fact, Paragraph } from './types';

export const ABOUT_NOTE = 'New York, NY';

export const ABOUT_LABEL = 'The short version';

export const ABOUT_PARAGRAPHS: Paragraph[] = [
	[
		{
			text: 'I graduated from UConn in 2023 and went straight into retail data. A catalog is bigger and messier than it looks, and most of the job was getting conventions to agree with each other, then measuring what changed.',
		},
	],
	[
		{
			text: 'At Atlassian I work on the authoring and publishing side of the same problem. I like ',
		},
		{
			text: 'the parts nobody notices when they work',
			strong: true,
		},
		{
			text: ': the mapping that keeps a generated recommendation pointed at the right paragraph, the form that stops you before you submit the wrong thing.',
		},
	],
];

export const ABOUT_FACTS: Fact[] = [
	{
		term: 'Currently',
		detail: 'Software Engineer II, Growth at Atlassian, since June 2025',
	},
	{
		term: 'Experience',
		detail: 'Four years, across consumer goods, payments, retail data and developer tools',
	},
	{
		term: 'Focus',
		detail: 'Product data, authoring platforms, growth engineering',
	},
	{ term: 'Based in', detail: 'New York, NY, Eastern time' },
	{ term: 'Education', detail: 'B.S. Computer Science, UConn, 2023' },
];
