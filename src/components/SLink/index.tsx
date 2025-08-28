"use client";

import { useEffect, useTransition } from "react";
import NextLink, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLoading } from "@/context";
import { ReactNode } from "react";

type SLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  replace?: boolean;
};

export default function SLink({ href, children, replace, className, ...rest }: SLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <NextLink
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
