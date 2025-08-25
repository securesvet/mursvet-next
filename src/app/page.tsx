import MagneticText from "@/components/ui/MagneticText";
import MountTransition from "@/components/transitions";
import { Library } from '../components/Library/';
import { LayoutHeader } from "@/components/Header";
import Image from 'next/image';

const Home = () => {
  return (
    <LayoutHeader>
      <section id="greet" className="h-[600px] flex justify-center items-center">
        <div className="flex justify-center items-center gap-8">
          <MountTransition>
            <Greeting />
          </MountTransition>
          <div
            className={`aspect-square hover:opacity-80 transition-opacity duration-300`}
          >
            <Avatar />
          </div>
        </div>
      </section>
      <section id="library">
        <h1 className="text-3xl">Library:</h1>
        <Library />
      </section>
    </LayoutHeader>
  );
};

const Avatar = () => {
  const githubUrl = "https://github.com/securesvet";
  return (
    <a href={githubUrl} target="_blank">
      <Image src={"/photo_me_elevator_square.webp"} alt="Sviatoslav Murzin Image" width={200} height={200} />
    </a>
  );
};

const Greeting = () => {
  return (
    <>
      <p className="text-3xl">Hi, my name is</p>
      <h2 className="text-3xl">
        <MagneticText text="Sviatoslav" />
      </h2>
      <h2 className="text-3xl">
        <MagneticText text="Murzin" startBold />
      </h2>
    </>
  );
};

export default Home;
