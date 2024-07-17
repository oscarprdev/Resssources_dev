import ArrivalsSection from '@/app/components/home/arrivals/ArrivalsSection';
import HeroSection from '@/app/components/home/hero/HeroSection';
import ResourcesListSection from '@/app/components/home/list/ResourcesListSection';
import { Kinds } from '@/features/resources/shared/resources.types';

type HomePageProps = {
	searchParams: {
		kinds: string;
	};
};

export default function Home({ searchParams: { kinds } }: HomePageProps) {
	const kindsFilter = kinds ? (kinds.split(',') as Kinds) : [];
	console.log(kindsFilter);
	return (
		<>
			<HeroSection />
			<ArrivalsSection />
			<ResourcesListSection kindFilter={kindsFilter} />
		</>
	);
}
