import type { Metadata, Viewport } from 'next';
import { Geist_Pixel, Instrument_Sans } from 'next/font/google';
import { SkipLink } from '@/components/skip-link';
import './globals.css';

const geistPixel = Geist_Pixel({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-geist-pixel',
	display: 'swap',
	// Next has no precomputed fallback metrics for Geist Pixel, so it warns
	// and skips the adjusted fallback anyway. Ask for no fallback explicitly.
	adjustFontFallback: false,
});

const instrumentSans = Instrument_Sans({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	variable: '--font-instrument-sans',
	display: 'swap',
});

const themeScript =
	'try{var t=localStorage.getItem("vs-theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}';

export const metadata: Metadata = {
	title: 'Van Sirisouk, software engineer',
	description:
		'Van Sirisouk is a software engineer in New York. Product data, catalogs, pipelines, and the forms that keep supplier data usable at scale.',
};

export const viewport: Viewport = {
	colorScheme: 'light dark',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistPixel.variable} ${instrumentSans.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body id="top">
				<SkipLink />
				{children}
			</body>
		</html>
	);
}
