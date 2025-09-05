import NavbarLinks from "@/components/layout/navbar/navbar-links";
import SearchDialog from "@/components/layout/navbar/search-dialog";
import { getCompletePokemonList } from "@/lib/pokeapi";
import Image from "next/image";
import Link from "next/link";
const navList = [
  {
    name: "Pokédex",
    link: "/pokedex",
  },
];

export default async function Navbar() {
  const allPokemon = await getCompletePokemonList();

  return (
    <div className="content-grid sticky top-0 z-50 bg-white border-[1px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center basis-1/3">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/Logo.png" alt="" width={50} height={50} />
            <h1 className="text-3xl gradient-text">Pokédex</h1>
          </Link>
        </div>
        <SearchDialog allPokemon={allPokemon} />
        <NavbarLinks navList={navList} />
      </div>
    </div>
  );
}
