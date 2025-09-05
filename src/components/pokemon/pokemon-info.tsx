import { typeColors } from "@/lib/utils";
import { Pokemon } from "@/types";


interface PokemonInfoProps {
  data: Pokemon;
}

export default function PokemonInfo({ data }: PokemonInfoProps) {
  return (
    <div className="bg-sidebar-accent p-4 flex flex-col gap-2 rounded-xl">
      <h3 className="text-4xl">Info</h3>
      <div className="flex">
        <div className="flex-1/2 flex flex-col gap-2">
          <p className="font-bold text-muted2">
            {data.types.length > 1 ? "Types" : "Type"}
          </p>
          <ul className="flex gap-2 flex-wrap">
            {data.types.map((type) => (
              <li
                key={type.type.name}
                className="capitalize px-2.5 py-0.5 rounded-3xl text-white font-bold border-2"
                style={{
                  backgroundColor: `${typeColors[type.type.name]}`,
                  borderColor: `${typeColors[type.type.name]}`,
                }}
              >
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1/2 flex flex-col gap-2">
          <p className="font-bold text-muted2">Abilites</p>
          <ul className="flex gap-2 flex-wrap">
            {data.abilities.map((ability) => (
              <li
                key={ability.ability.name}
                className="capitalize px-2.5 py-0.5 rounded-3xl font-bold border-2"
                style={{
                  backgroundColor: `${typeColors[data.types[0].type.name]}50`,
                }}
              >
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
