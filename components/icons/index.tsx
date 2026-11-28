import type { SVGProps } from 'react';

/** Shared attributes for a Pixelarticons glyph rendered inline. */
export const PIXEL_ICON_PROPS = {
	width: 24,
	height: 24,
	shapeRendering: 'crispEdges',
	'aria-hidden': 'true',
	focusable: 'false',
	'data-slot': 'icon',
} as const;

export function Icon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			shapeRendering="crispEdges"
			aria-hidden="true"
			focusable="false"
			data-slot="icon"
			{...props}
		/>
	);
}
