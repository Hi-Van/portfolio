import type { NameSegment, NavItem, SocialLink } from './types';

export const SITE: {
	nameSegments: NameSegment[];
	email: string;
	location: string;
	nav: NavItem[];
	socials: SocialLink[];
	workLink: string;
} = {
	nameSegments: [
		{ text: 'Van', mark: true },
		{ text: 'ouphon ' },
		{ text: 'S', mark: true },
		{ text: 'irisouk' },
		{ text: '.', mark: true },
	],
	email: 'contact@vansiriso.uk',
	location: 'New York',
	nav: [
		{ label: 'About', href: '#about' },
		{ label: 'Stack', href: '#stack' },
		{ label: 'Work', href: '#work' },
	],
	socials: [
		{
			label: 'GitHub',
			href: 'https://github.com/Hi-Van',
			icon: 'github',
			rel: 'me',
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/van-s/',
			icon: 'linkedin',
			rel: 'me',
		},
		{
			label: 'Email',
			href: 'mailto:contact@vansiriso.uk',
			icon: 'mail',
		},
	],
	workLink: '#work',
};
