import { NextRequest } from "next/server";
import { getGithubFileContents } from "@/app/api/lib";

const MARKDOWN_PATH = "src/markdown";
const GIT_USERNAME = process.env.GIT_USERNAME!;
const GIT_REPO = process.env.GIT_REPO!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const param = await params;
  const [directoryName, fileName] = param.slug;
  let res;

  try {
    res = await getGithubFileContents(
      GIT_USERNAME,
      GIT_REPO,
      `${MARKDOWN_PATH}/${directoryName}/${fileName}`,
    );
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
