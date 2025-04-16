import mursvet from "/images/mursvet.webp";
import heroed from "/images/heroed.webp";
import tbank from "/images/tbank.webp";
import { LayoutHeader } from "@/components/Header/";
import Card, { CardProps } from "@/components/ui/Card";
import { FaGithub, FaNodeJs, FaReact } from "react-icons/fa";
import ViteSvg from "/images/vite.svg";
import ReduxSvg from "/images/redux.svg";
import BabelSvg from "/images/babel.svg";
import { SiDeno } from "react-icons/si";
import { ReactNode } from "react";
import { IconContext } from "react-icons";

const ReactColorIcon = () => {
  return (
    <IconContext.Provider value={{ color: "#61DAFB" }}>
      <FaReact />
    </IconContext.Provider>
  );
};
const NodeJsColorIcon = () => {
  return (
    <IconContext.Provider value={{ color: "#68a063" }}>
      <FaNodeJs />
    </IconContext.Provider>
  );
};

const DenoColorIcon = () => {
  return (
    <IconContext.Provider value={{ color: "#000000" }}>
      <SiDeno />
    </IconContext.Provider>
  );
};

const ViteSvgColorIcon = () => {
  return <ViteSvg width={20} height={20} />;
};

const ReduxSvgColorIcon = () => {
  return <ReduxSvg width={20} height={20} />;
};

const BableSvgColorIcon = () => {
  return <BabelSvg width={20} height={20} />;
};

const Projects = () => {
  const data = [
    {
      name: "mursvet site",
      image: mursvet,
      description: "This website hosted on Github Pages",
      href: "https://mursvet.ru",
      githubUrl: "https://github.com/securesvet/writeups",
      stack: [
        <ReactColorIcon key="react" />,
        <NodeJsColorIcon key="nodejs" />,
        <DenoColorIcon key="deno" />,
        <ViteSvgColorIcon key="vite" />,
        <BableSvgColorIcon key="babel" />,
      ],
    },
    {
      name: "Heroed",
      image: heroed,
      description: "D&D helper",
      href: "https://securesvet.github.io/heroed/",
      githubUrl: "https://github.com/securesvet/heroed",
      stack: [
        <ReactColorIcon key="react" />,
        <NodeJsColorIcon key="nodejs" />,
        <ViteSvgColorIcon key="vite" />,
        <ReduxSvgColorIcon key="redux" />,
      ],
    },
    {
      name: "Design T-Bank",
      image: tbank,
      href: "https://design.tbank.ru",
      description: "Design guidelines for T-Bank",
    },
  ];

  return (
    <LayoutHeader>
      <div className="text-center mb-12">
        <h2 className="text-white drop-shadow-lg">
          Projects
        </h2>
        <p className="text-gray-300 mt-2 text-lg">
          {data.length} Project{data.length > 1 && "s"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-12">
        {data.map((el, index) => (
          <ProjectCard
            key={index}
            href={el.href}
            image={el.image.src}
            name={el.name}
            description={el.description}
            githubUrl={el.githubUrl}
            stack={el.stack}
          />
        ))}
      </div>
    </LayoutHeader>
  );
};

const ProjectCard = ({
  githubUrl,
  stack,
  ...props
}: { githubUrl?: string; stack?: ReactNode[] } & CardProps) => {
  return (
    <Card {...props}>
      {githubUrl
        ? (
          <a
            href={githubUrl}
            target="_blank"
            className="mt-2 inline-block hover:underline items-center"
          >
            <div className="flex items-center gap-2 justify-center">
              <FaGithub className="inline" /> Github
            </div>
          </a>
        )
        : <p>Closed source</p>}
      <div className="flex justify-center mt-2 items-center gap-2">{stack}</div>
    </Card>
  );
};

export default Projects;
