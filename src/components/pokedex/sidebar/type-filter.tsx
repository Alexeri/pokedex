"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn, typeColors } from "@/lib/utils";


interface TypeFilterProps {
  selectedType: string | null;
  handleChange: (type: string) => void;
}

const allTypes = Object.keys(typeColors);

export default function TypeFilter({
  selectedType,
  handleChange,
}: TypeFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Filter by Type</h2>
      <ul className="space-y-2">
        {allTypes.map((type) => (
          <li key={type}>
            <label
              htmlFor={type}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Checkbox
                id={type}
                checked={selectedType === type}
                onCheckedChange={() => handleChange(type)}
                className="border-gray-400/80 cursor-pointer data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: typeColors[type] }}
              />
              <span
                className={cn("capitalize", {
                  "font-bold ": selectedType === type,
                })}
              >
                {type}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
