import { LayoutHeader } from "@/components/Header";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { JSX } from "react";

function parseEuropeanDate(dateStr: string): number {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day).getTime();
}

const Badge = ({ text, className }: { text: string; className?: string }) => {
    return (
        <div className={`rounded-xl px-2 py-1 w-fit font-bold ${className}`}>
            <p>{text}</p>
        </div>
    );
};

export type FrontmatterType = {
    title: string;
    description: string;
    tags: string[];
    created: string;
    updated: string;
    author: string;
};

const MARKDOWN_FOLDER = "src/docs";
const dirs = fs.readdirSync(MARKDOWN_FOLDER, { withFileTypes: true }).filter(
    (dir) => dir.isDirectory(),
);

const writeups: { name: string; frontmatter: FrontmatterType }[] = [];
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

const BADGES: Record<string, JSX.Element> = {
    medium: <Badge text="Medium" className="bg-orange-500" />,
};

function Writeups() {
    const sortedWriteupsByDate = writeups.sort((a, b) => {
        const dateA = parseEuropeanDate(a.frontmatter?.created || "");
        const dateB = parseEuropeanDate(b.frontmatter?.created || "");
        return dateB - dateA;
    });

    console.log(sortedWriteupsByDate)

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
                            <h3 className="text-xl font-semibold py-2">
                                {writeup.frontmatter?.title || writeup.name}
                            </h3>
                            <div>
                                {writeup.frontmatter.tags?.map((tag, index) => (
                                    <Badges key={`${index}-${tag}`} tag={tag.toLowerCase()} />
                                ))}
                            </div>
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

const Badges = ({ tag }: { tag: string }) => {
    switch (tag) {
        case "medium":
            return (
                <Badge
                    text="Medium"
                    className="bg-orange-500"
                />
            );
        case "easy":
            return (
                <Badge
                    text="Easy"
                    className="bg-green-500"
                />
            );
    }
};

export default Writeups;
