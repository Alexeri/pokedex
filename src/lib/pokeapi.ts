import { Pokemon, PokemonListItem } from "@/types";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";
const POKEAPI_LIMIT = 1025;

// cache complete pokémon list
let cachedPokemonList: { name: string; url: string }[] | null = null;

export async function getCompletePokemonList(): Promise<
  { name: string; url: string }[]
> {
  if (cachedPokemonList) {
    return cachedPokemonList;
  }

  const res = await fetch(
    `${POKEAPI_BASE}/pokemon?limit=${POKEAPI_LIMIT}&offset=0`,
    {
      next: { revalidate: 86400 }, // cache for 24 hours
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Pokémon list");

  const data = await res.json();
  cachedPokemonList = data.results;
  return cachedPokemonList as { name: string; url: string }[];
}

// fetch full details for a single pokémon
export async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const res = await fetch(url, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) throw new Error("Failed to fetch Pokémon details");
  return res.json();
}

// fetch list of pokémon by type
export async function fetchPokemonByType(type: string) {
  const res = await fetch(`${POKEAPI_BASE}/type/${type.toLowerCase()}`, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) throw new Error(`Type ${type} not found`);

  const data = await res.json();

  const filtered = data.pokemon
    .map((p: { pokemon: PokemonListItem }) => p.pokemon)
    .filter(
      (p: PokemonListItem) => getPokemonIdFromUrl(p.url) <= POKEAPI_LIMIT
    );

  return sortPokemonById(filtered);
}

// extract id from url
export function getPokemonIdFromUrl(url: string): number {
  return parseInt(url.split("/").filter(Boolean).pop()!);
}

// sort list of pokémon by id
export function sortPokemonById(list: PokemonListItem[]): PokemonListItem[] {
  return [...list].sort(
    (a, b) => getPokemonIdFromUrl(a.url) - getPokemonIdFromUrl(b.url)
  );
}

export function sortPokemonByName(list: PokemonListItem[]): PokemonListItem[] {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
}

// build pokedex url with query params
export function buildPokedexUrl({
  search,
  type,
  page = "1",
  sortBy,
}: {
  search?: string;
  type?: string | null;
  page?: string;
  sortBy?: "id" | "name";
}) {
  const params = new URLSearchParams();
  if (search?.trim()) params.set("search", search.trim().toLowerCase());
  if (type) params.set("type", type);
  if (sortBy && sortBy !== "id") params.set("sort_by", sortBy);
  params.set("page", page);

  return params.toString() ? `/pokedex?${params.toString()}` : "/pokedex";
}
