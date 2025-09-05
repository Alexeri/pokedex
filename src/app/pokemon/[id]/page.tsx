import type { Metadata } from "next";
import { fetchPokemonDetails } from "@/lib/pokeapi";
import Image from "next/image";
import PokemonStats from "@/components/pokemon/pokemon-stats";
import PokemonInfo from "@/components/pokemon/pokemon-info";
import { typeColors } from "@/lib/utils";
import { notFound } from "next/navigation";
import { CircleQuestionMark } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchPokemonDetails(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  return {
    title: `${formattedName} | Pokédex`,
    description: `Detailed information about the Pokémon ${formattedName}.`,
  };
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchPokemonDetails(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100dvh-82px)] content-grid">
      <div className="flex flex-col gap-2 md:gap-4 mt-2 mb-2 md:mb-0">
        <div className="flex items-baseline justify-between">
          <h2 className="text-7xl capitalize">{data.name}</h2>
          <h3 className="text-4xl text-muted2">
            #{data.id.toString().padStart(3, "0")}
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="flex-1/2">
            <div
              className="bg-neutral-400 aspect-square flex justify-center items-center rounded-xl border-6"
              style={{
                backgroundColor: `${typeColors[data.types[0].type.name]}50`,
                borderColor: `${typeColors[data.types[0].type.name]}`,
              }}
            >
              {data.sprites.other.home.front_default ? (
                <Image
                  src={data.sprites.other.home.front_default}
                  alt={data.name}
                  width={300}
                  height={300}
                />
              ) : (
                <CircleQuestionMark size={100} />
              )}
            </div>
          </div>
          <div className="flex-1/2 flex flex-col gap-2">
            <PokemonInfo data={data} />
            <PokemonStats stats={data.stats} />
          </div>
        </div>
      </div>
    </main>
  );
}
