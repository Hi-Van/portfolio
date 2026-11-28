import { GithubSolid, Linkedin, MailSharp } from 'pixelarticons/react';

export const SITE = {
	nameSegments: [
		{ text: 'Van', mark: true },
		{ text: 'ouphon ', mark: false },
		{ text: 'S', mark: true },
		{ text: 'irisouk', mark: false },
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
			icon: GithubSolid,
			rel: 'me',
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/van-s/',
			icon: Linkedin,
			rel: 'me',
		},
		{
			label: 'Email',
			href: 'mailto:contact@vansiriso.uk',
			icon: MailSharp,
			rel: undefined,
		},
	],
	workLink: '#work',
} as const;
