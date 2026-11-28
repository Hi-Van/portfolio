import {
	Blocks,
	Building,
	CreditCard,
	Globe,
	ShoppingCart,
} from 'pixelarticons/react';
import type { ComponentType, SVGProps } from 'react';

export type WorkRowData = {
	org: string;
	city: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
	dates: string;
	items: { figure?: string; figureLabel?: string; text: string }[];
};

export const WORK_NOTE = 'Three roles and two internships, 2021 to now.';

// ponytail: "to now" is copy, not a computed date. Edit it when the role
// changes. Upgrade: derive the end date from a start date and a current flag.
export const WORK_ROWS: WorkRowData[] = [
	{
		org: 'Atlassian',
		city: 'New York',
		icon: Blocks,
		title: 'Software Engineer II, Growth',
		dates: 'Jun 2025 to now',
		items: [
			{
				figure: '28.1%',
				figureLabel: 'D1 to D6 retention',
				text: 'Moved JIRA Service Management off hard-coded React onto a drag-and-drop authoring platform. Sign-ups rose 10% in the same experiment.',
			},
			{
				figure: '832k',
				figureLabel: 'page views',
				text: "Built the logged-in hero and landing page for the Team '26 Rovo tour. That surface is 3% of Atlassian.com traffic now.",
			},
			{
				figure: '40+',
				figureLabel: 'charts',
				text: 'Set the route-level data standard behind the dashboard that tracks authoring adoption and publication rate.',
			},
			{
				text: 'Built the frontend that shows our AI recommendations on Atlassian.com, including the content-to-ID mapping from model output to page content.',
			},
		],
	},
	{
		org: 'Walmart Global Tech',
		city: 'Bentonville, Arkansas',
		icon: ShoppingCart,
		title: 'Software Engineer, Merchant Tools',
		dates: 'Aug 2023 to May 2025',
		items: [
			{
				figure: '390k',
				figureLabel: 'submissions a day',
				text: 'Built a TypeScript app for external product submissions with two other engineers. Sessions got 22% shorter.',
			},
			{
				figure: '450k',
				figureLabel: 'records a second',
				text: 'Wrote the event-driven pipelines that file clothing layouts, with nobody approving each one.',
			},
			{
				figure: '30%',
				figureLabel: 'faster queries',
				text: 'Wrote the C# .NET cleanup service for a multi-tenant database. Annual storage cost fell by $1,200.',
			},
		],
	},
	{
		org: 'Synchrony',
		city: 'Stamford, Connecticut',
		icon: CreditCard,
		title: 'Software Engineer, Account Services',
		dates: 'Sep 2022 to May 2023',
		items: [
			{
				figure: '1M+',
				figureLabel: 'accounts',
				text: 'Wrote the alerts service. It reads Kafka topics and sends the notifications.',
			},
			{
				figure: '30%',
				figureLabel: 'less alert work',
				text: 'Built a Java SDK that tests the alerts API from internal applications.',
			},
			{
				text: 'Set the coding standards that later notification channels build on, during the refactor.',
			},
		],
	},
	{
		org: 'Meta',
		city: 'New York',
		icon: Globe,
		title: 'Software Engineer Intern, AI T&C',
		dates: 'May 2022 to Aug 2022',
		items: [
			{
				figure: '600k',
				figureLabel: 'queries a second',
				text: 'Built PyTorch pipelines that categorize content on Facebook and Instagram.',
			},
			{
				figure: '350%',
				figureLabel: 'platform speed',
				text: 'Batched subscription events in a Python API.',
			},
			{
				figure: '67%',
				figureLabel: 'smaller build',
				text: 'Moved ML packages onto shared infrastructure.',
			},
		],
	},
	{
		org: 'Edgewell Personal Care',
		city: 'Milford, Connecticut',
		icon: Building,
		title: 'System Engineer Intern',
		dates: 'May 2021 to Jul 2021',
		items: [
			{
				figure: '$14k',
				figureLabel: 'a year',
				text: 'Found redundancy in the cloud setup behind the product database and cut it from the annual bill.',
			},
			{
				figure: '17%',
				figureLabel: 'more test coverage',
				text: 'Set up CI/CD and version control.',
			},
			{
				figure: '20k',
				figureLabel: 'queries a second',
				text: 'Built the internal search tool in Python and JavaScript.',
			},
		],
	},
];
