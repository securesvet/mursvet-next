import { LayoutHeader } from "@/components/Header";
import Link from "next/link";
import fs from "fs";
import path from "path";

const MARKDOWN_FOLDER = "src/docs";
const dirs = fs.readdirSync(MARKDOWN_FOLDER, { withFileTypes: true }).filter(
    (dir) => dir.isDirectory(),
);

const writeups: { name: string; frontmatter: Record<string, string> }[] = [];
for (const dir of dirs) {
    const folderPath = path.join(MARKDOWN_FOLDER, dir.name);
    const files = fs.readdirSync(folderPath);
    const mdFile = files.find((f) => ["index.mdx", "index.md"].includes(f));
    if (!mdFile) {
        continue;
    }
    const { frontmatter } = await import(
        "@/docs/" + dir.name + "/" + mdFile
    );
    writeups.push({
        name: dir.name,
        frontmatter,
    });
}

function Writeups() {
    const sortedWriteupsByDate = writeups.sort((a, b) => {
        return (
            new Date(b.frontmatter?.created || "").getTime() -
            new Date(a.frontmatter?.created || "").getTime() 
        );
    })

    console.log(sortedWriteupsByDate);
    return (
        <LayoutHeader>
            <div className="max-w-3xl mx-auto">
                <h2 className="mb-6 text-center text-2xl">Writeups</h2>
                <nav className="flex flex-col gap-4">
                    {sortedWriteupsByDate.map((writeup, index) => (
                        <Link
                            key={`${index}-${writeup.name}`}
                            href={`/writeups/${writeup.name}`}
                            className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-900 transition"
                        >
                            <p className="text-sm text-gray-400">
                                {writeup.frontmatter?.created}
                            </p>
                            <h3 className="text-xl font-semibold">
                                {writeup.frontmatter?.title || writeup.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {writeup.frontmatter?.description}
                            </p>
                        </Link>
                    ))}
                </nav>
            </div>
        </LayoutHeader>
    );
}

export default Writeups;
