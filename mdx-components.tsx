import MagneticText from "@/components/ui/MagneticText";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";

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
    code: (props: any) => <code {...props} />,
    MagneticText: (props: any) => <MagneticText {...props} />,
    ...components,
  };
}

function Code({ children, className, ...rest }: any) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1] || '';

  const codeString = typeof children === 'string' ? children.trim() : '';

  return match ? (
    <SyntaxHighlighter language={language} PreTag="div" {...rest}>
      {codeString}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...rest}>
      {children}
    </code>
  );
}
