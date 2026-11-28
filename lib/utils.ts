import { createCn } from 'cn/config';

// The prototype's type scale uses custom token names. Registering them as
// font sizes keeps `cn` from treating `text-nav` and friends as text colours
// and dropping them when a colour class follows in the same merge.
const cn = createCn({
	extend: {
		classGroups: {
			'font-size': [
				{
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
			],
		},
	},
});

export { cn };
