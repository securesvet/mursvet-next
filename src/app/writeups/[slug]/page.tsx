import { LayoutHeader } from "@/components/Header";
import { FaEdit } from "react-icons/fa";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { default: Markdown } = await import(`@/markdown/${slug}/index.mdx`);

    return (
        <LayoutHeader>
            <Markdown />
        </LayoutHeader>
    );
}

// const Post = (
//     { name, title, content, birthtime, lastEdited, author }: {
//         name: string;
//         title: string;
//         content: string;
//         birthtime: string;
//         lastEdited: string;
//         author: string;
//     },
// ) => {
//     <LayoutHeader>
//         <div className="p-6 max-w-4xl mx-auto">
//             <h1>{title}</h1>
//             <p className="text-sm text-gray-400">{birthtime}</p>
//             <div className="prose dark:prose-invert">
//                 {content}
//             </div>
//             <div className="flex w-full justify-end">
//                 <div className="flex flex-col gap-2">
//                     {lastEdited && author &&
//                         (
//                             <p className="text-sm text-gray-400">
//                                 Last edited on {lastEdited} by {author}
//                             </p>
//                         )}
//                     <a
//                         className="hover:underline text-sm text-gray-400 flex justify-end items-center gap-1"
//                         href={`https://github.com/securesvet/writeups/edit/main/docs/${name}/index.md`}
//                     >
//                         <FaEdit className="text-gray-400" />
//                         Edit
//                     </a>
//                 </div>
//             </div>
//         </div>
//     </LayoutHeader>;
// };
