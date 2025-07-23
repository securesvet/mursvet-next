import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import React from 'react';
import MagneticText from '@/components/ui/MagneticText';
import Image, { ImageProps } from 'next/image';

const MarkdownComponents = ({ ...props }: MDXRemoteProps) => {
	return (
		<MDXRemote
			components={{
				// eslint-disable-next-line jsx-a11y/alt-text
				img: (props: ImageProps) => <Image {...props} />,
				MagneticText: (props: any) => <MagneticText {...props} />,
			}}
			{...props}
		/>
	);
};

export default MarkdownComponents;
