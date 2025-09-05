"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PokemonListItem } from "@/types";



export default function SearchDialog({
  allPokemon,
}: {
  allPokemon: PokemonListItem[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // debounced search
  const runSearch = useDebouncedCallback((value: string) => {
    if (!value.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const filtered = allPokemon
      .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));

    setResults(filtered.slice(0, 20));
    setIsLoading(false);
  }, 400);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setIsLoading(true);
    runSearch(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="basis-1/3 items-center gap-2 px-3 py-2 rounded-md border cursor-pointer text-gray-500 hidden md:flex">
          <Search size={16} />
          <span>Search Pokémon...</span>
        </div>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-xl w-full p-0 [&>button]:hidden gap-0"
        aria-describedby={undefined}
      >
        <DialogTitle asChild>
          <Input
            startIcon={Search}
            clearInputIcon={X}
            value={query}
            autoFocus
            placeholder="Search for a Pokémon..."
            onChange={(e) => handleSearchChange(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            onClear={() => {
              setQuery("");
              setResults([]);
            }}
            className="h-10 md:text-[16px] font-normal placeholder:text-gray-800 text-gray-950"
          />
        </DialogTitle>
        {query.length > 0 && (
          <ScrollArea className="max-h-80">
            {isLoading ? (
              // show loading state
              <div className="p-2 text-center text-gray-500">Loading...</div>
            ) : results.length > 0 ? (
              // show results if any
              <ul className="p-2 space-y-1">
                {results.map((p) => (
                  <li key={p.name}>
                    <Link
                      href={`/pokemon/${p.name}`}
                      className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded capitalize"
                      onClick={() => setOpen(false)}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.url
                          .split("/")
                          .filter(Boolean)
                          .pop()}.png`}
                        alt=""
                        width={20}
                        height={20}
                        className="w-7 h-7 object-cover"
                      />
                      <span>{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              // show no results
              <div className="p-2 text-center text-gray-500">
                No results found
              </div>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
