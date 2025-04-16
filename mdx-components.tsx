import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props: ImageProps) => <Image {...props} />,
      ...components,
    }
  }