import SearchDialog from "@/components/SearchDialog";
import { getCompletePokemonList } from "@/lib/pokeapi";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
  const allPokemon = await getCompletePokemonList();
  const navList = [
    /* {
      name: "Home",
      link: "/",
    }, */
    {
      name: "Pokédex",
      link: "/pokedex",
    },
    /* {
      name: "Types",
      link: "/types",
    },
    {
      name: "Favourites",
      link: "/favourites",
    }, */
  ];
  return (
    <div className="content-grid sticky top-0 z-50 bg-white">
      <div className="py-4 flex justify-between items-center ">
        <Link href={"/"} className="flex items-center gap-4 basis-1/3">
          <Image src="/Logo.png" alt="" width={50} height={50} />
          <h1 className="text-3xl gradient-text">Pokédex</h1>
        </Link>
        <SearchDialog allPokemon={allPokemon} />
        <div className="flex gap-4 text-lg basis-1/3 justify-end">
          {navList.map((item) => (
            <Link key={item.name} href={item.link}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
