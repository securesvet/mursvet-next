import { ReactNode, useEffect, useState } from "react";

type MountTransitionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const MountTransition = (
  { children, delay = 100, className = "" }: MountTransitionProps,
) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default MountTransition;
