export function MDXLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="prose prose-invert prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white max-w-full prose-td:px-2 prose-td:py-1 prose-tr:break-all wrap-break-word prose-pre:bg-transparent">
      {children}
    </div>
  );
}
