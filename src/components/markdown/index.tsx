export function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg max-w-full prose-td:px-2 prose-td:py-1 prose-tr:break-all wrap-break-word prose-pre:bg-transparent">
      {children}
    </div>
  );
}
