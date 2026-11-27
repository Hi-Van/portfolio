export type IconName =
	| 'menu'
	| 'close'
	| 'github'
	| 'linkedin'
	| 'mail'
	| 'work'
	| 'cart'
	| 'card'
	| 'globe'
	| 'building'
	| 'blocks'
	| 'person'
	| 'calendar'
	| 'pin'
	| 'heroPin'
	| 'proof'
	| 'about'
	| 'frontend'
	| 'backend'
	| 'themeMoon'
	| 'arrow'
	| 'heart'
	| 'footerUser'
	| 'footerRobot';

export type AnimatedIconName = 'stack' | 'themeSun';

export type TextRun = {
	text: string;
	code?: boolean;
	strong?: boolean;
};

export type Paragraph = TextRun[];

export type NameSegment = {
	text: string;
	mark?: boolean;
};

export type SocialLink = {
	label: string;
	href: string;
	icon: IconName;
	rel?: string;
};

export type NavItem = {
	label: string;
	href: string;
};

export type BandCell = {
	figure: string;
	unit: string;
	say: string;
};

export type Fact = {
	term: string;
	detail: string;
};

export type StackGroup = {
	icon: IconName;
	label: string;
	items: string[];
};

export type WorkItem = {
	figure?: string;
	figureLabel?: string;
	text: string;
};

export type WorkRow = {
	org: string;
	city: string;
	icon: IconName;
	title: string;
	dates: string;
	items: WorkItem[];
};
