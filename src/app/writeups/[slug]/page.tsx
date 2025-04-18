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
        const files = fs.readdirSync(path.join( process.cwd() + "/src/docs/" + slug));
        console.log(files)
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

    // If there is no such fields, then updated and author are undefined
    const { created, updated, author } = frontmatter || {};

    const markdownUrl =
        `https://github.com/securesvet/mursvet-next/edit/main/src/docs/${slug}/index.mdx`;

    return (
        <LayoutHeader>
            <div className="max-w-screen md:px-40 lg:px-70">
                <p className="text-sm text-gray-400">
                    {created}
                </p>
                <MDXLayout>
                    <Markdown />
                </MDXLayout>
                <div className="text-primary mt-5">
                    <div className="flex justify-end text-secondary flex-wrap">
                        {updated &&
                            (
                                <p className="text-sm">
                                    Last edited on {updated}
                                </p>
                            )}
                    </div>
                    <Edit markdownUrl={markdownUrl} />
                </div>
                {author && (
                    <div className="text-secondary text-sm flex justify-end">
                        by {author}
                    </div>
                )}
            </div>
        </LayoutHeader>
    );
}

const Edit = ({ markdownUrl }: { markdownUrl: string }) => {
    return (
        <a
            className="hover:underline text-sm flex justify-end items-center gap-1"
            href={markdownUrl}
        >
            <FaEdit />
            Edit
        </a>
    );
};
