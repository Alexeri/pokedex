"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DiceButton({
  allPokemon,
}: {
  allPokemon: { name: string; url: string }[];
}) {
  const router = useRouter();

  const handleRandomClick = () => {
    const random = allPokemon[Math.floor(Math.random() * allPokemon.length)];
    router.push(`/pokemon/${random.name}`);
  };

  return (
    <button className="btn-primary" onClick={handleRandomClick}>
      <Image
        src="/Dice.svg"
        width={25}
        height={25}
        alt="Dice"
        className="h-7 w-7"
      />
      Random Pokémon
    </button>
  );
}
