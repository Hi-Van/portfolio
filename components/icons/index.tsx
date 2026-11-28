import type { SVGProps } from 'react';

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
