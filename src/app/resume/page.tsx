import { LayoutHeader } from "@/components/Header";
import { MDXLayout } from "@/components/markdown";

const Resume = () => {
  return (
    <LayoutHeader>
      <h2 className="text-center text-2xl mb-2">Resume</h2>
      <div className="text-center mb-6">
        <a href={"/resume.pdf"} className="hover:underline">
          Скачать PDF
        </a>
      </div>
    </LayoutHeader>
  );
};

export default Resume;
