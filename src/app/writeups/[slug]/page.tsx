import { getGithubFileContents, getGithubFileMetaInfo } from "@/app/api/lib";
import { LayoutHeader } from "@/components/Header";
import { FaEdit } from "react-icons/fa";
import MarkdownComponents from "@/components/Markdown";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const markdownUrl =
        `https://github.com/securesvet/mursvet-next/edit/main/src/markdown/${slug}/index.mdx`;

    const { updated, author, created, contents } = await getGithubFileContents(
        "securesvet",
        "mursvet-next",
        `src/markdown/${slug}/index.mdx`,
    );

    return (
        <LayoutHeader>
            <article className="prose prose-invert px-10">
                <p className="text-sm">{created}</p>
                <MarkdownComponents
                    source={contents}
                />
            </article>
            <div className="text-primary">
                <div className="flex justify-end text-secondary">
                    {updated && author &&
                        (
                            <p className="text-sm">
                                Last edited on {updated} by <b>{author}</b>
                            </p>
                        )}
                </div>
                <a
                    className="hover:underline text-sm flex justify-end items-center gap-1"
                    href={markdownUrl}
                >
                    <FaEdit />
                    Edit
                </a>
            </div>
        </LayoutHeader>
    );
}
