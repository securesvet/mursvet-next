import { LayoutHeader } from "@/components/Header";
import { FaEdit } from "react-icons/fa";
import { MDXLayout } from "@/components/markdown";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { default: Markdown } = await import(
        `@/docs/${slug}/index.mdx`
    );

    const markdownUrl =
        `https://github.com/securesvet/mursvet-next/edit/main/src/docs/${slug}/index.mdx`;

    // const { updated, author, created, contents } = await getGithubFileContents(
    //     "securesvet",
    //     `docs/${slug}/index.mdx`,
    // );

    return (
        <LayoutHeader>
            <div className="max-w-screen ">
                <div className="flex justify-center">
                    <MDXLayout>
                        {/* <p className="text-sm">{created}</p> */}
                        <Markdown />
                    </MDXLayout>
                </div>
                <div className="text-primary mt-5">
                    <div className="flex justify-end text-secondary flex-wrap">
                        {
                            /* {updated && author &&
                        (
                            <p className="text-sm">
                                Last edited on {updated} by <b>{author}</b>
                            </p>
                        )} */
                        }
                    </div>
                    <a
                        className="hover:underline text-sm flex justify-end items-center gap-1"
                        href={markdownUrl}
                    >
                        <FaEdit />
                        Edit
                    </a>
                </div>
            </div>
        </LayoutHeader>
    );
}
