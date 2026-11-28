import { BaseIcon } from '@/components/icons/base';
import { FOOTER_MARKUP } from '@/components/icons/footer-markup';

// The prototype's 1144 by 128 footer scene: the only inline scene on the page.
export function FooterScene() {
	return (
		<BaseIcon
			className="foot__decor print:hidden"
			width={1144}
			height={128}
			viewBox="0 0 1144 128"
			preserveAspectRatio="xMaxYMax slice"
			dangerouslySetInnerHTML={{ __html: FOOTER_MARKUP }}
		/>
	);
}
