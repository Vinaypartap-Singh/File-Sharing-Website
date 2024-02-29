import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { navItems } from "./Header";

export default function MenuDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-2xl">Sync Share</DrawerTitle>
              <DrawerDescription>
                <span className="text-red-500">Upload, Save </span> and Easily
                <span className="text-red-500"> Share</span> your files
              </DrawerDescription>
            </div>
            <div>
              <DrawerClose>
                <Button variant="outline" size={"icon"}>
                  <Cross2Icon className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>

          {/* NavItems */}
          <nav className="mt-24">
            <ul className="space-y-24 text-end px-20">
              {navItems.map(({ label, href }, index) => {
                return (
                  <li key={index}>
                    <Link href={`${href}`} className="text-3xl">
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DrawerHeader>
        <DrawerFooter>
          <Button asChild>
            <Link href={"/login"}>Get Started</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
