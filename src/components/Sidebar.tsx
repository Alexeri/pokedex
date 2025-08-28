"use client";

import { useCallback, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { typeColors } from "@/utils/pokemon-colors";
import { useRouter, useSearchParams } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { Search, X } from "lucide-react";
import { buildPokedexUrl } from "@/lib/pokeapi";

const allTypes = Object.keys(typeColors);

export default function Sidebar() {
  const router = useRouter();
  const loader = useTopLoader();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || null;
  const initialSearch = searchParams.get("search") || "";

  const [selectedType, setSelectedType] = useState<string | null>(initialType);
  const [search, setSearch] = useState(initialSearch);
  const hasUserTyped = useRef(false); // track if user has typed in search input to prevent "snapback"

  // updates url with current search/type values and triggers loader
  const updateUrl = useCallback((searchVal?: string, typeVal?: string | null) => {
    loader.start();
    const targetUrl = buildPokedexUrl({ search: searchVal, type: typeVal });
    if (targetUrl !== window.location.pathname + window.location.search) {
      router.push(targetUrl);
    }
  }, [loader, router]);

  // update url when selected type changes
  const handleTypeChange = useCallback((type: string) => {
    const newType = selectedType === type ? null : type;
    setSelectedType(newType);
    updateUrl(search, newType);
  }, [selectedType, search, updateUrl]);

  // debounced search handler to reduce api calls
  const debouncedSearch = useDebouncedCallback((query: string) => {
    updateUrl(query, selectedType);
  }, 500);

  // handle search input, updates state and triggers debounced search
  const handleSearchChange = (value: string) => {
    hasUserTyped.current = true;
    setSearch(value);
    debouncedSearch(value);
  };

  // clear search input and reset url
  const handleClear = useCallback(() => {
    setSearch("");
    updateUrl("", selectedType);
  }, [selectedType, updateUrl]);

  return (
    <aside className="w-64 bg-neutral-200/60 p-4 rounded-lg top-[88px] h-[calc(100vh-88px-18px)] sticky hidden md:flex flex-col gap-4">
      <Input
        placeholder="Search in the Pokedex..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        startIcon={Search}
        clearInputIcon={X}
        onClear={handleClear}
        className="bg-white pl-9 md:text-[16px]"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl">Filter by Type</h2>

        <ul className="space-y-2">
          {allTypes.map((type) => (
            <li key={type}>
              <label
                htmlFor={type}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  id={type}
                  checked={selectedType === type}
                  onCheckedChange={() => handleTypeChange(type)}
                  className="border-gray-400/80 cursor-pointer data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
                />
                <span
                  className={`w-3 h-3 rounded-full`}
                  style={{
                    backgroundColor: `${typeColors[type]}`,
                  }}
                ></span>
                <span className="capitalize">{type}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

