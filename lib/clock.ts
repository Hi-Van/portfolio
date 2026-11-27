export type ClockReading = {
	weekday: string;
	date: string;
	time: string;
	iso: string;
};

const ZONE = 'America/New_York';

const dateFormat = new Intl.DateTimeFormat('en-US', {
	timeZone: ZONE,
	month: 'long',
	day: 'numeric',
	year: 'numeric',
});

const timeFormat = new Intl.DateTimeFormat('en-US', {
	timeZone: ZONE,
	hour: 'numeric',
	minute: '2-digit',
	timeZoneName: 'short',
});

const weekdayFormat = new Intl.DateTimeFormat('en-US', {
	timeZone: ZONE,
	weekday: 'long',
});

export function formatNow(date: Date): ClockReading {
	return {
		weekday: `${weekdayFormat.format(date)}, `,
		date: dateFormat.format(date),
		time: timeFormat.format(date),
		iso: date.toISOString(),
	};
}
