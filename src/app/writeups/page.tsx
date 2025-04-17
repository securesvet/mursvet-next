import { LayoutHeader } from "@/components/Header";
import Link from "next/link";
import { getGithubMarkdownFoldersWithFiles, type FolderWithMarkdown } from "@/app/api/lib";

async function Writeups() {
    const data = await getGithubMarkdownFoldersWithFiles("securesvet", "mursvet-next")

    return (
        <LayoutHeader>
            <div className="max-w-3xl mx-auto">
                <h2 className="mb-6 text-center text-2xl">Writeups</h2>
                <nav className="flex flex-col gap-4">
                    {data.map((writeup, index) => (
                        <Link
                            key={`${index}-${writeup.folder}`}
                            href={`/writeups/${writeup.folder}`}
                            className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-900 transition"
                        >
                            <p className="text-sm text-gray-500">
                                {writeup.created}
                            </p>
                            <h3 className="text-xl font-semibold">
                                {writeup.folder}
                            </h3>
                        </Link>
                    ))}
                </nav>
            </div>
        </LayoutHeader>
    );
}

export default Writeups;
