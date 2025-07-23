import { NextRequest } from "next/server";
import { getGithubMarkdownFoldersWithFiles } from "@/app/api/lib";

const GIT_USERNAME = process.env.GIT_USERNAME!;
const GIT_REPO = process.env.GIT_REPO!;

export async function GET(request: NextRequest) {
  const projects = await getGithubMarkdownFoldersWithFiles(
    GIT_USERNAME,
    GIT_REPO,
  );

  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
