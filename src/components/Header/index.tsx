import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = globalThis.scrollY;

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

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

  return (
    <div
      className={`fixed flex items-center justify-center top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out  w-full z-50`}
      ref={headerRef}
    >
      <header
        className={`block h-16 w-[372px] text-white transition-all duration-500 ease-out rounded-2xl backdrop-blur-md shadow-[0px_5px_15px_rgba(255,255,255,0.05)] border-[1px] border-[rgba(255,255,255,0.3)]
        ${isHeaderVisible ? "opacity-100 " : "-translate-y-full opacity-0"}
        `}
      >
        <div className="flex w-full h-full items-center justify-center">
          <ul className="flex gap-8 justify-around items-center px-2 text-md font-medium">
            {headerElements.map((item) => (
              <li key={item.name} className="">
                <Link
                  to={item.path}
                  className="hover:font-extrabold transition-all duration-150"
                >
                  {item.name}
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
