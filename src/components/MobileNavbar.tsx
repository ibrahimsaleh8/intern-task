import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
type Props = {
  links: {
    link: string;
    text: string;
  }[];
  currentPath: string;
};
export default function MobileNavbar({ links, currentPath }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="block md:hidden cursor-pointer">
        <Menu className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col items-center gap-5 font-medium p-4">
          {links.map((link, i) => (
            <li className="w-full" key={i}>
              <Link
                onClick={() => setOpen(false)}
                className={`block px-4 py-1.5 w-full ${
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
      </SheetContent>
    </Sheet>
  );
}
