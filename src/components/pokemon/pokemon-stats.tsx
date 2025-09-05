import { cn } from "@/lib/utils";
import { Pokemon } from "@/types";

interface PokemonStatsProps {
  stats: Pokemon["stats"];
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  const statColors: Record<string, string> = {
    "hp": "bg-red-500/80",
    "attack": "bg-orange-500/80",
    "defense": "bg-yellow-500/80",
    "special-attack": "bg-blue-500/80",
    "special-defense": "bg-green-500/80",
    "speed": "bg-pink-500/80",
  };

  return (
    <div className="bg-sidebar-accent p-4 flex flex-col gap-2 rounded-xl">
      <h3 className="text-4xl">Base Stats</h3>
      {stats.map((stat) => (
        <div key={stat.stat.name} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="capitalize w-50 font-semibold text-muted2">
              {stat.stat.name}
            </p>
            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div
                className={cn("h-full rounded-full", statColors[stat.stat.name])}
                style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
              />
            </div>
            <p className="w-20 text-end font-bold">{stat.base_stat}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
