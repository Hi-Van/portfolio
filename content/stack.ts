import type { StackGroup } from './types';

export const STACK_NOTE = 'What I actually use.';

export const STACK_GROUPS: StackGroup[] = [
	{
		icon: 'frontend',
		label: 'Frontend',
		items: [
			'React',
			'TypeScript',
			'JavaScript',
			'NodeJS',
			'Express',
			'HTML/CSS',
		],
	},
	{
		icon: 'backend',
		label: 'Backend and infrastructure',
		items: [
			'Java',
			'Spring Boot',
			'Python',
			'C#',
			'SQL',
			'Kafka',
			'GCP Pub/Sub',
			'gRPC',
			'AWS',
			'GCP',
			'Kubernetes',
			'Docker',
			'Postgres',
			'Redis',
			'MongoDB',
		],
	},
];
