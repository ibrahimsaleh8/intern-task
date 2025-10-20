"use client";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";

const links = [
  {
    link: "/",
    text: "Sports",
  },
  {
    link: "/members",
    text: "Members",
  },
  {
    link: "/subscriptions",
    text: "Subscriptions",
  },
];
export default function Navbar() {
  const currentPath = usePathname();
  return (
    <header className="flex items-center justify-between gap-3 p-4 ">
      <Link href={"/"} className="font-medium capitalize">
        sporting club
      </Link>
      <nav>
        <ul className="hidden md:flex items-center gap-5 font-medium">
          {links.map((link, i) => (
            <li key={i}>
              <Link
                className={`px-4 py-1.5 ${
                  currentPath == link.link
                    ? "bg-amber-400 text-black rounded-sm"
                    : ""
                }`}
                href={link.link}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <MobileNavbar currentPath={currentPath} links={links} />
      </nav>
    </header>
  );
}
