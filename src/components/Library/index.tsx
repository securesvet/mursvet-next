'use client';

import { BookOpen, BookMarked } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: "reading" | "completed";
}

const books: Book[] = [
  {
    id: 1,
    title: "Handbook of Ellyptic and Hyperellyptic Curve Cryptography",
    author: "Henry Coven & Gerhard Frey",
    cover: "/images/handbook.png",
    status: "reading",
  },
];

export const Library = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {books.map((book) => (
        <>
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>

            <div className="flex items-center gap-2 mt-2">
              {book.status === "reading" ? (
                <BookOpen className="w-4 h-4 text-blue-600" />
              ) : (
                <BookMarked className="w-4 h-4 text-green-600" />
              )}
              <span
                className={
                  book.status === "reading"
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-green-600"
                }
              >
                {book.status === "reading" ? "Reading" : "Completed"}
              </span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
