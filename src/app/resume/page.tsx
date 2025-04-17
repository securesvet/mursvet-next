import { LayoutHeader } from "@/components/Header";
import ResumeMarkdown from "@/docs/resume.mdx";
import { MDXLayout } from "@/components/markdown";

const Resume = () => {
  return (
    <LayoutHeader>
      <h2 className="text-center text-2xl mb-2">Writeups</h2>
      <div className="text-center mb-6">
        <a href={"/resume.pdf"} className="hover:underline">Скачать PDF</a>
      </div>
      <div className="flex justify-center">
        <article className="prose prose-invert">
          <MDXLayout>
            <ResumeMarkdown />
          </MDXLayout>
        </article>
      </div>
    </LayoutHeader>
  );
};

export default Resume;
