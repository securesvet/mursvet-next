"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type FrontmatterType = {
  title: string;
  description: string;
  tags: string[];
  created: string;
  updated: string;
  author: string;
};

function parseEuropeanDate(dateStr: string): number {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

const Badge = ({ text, className }: { text: string; className?: string }) => (
  <div className={`rounded-xl px-2 py-1 w-fit font-bold ${className}`}>
    <p>{text}</p>
  </div>
);

const Badges = ({ tag, className }: { tag: string; className?: string }) => {
  const badgeStyles: Record<string, string> = {
    all: "bg-gray-500",
    medium: "bg-orange-500",
    easy: "bg-green-500",
    hard: "bg-red-500",
  };

  if (badgeStyles[tag]) {
    return (
      <Badge
        text={tag.charAt(0).toUpperCase() + tag.slice(1)}
        className={`${badgeStyles[tag]} ${className}`}
      />
    );
  }

  return null;
};
export default function WriteupsList({
  writeups,
}: {
  writeups: { name: string; frontmatter: FrontmatterType }[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "easy" | "medium" | "hard"
  >("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredWriteups = useMemo(() => {
    return writeups
      .filter((writeup) => {
        if (selectedDifficulty !== "all") {
          return writeup.frontmatter.tags?.includes(selectedDifficulty);
        }
        return true;
      })
      .filter((writeup) => {
        return writeup.frontmatter.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        const dateA = parseEuropeanDate(a.frontmatter.created);
        const dateB = parseEuropeanDate(b.frontmatter.created);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [searchQuery, selectedDifficulty, sortOrder, writeups]);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="mb-6 text-center text-2xl">Writeups</h2>

      {/* Фильтры */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border-2 p-2 rounded-lg "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          {["all", "easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level as unknown as any)}
              className="hover:cursor-pointer"
            >
              <Badges
                tag={level}
                className={selectedDifficulty === level ? "border-2" : ""}
              />
            </button>
          ))}
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        {filteredWriteups.map((writeup, index) => (
          <Link
            key={`${index}-${writeup.name}`}
            href={`/writeups/${writeup.name}`}
            className="block rounded-lg border p-4 transition"
          >
            <p className="text-sm">
              {writeup.frontmatter?.created}
            </p>
            <h3 className="text-xl font-semibold py-2">
              {writeup.frontmatter?.title || writeup.name}
            </h3>
            <div className="flex gap-2 mb-2">
              {writeup.frontmatter.tags?.map((tag, index) => (
                <Badges key={`${index}-${tag}`} tag={tag.toLowerCase()} />
              ))}
            </div>
            <p className="text-sm text-gray-400">
              {writeup.frontmatter?.description}
            </p>
          </Link>
        ))}
      </nav>
    </div>
  );
}
