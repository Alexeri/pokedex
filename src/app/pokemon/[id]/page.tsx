import { PokemonCard } from "@/components/PokemonCard";
import { fetchPokemonDetails } from "@/lib/pokeapi";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return (
    <div className="min-h-[calc(100dvh-82px)] content-grid">
      <div className="w-80 mt-5">
        <PokemonCard pokemon={data} />
      </div>
    </div>
  );
}
