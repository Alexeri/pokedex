"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  link: string;
}

export default function NavbarLinks({ navList }: { navList: NavLink[] }) {
  const pathname = usePathname();
  return (
    <div className="flex gap-4 text-lg basis-1/3 justify-end font-semibold text-neutral-700">
      {navList.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={cn(
            "py-5 px-2 relative",
            pathname === item.link && "text-blue-800"
          )}
        >
          <span className="block py-1 px-2 rounded transition-colors duration-200 hover:bg-neutral-200/50">
            {item.name}
          </span>
          {pathname === item.link && (
            <span className="absolute left-1/2 bottom-0 w-[50%] -translate-x-1/2 h-[3px] bg-blue-800 rounded"></span>
          )}
        </Link>
      ))}
    </div>
  );
}
