"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useDebouncedCallback } from "use-debounce";
import { buildPokedexUrl } from "@/lib/pokeapi";
import { SearchFilter } from "@/components/pokedex/sidebar/search-filter";
import TypeFilter from "@/components/pokedex/sidebar/type-filter";
import { FunnelX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const router = useRouter();
  const loader = useTopLoader();
  const searchParams = useSearchParams();

  const initialType = searchParams.get("type") || null;
  const initialSearch = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort_by") === "name" ? "name" : "id";

  const [selectedType, setSelectedType] = useState<string | null>(initialType);
  const [search, setSearch] = useState(initialSearch);
  const hasUserTyped = useRef(false); // track if user has typed in search input to prevent "snapback"

  // keep state in sync with url
  useEffect(() => {
    setSelectedType(initialType);
  }, [initialType]);

  useEffect(() => {
    hasUserTyped.current = false;
    setSearch(initialSearch);
  }, [initialSearch]);

  // updates url with current search/type values and triggers loader
  const updateUrl = useCallback(
    (searchVal?: string, typeVal?: string | null) => {
      loader.start();
      const targetUrl = buildPokedexUrl({
        search: searchVal,
        type: typeVal,
        sortBy,
      });
      if (targetUrl !== window.location.pathname + window.location.search) {
        router.push(targetUrl);
      }
    },
    [loader, router, sortBy]
  );

  // update url when selected type changes
  const handleTypeChange = useCallback(
    (type: string) => {
      const newType = selectedType === type ? null : type;
      setSelectedType(newType);
      updateUrl(search, newType);
    },
    [selectedType, search, updateUrl]
  );

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

  const handleResetFilters = useCallback(() => {
    // reset state
    setSearch("");
    setSelectedType(null);

    // navigate to root /pokedex with no search params, page 1
    loader.start();
    router.push("/pokedex");
  }, [router, loader]);

  return (
    <aside className="w-64 bg-sidebar rounded-lg top-[88px] h-[calc(100vh-88px-18px)] sticky hidden md:flex flex-col gap-4 border-[1px]">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-4">
        <SearchFilter
          search={search}
          handleChange={handleSearchChange}
          handleClear={handleClear}
        />
        <TypeFilter
          selectedType={selectedType}
          handleChange={handleTypeChange}
        />
      </div>

      {(search || selectedType || sortBy !== "id") && (
        <Button
          className="mx-4 mb-4 bg-red-200 text-black border-[1px] border-neutral-900/20 cursor-pointer hover:bg-red-300/80 transition-all"
          onClick={handleResetFilters}
        >
          <FunnelX />
          Reset All Filters
        </Button>
      )}
    </aside>
  );
}
