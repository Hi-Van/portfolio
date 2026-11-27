import { NAV_MARK_MARKUP } from '@/components/icons/nav-mark-markup';

// The prototype's 16 by 16 brand mark: the only inline mark on the page.
export function NavMark() {
	return (
		<svg
			className="brand__mark"
			width={16}
			height={16}
			viewBox="0 0 16 16"
			shapeRendering="crispEdges"
			aria-hidden="true"
			focusable="false"
			dangerouslySetInnerHTML={{ __html: NAV_MARK_MARKUP }}
		/>
	);
}
