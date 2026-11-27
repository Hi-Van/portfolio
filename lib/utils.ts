import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// The prototype's type scale uses custom token names. Without registering them
// tailwind-merge treats `text-nav` and friends as text colours and drops them
// when a colour class follows in the same merge.
const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			text: [
				'display',
				'h2',
				'num',
				'num-inline',
				'lead',
				'body',
				'nav',
				'small',
				'micro',
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
