import { ICON_IMAGE_STYLE, type PxlKitData } from '@pxlkit/core';
import { renderIconDataUri } from '@pxlkit/core/vanilla';
import { Arrow, Heart, XpBar } from '@pxlkit/gamification';
import { Friends, User as SocialUser } from '@pxlkit/social';
import { CloudSync, Grid, Robot } from '@pxlkit/ui';
import { Compass, CrescentMoon } from '@pxlkit/weather';
import {
	Blocks,
	Briefcase,
	Building,
	Calendar,
	Close,
	CreditCard,
	GithubSolid,
	Globe,
	Linkedin,
	MailSharp,
	MapPin,
	Menu,
	User as PixelUser,
	ShoppingCart,
} from 'pixelarticons/react';
import type { ComponentType, SVGProps } from 'react';
import type { IconName } from '@/content/types';

type PixelEntry = {
	kind: 'pixel';
	Glyph: ComponentType<SVGProps<SVGSVGElement>>;
};

type PxlkitEntry = {
	kind: 'pxlkit';
	icon: PxlKitData;
};

type Entry = PixelEntry | PxlkitEntry;

export const ICONS = {
	menu: { kind: 'pixel', Glyph: Menu },
	close: { kind: 'pixel', Glyph: Close },
	github: { kind: 'pixel', Glyph: GithubSolid },
	linkedin: { kind: 'pixel', Glyph: Linkedin },
	mail: { kind: 'pixel', Glyph: MailSharp },
	work: { kind: 'pixel', Glyph: Briefcase },
	cart: { kind: 'pixel', Glyph: ShoppingCart },
	card: { kind: 'pixel', Glyph: CreditCard },
	globe: { kind: 'pixel', Glyph: Globe },
	building: { kind: 'pixel', Glyph: Building },
	blocks: { kind: 'pixel', Glyph: Blocks },
	person: { kind: 'pixel', Glyph: PixelUser },
	calendar: { kind: 'pixel', Glyph: Calendar },
	pin: { kind: 'pixel', Glyph: MapPin },
	heroPin: { kind: 'pxlkit', icon: Compass },
	proof: { kind: 'pxlkit', icon: XpBar },
	about: { kind: 'pxlkit', icon: Friends },
	frontend: { kind: 'pxlkit', icon: Grid },
	backend: { kind: 'pxlkit', icon: CloudSync },
	themeMoon: { kind: 'pxlkit', icon: CrescentMoon },
	arrow: { kind: 'pxlkit', icon: Arrow },
	heart: { kind: 'pxlkit', icon: Heart },
	footerUser: { kind: 'pxlkit', icon: SocialUser },
	footerRobot: { kind: 'pxlkit', icon: Robot },
} satisfies Record<IconName, Entry>;

type IconProps = {
	name: IconName;
	size?: number;
	className?: string;
};

export function Icon({ name, size = 24, className }: IconProps) {
	const entry: Entry = ICONS[name];

	if (entry.kind === 'pixel') {
		const Glyph = entry.Glyph;

		return (
			<Glyph
				width={size}
				height={size}
				className={className}
				shapeRendering="crispEdges"
				aria-hidden="true"
				focusable="false"
				data-slot="icon"
			/>
		);
	}

	return (
		// biome-ignore lint/performance/noImgElement: Pxlkit publishes its art as a data URI image with an authored palette.
		<img
			src={renderIconDataUri(entry.icon)}
			width={size}
			height={size}
			alt=""
			aria-hidden="true"
			draggable={false}
			style={ICON_IMAGE_STYLE}
			className={className}
			data-slot="icon"
		/>
	);
}
