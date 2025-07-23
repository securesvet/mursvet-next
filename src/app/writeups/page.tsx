import { LayoutHeader } from "@/components/Header";
import WriteupsList, { FrontmatterType } from "./WriteupsList";
import fs from "fs";
import path from "path";

const MARKDOWN_FOLDER = "src/docs";

function parseEuropeanDate(dateStr: string): number {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export default async function WriteupsPage() {
  const dirs = fs
    .readdirSync(MARKDOWN_FOLDER, { withFileTypes: true })
    .filter((dir) => dir.isDirectory());

  const writeups: { name: string; frontmatter: FrontmatterType }[] = [];
  for (const dir of dirs) {
    const folderPath = path.join(MARKDOWN_FOLDER, dir.name);
    const files = fs.readdirSync(folderPath);
    const mdFile = files.find((f) => ["index.mdx", "index.md"].includes(f));
    if (!mdFile) {
      continue;
    }
    const { frontmatter } = await import(`@/docs/${dir.name}/${mdFile}`);
    writeups.push({
      name: dir.name,
      frontmatter,
    });
  }

  return (
    <LayoutHeader>
      <WriteupsList writeups={writeups} />
    </LayoutHeader>
  );
}
