import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-neutral-800 flex flex-col items-center text-white py-16 gap-6">
      <div className="flex gap-4 items-center">
        <Image src="/Logo.png" alt="" width={50} height={50} />
        <h2 className="text-3xl">Pokédex</h2>
      </div>
      <div>Explore the world of Pokémon</div>
      <div className="flex gap-12">
        <Image src="/Instagram.svg" alt="" width={50} height={50} />
        <Image src="/Facebook.svg" alt="" width={50} height={50} />
      </div>
    </div>
  );
}
