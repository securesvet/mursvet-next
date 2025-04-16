import { LayoutHeader } from "@/components/Header";
import Link from "next/link";

function Writeups() {
    return (
        <LayoutHeader>
            <div className="max-w-3xl mx-auto">
                <h2 className="mb-6 text-center text-2xl">Writeups</h2>
                <nav className="flex flex-col gap-4">
                    <h1>No writeups here yet</h1>
                    {
                        /* {sortedWriteups.map((writeup) => (
              <Link
                key={writeup.id}
                to={`/writeups/${writeup.id}`}
                className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-900 transition"
              >
                <p className="text-sm text-gray-500">{writeup.birthtime}</p>
                <h3 className="text-xl font-semibold">{writeup.title}</h3>
                {writeup.description && (
                  <p className="text-sm text-gray-400">{writeup.description}</p>
                )}
                <p className="text-xs text-gray-500">{writeup.author}</p>
              </Link>
            ))} */
                    }
                </nav>
            </div>
        </LayoutHeader>
    );
}

export default Writeups;
