import { LayoutHeader } from "@/components/Header";
// import resume from "/resume.md";
// import resumePDFurl from "/resume.pdf";

const Resume = () => {
  return (
    <LayoutHeader>
      <h2 className="text-center">Resume</h2>
      <div className="text-center mb-6">
        {/* <a href={resumePDFurl}>PDF</a> */}
      </div>
      <div className="flex justify-center">
        <article className="prose">
          {/* <Markdown>
            {resume}
          </Markdown> */}
        </article>
      </div>
    </LayoutHeader>
  );
};

export default Resume;
