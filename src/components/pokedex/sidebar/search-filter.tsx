"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchFilterProps {
  search: string;
  handleChange: (value: string) => void;
  handleClear: () => void;
}
export function SearchFilter({
  search,
  handleChange,
  handleClear,
}: SearchFilterProps) {
  return (
    <Input
      placeholder="Search in the Pokedex..."
      value={search}
      onChange={(e) => handleChange(e.target.value)}
      startIcon={Search}
      clearInputIcon={X}
      onClear={handleClear}
      className="bg-white pl-9 md:text-[16px]"
      spellCheck={false}
      autoComplete="off"
    />
  );
}
