import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	trailingSlash: true,
	reactStrictMode: true,
	turbopack: {
		ignoreIssue: [
			{
				// Turbopack 16.4.6 ignores `adjustFontFallback: false` and warns
				// that Geist Pixel has no fallback metrics, though it still skips
				// the fallback. Drop the spurious warning; webpack honours the option.
				path: /.*/,
				title: 'Failed to find font override values for font `Geist Pixel`',
			},
		],
	},
};

export default nextConfig;
