import { useState } from "react";

const Footer = () => {
  const [isFooterLitUp, setIsFooterLitUp] = useState(false);

  return (
    <div className="grid place-items-center bottom-4 z-50">
      <footer
        className={`relative mx-auto mt-20 w-[90vw] h-16 px-6 text-white rounded-2xl backdrop-blur-md transition-all duration-500 ease-out p-10
        ${
          isFooterLitUp
            ? "shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            : "shadow-md"
        }
      `}
        onMouseEnter={() => setIsFooterLitUp(true)}
        onMouseLeave={() => setIsFooterLitUp(false)}
      >
        <div></div>
        <div className="grid h-full place-items-center text-sm font-medium">
          <p>
            © {new Date().getFullYear()} Sviatoslav Murzin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
