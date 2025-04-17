import MagneticText from "@/components/ui/MagneticText";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props: ImageProps) => <Image {...props} />,
        MagneticText: (props: any) => <MagneticText {...props} />,
      ...components,
    }
  }