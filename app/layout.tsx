import type { Metadata, Viewport } from 'next';

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
		<html lang="en">
			<body id="top">{children}</body>
		</html>
	);
}
