import { buildPokedexUrl } from "@/lib/pokeapi";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search?: string;
  type?: string | null;
  sortBy?: "id" | "name";
}

export default function Pagination({
  currentPage,
  totalPages,
  search,
  type,
  sortBy = "id",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <nav className="flex gap-2">
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-3 py-1">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildPokedexUrl({
              search,
              type,
              page: p.toString(),
              sortBy,
            })}
            className={cn(
              "px-3 py-1 rounded transition-colors",
              p === currentPage
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            )}
          >
            {p}
          </Link>
        )
      )}
    </nav>
  );
}

function getPaginationPages(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  // how many pages around current page to show
  const delta = 2; 

  // always show first 3
  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pages.push(i);
  }

  // ellipsis if current page is far from first pages
  if (currentPage > 5) {
    pages.push("ellipsis");
  }

  // pages around current page
  for (
    let i = Math.max(4, currentPage - delta);
    i <= Math.min(totalPages - 3, currentPage + delta);
    i++
  ) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // ellipsis before last pages
  if (currentPage < totalPages - 4) {
    pages.push("ellipsis");
  }

  // always show last 3 pages
  for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  return pages;
}