import { SITE } from './site';
import type { IconName, NavItem } from './types';

export type FooterLink = {
	label: string;
	href: string;
	rel?: string;
};

export type FooterRun =
	| { key: string; text: string; lead?: boolean }
	| { key: string; icon: IconName }
	| { key: string; link: FooterLink };

export const FOOTER: {
	identity: { name: string; role: string; year: string };
	mail: FooterLink;
	nav: NavItem[];
	made: FooterRun[];
	credits: FooterRun[][];
} = {
	identity: {
		name: 'Van Sirisouk',
		role: 'Software Engineer',
		year: '2026',
	},
	mail: {
		label: SITE.email,
		href: `mailto:${SITE.email}`,
	},
	nav: [
		...SITE.nav,
		{
			label: 'Résumé',
			href: `mailto:${SITE.email}?subject=${encodeURIComponent('Résumé')}`,
		},
		{ label: 'Top', href: '#top' },
	],
	made: [
		{ key: 'made-lead', text: 'Made with', lead: true },
		{ key: 'made-space', text: ' ' },
		{ key: 'made-heart', icon: 'heart' },
		{ key: 'made-by', text: ' by ' },
		{ key: 'made-user', icon: 'footerUser' },
		{ key: 'made-and', text: ' and ' },
		{ key: 'made-robot', icon: 'footerRobot' },
		{ key: 'made-place', text: ` in ${SITE.location}` },
	],
	credits: [
		[
			{ key: 'tools-lead', text: 'Built with', lead: true },
			{ key: 'tools-space', text: ' ' },
			{
				key: 'tools-deepseek',
				link: {
					label: 'DeepSeek',
					href: 'https://www.deepseek.com',
					rel: 'noopener',
				},
			},
			{ key: 'tools-comma-1', text: ', ' },
			{
				key: 'tools-hermes',
				link: {
					label: 'Hermes Agent',
					href: 'https://hermes-agent.nousresearch.com',
					rel: 'noopener',
				},
			},
			{ key: 'tools-comma-2', text: ', and ' },
			{
				key: 'tools-opencode',
				link: {
					label: 'OpenCode',
					href: 'https://opencode.ai',
					rel: 'noopener',
				},
			},
			{ key: 'tools-end', text: '.' },
		],
		[
			{ key: 'icons-lead', text: 'Icons by', lead: true },
			{ key: 'icons-space', text: ' ' },
			{
				key: 'icons-pxlkit',
				link: {
					label: 'Pxlkit',
					href: 'https://pxlkit.xyz',
					rel: 'noopener',
				},
			},
			{ key: 'icons-and', text: ' and ' },
			{
				key: 'icons-pixelarticons',
				link: {
					label: 'Pixelarticons',
					href: 'https://pixelarticons.com',
					rel: 'noopener',
				},
			},
			{ key: 'icons-end', text: '.' },
		],
	],
};
