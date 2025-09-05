import { PokemonCard } from "@/components/pokemon-card";
import { Pokemon } from "@/types";
import Sidebar from "@/components/pokedex/sidebar/sidebar";
import {
  fetchPokemonByType,
  fetchPokemonDetails,
  getCompletePokemonList,
  sortPokemonById,
  sortPokemonByName,
} from "@/lib/pokeapi";
import Pagination from "@/components/pokedex/pagination";
import SortByDropdown from "@/components/pokedex/sortby-dropdown";

export default async function PokedexPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    type?: string;
    search?: string;
    sort_by?: string;
  }>;
}) {
  const params = await searchParams;
  const type = params.type;
  const search = params.search?.toLowerCase() || null;
  const sortBy = (params.sort_by === "name" ? "name" : "id") as "id" | "name";
  const currentPage = parseInt(params.page || "1", 10);
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  let pokemons: Pokemon[] = [];
  let total = 0;

  try {
    // fetch base list based on filter selected
    const baseList = type
      ? await fetchPokemonByType(type)
      : await getCompletePokemonList();
      
    // filter by search if any
    const filteredList = search
      ? baseList.filter((p) => p.name.toLowerCase().includes(search))
      : baseList;

    // sorting by name/id
    const sortedList =
      sortBy === "name"
        ? sortPokemonByName(filteredList)
        : sortPokemonById(filteredList);

    // paginate
    total = sortedList.length;
    const paginated = sortedList.slice(offset, offset + limit);

    // fetch full details for current page
    pokemons = await Promise.all(
      paginated.map(async (p) => fetchPokemonDetails(p.url))
    );
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }

  const totalPages = Math.ceil(total / limit);
  const start = offset + 1;
  const end = Math.min(offset + pokemons.length, total);

  return (
    <main className="content-grid pt-6 pb-12 bg-muted">
      <div className="flex gap-4">
        <Sidebar />
        <div className="flex-1 min-h-[calc(100dvh-82px)]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl">Pokédex</h1>
            <SortByDropdown />
          </div>
          {total === 0 ? (
            <p className="text-center text-lg text-gray-600">
              No results found
            </p>
          ) : (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
                {}
              </ul>
              <div className="flex mt-4 justify-between items-center">
                <div>
                  Showing <span className="font-bold">{start}</span> to{" "}
                  <span className="font-bold">{end}</span> of{" "}
                  <span className="font-bold">{total}</span> results
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  search={search ?? undefined}
                  type={type}
                  sortBy={sortBy}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
