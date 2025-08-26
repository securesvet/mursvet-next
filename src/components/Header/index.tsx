"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import MagneticText from "../ui/MagneticText";
import { useLoading } from "@/context";

const headerElements = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Writeups",
    path: "/writeups",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Resume",
    path: "/resume",
  },
];


const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = globalThis.scrollY;

      if (currentScrollY > prevScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <div
      className={`fixed flex items-center justify-center top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out  w-full z-50
`}
      ref={headerRef}
    >
      <header
        className={`block h-16 w-[372px] transition-all duration-500 ease-out rounded-2xl backdrop-blur-md shadow-[0px_5px_15px_rgba(255,255,255,0.05)] border-[1px] border-[rgba(0,0,0,0.3)]
        ${isHeaderVisible ? "opacity-100 " : "-translate-y-full opacity-0"}
        ${isLoading ? "border-blue-500 shadow-lg shadow-blue-500/50 animate-pulse" : "border-[rgba(0,0,0,0.3)]"}
        `}
      >
        <div className="flex w-full h-full items-center justify-center">
          <ul className="flex gap-8 justify-around items-center px-2 text-md font-medium">
            {headerElements.map((item) => (
              <li key={item.name} className="">
                <Link
                  href={item.path}
                  className="hover:font-extrabold transition-all duration-150"
                >
                  <MagneticText text={item.name} minWeight={400} />
                </Link>
                <div></div>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

const LayoutHeader = ({ children }: { children: ReactNode }) => {
  return <div className="pt-[calc(var(--header-height)+1rem)]">{children}</div>;
};

export default Header;

export { LayoutHeader };
