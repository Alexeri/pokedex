import { Pokemon } from "@/types";
import { PokemonCard } from "@/components/pokemon-card";
import { fetchPokemonDetails, getCompletePokemonList } from "@/lib/pokeapi";
import DiceButton from "@/components/dice-button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getRandomPokemons(
  allPokemon: { name: string; url: string }[],
  count: number
): Promise<Pokemon[]> {
  const shuffled = allPokemon.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  // fetch full details in parallel
  const pokemons = await Promise.all(
    selected.map((p) => fetchPokemonDetails(p.url))
  );

  return pokemons;
}

export default async function Home() {
  const allPokemon = await getCompletePokemonList();
  const pokemons = await getRandomPokemons(allPokemon, 5);

  return (
    <main className="content-grid">
      <section className="flex flex-col items-center  bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-16 full-width">
        <h1 className="text-center mt-14 text-8xl font-extrabold gradient-text">
          Gotta catch &apos;em all!
        </h1>
        <p className="text-center text-white text-xl">
          Discover, search and explore the amazing world of Pokémon. Find
          <br /> your favourite and learn about their stats.
        </p>
        <div className="flex justify-center">
          <DiceButton allPokemon={allPokemon} />
        </div>
      </section>
      <section className="bg-linear-to-r from-pink-50/50 to-pink-100/50 full-width">
        <div className="flex flex-col gap-12 py-20 ">
          <h3 className="text-center text-5xl">Featured Pokémon</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <Link href="/pokedex" className="flex items-center gap-1 self-end hover:bg-neutral-200 px-2 py-1 rounded transition">
            <span>View all Pokémon</span> <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
