"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildPokedexUrl } from "@/lib/pokeapi";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions: { value: "id" | "name"; label: string }[] = [
  { value: "id", label: "Number" },
  { value: "name", label: "Name" },
];

export default function SortByDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawSort = searchParams.get("sort_by");
  const currentSort: "id" | "name" = rawSort === "name" ? "name" : "id";
  const currentType = searchParams.get("type") || null;
  const currentSearch = searchParams.get("search") || "";

  const handleSortChange = (sortBy: "id" | "name") => {
    router.push(
      buildPokedexUrl({
        search: currentSearch,
        type: currentType,
        page: "1", // reset page when sorting
        sortBy,
      })
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between px-4 py-1 rounded w-32 bg-sidebar border-[1px] cursor-pointer hover:bg-sidebar-accent transition-colors">
        {currentSort === "id" ? "Number" : "Name"}
        <ChevronDown size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={cn(
              "cursor-pointer flex justify-between",
              option.value === currentSort &&
                "bg-neutral-200 focus:bg-neutral-200"
            )}
          >
            <span>{option.label}</span>
            <span>{option.value === currentSort && <Check />}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
