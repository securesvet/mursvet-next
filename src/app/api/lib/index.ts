const MARKDOWN_PATH = "src/markdown";
const TOKEN = process.env.GIT_TOKEN;
const HEADERS = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
};

export type FolderWithMarkdown = {
    folder: string;
    isMDX: boolean;
} & MetaInfo;

type MetaInfo = {
    created: string;
    updated: string;
    author: string;
};

export async function getGithubMarkdownFoldersWithFiles(
    owner: string,
    repo: string,
): Promise<
    FolderWithMarkdown[]
> {
    const url =
        `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const res = await fetch(url, { headers: HEADERS });

    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.statusText}`);
    }

    const data = await res.json();

    const filename = "index";

    // Only markdown/mdx files inside src/markdown
    const markdownFiles = data.tree.filter((item: any) =>
        item.path.startsWith(`${MARKDOWN_PATH}/`) &&
        item.type === "blob" &&
        (item.path.endsWith(`/${filename}.md`) ||
            item.path.endsWith(`/${filename}.mdx`))
    );

    const folders: FolderWithMarkdown[] = [];

    for (const file of markdownFiles) {
        const metaInfo = await getGithubFileMetaInfo(owner, repo, file.path);
        const directoryAndIndexPath = file.path.replace(
            `${MARKDOWN_PATH}/`,
            "",
        );
        const isMDX = directoryAndIndexPath.endsWith(".mdx");
        const parts = directoryAndIndexPath.split("/");
        const folderName = parts[0];

        folders.push({
            folder: folderName,
            isMDX,
            ...metaInfo,
        });
    }

    return folders;
}

export async function getGithubFileContents(
    owner: string,
    repo: string,
    path: string,
): Promise<{ contents: string } & MetaInfo> {
    const url =
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
        throw new Error(`GitHub API error for ${path}: ${res.statusText}`);
    }
    const data = await res.json();
    const metaInfo = await getGithubFileMetaInfo(owner, repo, path);
    return {
        contents: Buffer.from(data.content, "base64").toString(),
        ...metaInfo,
    };
}

export async function getGithubFileMetaInfo(
    owner: string,
    repo: string,
    path: string,
): Promise<{ created: string; updated: string; author: string }> {
    const url =
        `https://api.github.com/repos/${owner}/${repo}/commits?path=${path}`;

    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
        throw new Error(`GitHub API error for ${path}: ${res.statusText}`);
    }

    const commits = await res.json();

    const created = commits.at(-1)?.commit?.author?.date ?? "";
    const updated = commits[0]?.commit?.author?.date ?? "";
    const author = commits[0]?.commit?.author?.name ?? "";

    return {
        created: new Date(created).toDateString(),
        updated: new Date(updated).toDateString(),
        author,
    };
}
