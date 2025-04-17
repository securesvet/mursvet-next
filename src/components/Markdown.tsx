import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import MagneticText from "./ui/MagneticText";
import Image, { ImageProps } from "next/image";

const Markdown = ({ ...props }: MDXRemoteProps) => {
    return (
        <MDXRemote
            components={{
                img: (props: ImageProps) => <Image {...props} />,
                MagneticText: (props: any) => <MagneticText {...props} />,
            }}
            {...props}
        />
    );
};

export default Markdown;
