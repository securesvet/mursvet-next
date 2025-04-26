import { Spoiler } from "@/components/ui/Spoiler";
import MagneticText from "@/components/ui/MagneticText";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // img: (props: ImageProps) => (
    //   <Image
    //     width={100}
    //     height={100}
    //     sizes="100vw"
    //     style={{ width: "100%", height: "auto" }}
    //     {...(props as ImageProps)}
    //   />
    // ),
    Spoiler,
    MagneticText: (props: any) => <MagneticText {...props} />,
    ...components,
  };
}
