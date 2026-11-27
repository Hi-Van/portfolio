'use client';

import { useEffect, useState } from 'react';
import { formatNow } from '@/lib/clock';

const FALLBACK = {
	weekday: 'Friday, ',
	date: 'November 27, 2026',
	time: '4:43 AM EST',
	iso: '2026-11-27T09:43:00Z',
};

export function Clock() {
	const [reading, setReading] = useState(FALLBACK);

	useEffect(() => {
		const update = () => setReading(formatNow(new Date()));

		update();
		const timer = window.setInterval(update, 15_000);

		return () => window.clearInterval(timer);
	}, []);

	return (
		<time
			className="eyebrow__clock whitespace-nowrap text-subtle tabular-nums"
			data-clock
			dateTime={reading.iso}
		>
			<span
				className="eyebrow__weekday max-[520px]:hidden"
				data-clock-weekday
			>
				{reading.weekday}
			</span>
			<span data-clock-date>{reading.date}</span> at{' '}
			<span data-clock-time>{reading.time}</span>
		</time>
	);
}
