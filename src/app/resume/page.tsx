import { LayoutHeader } from "@/components/Header";
import ResumeMarkdown from "@/../docs/resume.mdx";
// import resumePDFurl from "/resume.pdf";

const Resume = () => {
  return (
    <LayoutHeader>
      <h2 className="text-center text-2xl mb-2">Writeups</h2>
      <div className="text-center mb-6">
        <a href={"/resume.pdf"} className="hover:underline">Скачать PDF</a>
      </div>
      <div className="flex justify-center">
        <article className="prose prose-invert">
            <ResumeMarkdown />
        </article>
      </div>
    </LayoutHeader>
  );
};

function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white dark:prose-invert">
      {children}
    </div>
  );
}

export default Resume;
