import { CloudSync, Grid } from '@pxlkit/ui';

export const STACK_NOTE = 'What I actually use.';

export const STACK_GROUPS = [
	{
		icon: Grid,
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
		icon: CloudSync,
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
] as const;
