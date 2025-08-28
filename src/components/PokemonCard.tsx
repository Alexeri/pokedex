import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { typeColors } from "@/utils/pokemon-colors";
import type { Pokemon } from "@/types";
import { CircleQuestionMark } from "lucide-react";

interface PokemonCardProps {
  pokemon: Pokemon;
  wantedStats?: string[]; // defaults to hp/attack/defense
}

export function PokemonCard({
  pokemon,
  wantedStats = ["hp", "attack", "defense"],
}: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Card className="hover:scale-[1.02]  border-blue-800 border-6 bg-blue-50 gap-2 transition-all">
        <CardHeader className="">
          <div
            className={` w-2/3 aspect-square rounded-full border-4 overflow-hidden mx-auto p-2 bg-white flex justify-center items-center`}
            style={{
              borderColor: `${typeColors[pokemon.types[0].type.name]}`,
            }}
          >
            {pokemon.sprites.front_default ? (
              <Image
                src={pokemon.sprites.front_default}
                className="w-full h-full object-cover"
                alt={pokemon.name}
                width={200}
                height={200}
              />
            ) : (
              <CircleQuestionMark size={50} color="#ccc" />
            )}
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex items-center flex-col mb-4 w-full">
            <p
              className="px-2 rounded-3xl capitalize font-bold text-neutral-700"
              style={{
                backgroundColor: `${typeColors[pokemon.types[0].type.name]}50`,
              }}
            >
              #{pokemon.id}
            </p>
            <p className="capitalize font-jersey text-4xl text-center truncate w-full">
              {pokemon.name}
            </p>
            <ul className="flex items-center gap-2 mt-2">
              {pokemon.types.map((type) => (
                <li
                  key={type.type.name}
                  className={`px-2.5 py-0.5 rounded-3xl capitalize font-bold text-white`}
                  style={{
                    backgroundColor: `${typeColors[type.type.name]}`,
                  }}
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            {pokemon.stats
              .filter((stat) => wantedStats.includes(stat.stat.name))
              .map((stat) => (
                <div
                  key={stat.stat.name}
                  className="flex justify-between font-bold capitalize"
                >
                  <span>{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
