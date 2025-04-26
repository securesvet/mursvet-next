import { LayoutHeader } from "@/components/Header";
import { FaEdit } from "react-icons/fa";
import { MDXLayout } from "@/components/markdown";
import fs from "fs";
import path from "path";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let mdFile;
    try {
        const files = fs.readdirSync(
            path.join(process.cwd() + "/src/docs/" + slug),
        );
        console.log(files);
        mdFile = files.find((f) => ["index.mdx", "index.md"].includes(f));
    } catch (e) {
        return (
            <LayoutHeader>
                <div className="max-w-screen md:px-40 lg:px-70">
                    <h1>There is no such writeup :\</h1>
                </div>
            </LayoutHeader>
        );
    }

    const { default: Markdown, frontmatter } = await import(
        `@/docs/${slug}/${mdFile}`
    );

    const markdownUrl =
        `https://github.com/securesvet/mursvet-next/edit/main/src/docs/${slug}/index.mdx`;

    return (
        <LayoutHeader>
            <div className="flex justify-center items-center">
                <div className="max-w-[700px] w-full">
                    <p className="text-sm text-gray-400">
                        {frontmatter.created}
                    </p>
                    <MDXLayout>
                        <Markdown />
                    </MDXLayout>
                    <div className="text-primary mt-5">
                        <div className="flex justify-end text-secondary flex-wrap">
                            {frontmatter.updated &&
                                (
                                    <p className="text-sm">
                                        Last edited on {frontmatter.updated}
                                    </p>
                                )}
                            <Edit markdownUrl={markdownUrl} />
                        </div>
                    </div>
                    <div className="text-secondary text-sm flex justify-end">
                        by {frontmatter.author}
                    </div>
                </div>
            </div>
        </LayoutHeader>
    );
}

const Edit = ({ markdownUrl }: { markdownUrl: string }) => {
    return (
        <div className="w-fit">
            <a
                className="hover:underline text-sm flex justify-end items-center gap-1"
                href={markdownUrl}
            >
                <FaEdit />
                Edit
            </a>
        </div>
    );
};
