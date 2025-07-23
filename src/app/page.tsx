import MagneticText from '@/components/ui/MagneticText';
import Blob from '@/components/ui/Blob';
import MountTransition from '@/components/transitions';
import { LayoutHeader } from '@/components/Header';

const Home = () => {
	return (
		<LayoutHeader>
			<section id='greet'>
				<div className='flex justify-center items-center'>
					<MountTransition>
						<Greeting />
					</MountTransition>
					<div
						className={`w-xs aspect-square hover:opacity-80 transition-opacity duration-300`}
					>
						<Avatar />
					</div>
				</div>
			</section>
		</LayoutHeader>
	);
};

const Avatar = () => {
	const githubUrl = 'https://github.com/securesvet';
	return (
		<a href={githubUrl} target='_blank'>
			<Blob imageUrl={'/me.webp'} />
		</a>
	);
};

const Greeting = () => {
	return (
		<>
			<p className='text-3xl'>Hi, my name is</p>
			<h2 className='text-3xl'>
				<MagneticText text='Sviatoslav' />
			</h2>
			<h2 className='text-3xl'>
				<MagneticText text='Murzin' startBold />
			</h2>
		</>
	);
};

export default Home;
