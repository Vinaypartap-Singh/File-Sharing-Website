import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ThemeToggle";

import MenuDrawer from "./MenuDrawer";

interface navItems {
  label: String;
  href: URL | String;
}

export const navItems: navItems[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About us",
    href: "/about-us",
  },
  {
    label: "Upload",
    href: "/upload",
  },
  {
    label: "Contact us",
    href: "/contact-us",
  },
];

export default function Header() {
  return (
    <header className="py-10 px-14 flex justify-between items-center">
      <h2 className="font-bold text-2xl">SyncShare</h2>
      <nav className="hidden lg:flex">
        <ul className="flex gap-10 items-center">
          {navItems.map(({ label, href }, index) => {
            return (
              <li key={index}>
                <Link href={`${href}`}>{label}</Link>
              </li>
            );
          })}
          <Button asChild>
            <Link href={"/login"}>Get Started</Link>
          </Button>
          <ModeToggle />
        </ul>
      </nav>

      <div className="lg:hidden flex items-center space-x-6">
        <Button asChild>
          <Link href={"/login"}>Get Started</Link>
        </Button>
        <ModeToggle />
        <MenuDrawer />
      </div>
    </header>
  );
}
