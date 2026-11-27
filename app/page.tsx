import { About } from '@/components/about';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { SiteHeader } from '@/components/site-header';
import { Stack } from '@/components/stack';
import { Work } from '@/components/work';

export default function Page() {
	return (
		<>
			<SiteHeader />
			<main id="main" tabIndex={-1}>
				<Hero />
				<About />
				<Stack />
				<Work />
			</main>
			<Footer />
		</>
	);
}
