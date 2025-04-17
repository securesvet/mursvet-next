import { getGithubFileMetaInfo } from "@/app/api/lib";
import { LayoutHeader } from "@/components/Header";
import { FaEdit } from "react-icons/fa";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { default: Markdown } = await import(`@/markdown/${slug}/index.mdx`);

    const markdownUrl =
        `https://github.com/securesvet/mursvet-next/edit/main/src/markdown/${slug}/index.mdx`;

    const { created, updated, author } = await getGithubFileMetaInfo(
        "securesvet",
        "mursvet-next",
        `src/markdown/${slug}/index.mdx`,
    );

    return (
        <LayoutHeader>
            <article className="prose prose-invert">
                <Markdown />
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
