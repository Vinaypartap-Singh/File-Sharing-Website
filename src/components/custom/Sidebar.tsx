import { UserButton, currentUser } from "@clerk/nextjs";
import {
  Cross2Icon,
  FileIcon,
  HamburgerMenuIcon,
  HomeIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
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

interface sideBar {
  label: String;
  href: String;
  icon: JSX.Element;
}

export default async function SideBar({ children }: any) {
  const user = await currentUser();
  const sidebar: sideBar[] = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Upload",
      href: "/upload",
      icon: <Share1Icon />,
    },
    {
      label: "Files",
      icon: <FileIcon />,
      href: "/files",
    },
  ];

  return (
    <>
      <div className="hidden flex-col md:flex md:flex-row justify-end">
        {/* Sidebar */}
        <aside
          id="sidebar"
          className="h-screen w-64 fixed top-0 left-0 overflow-y-auto border-r border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col h-full px-3 py-4">
            <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
              <Share1Icon />
              <span className="ml-3 text-base font-semibold">Sync Share</span>
            </div>
            <ul className="space-y-2 text-sm font-medium">
              {sidebar.map(({ label, href, icon }, index) => (
                <li key={index}>
                  <Link
                    href={`${href}`}
                    className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                  >
                    {icon}
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex-grow"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-black dark:text-white">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col sideContent">
          <div className="border-b p-8">
            <div className="flex justify-between items-center">
              <h1>
                <span className="text-red-500">Share, Save</span> and
                <span className="text-red-500"> Upload </span> Files
              </h1>
              <div className="flex items-center gap-5">
                <UserButton />
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="flex-grow p-8">{children}</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="block md:hidden border-b p-8">
        <section className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-2xl">SyncShare</h2>
          </div>
          <div className="flex items-center gap-5">
            <ModeToggle />
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
                        <span className="text-red-500">Upload, Save </span> and
                        Easily
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
                      {sidebar.map(({ label, href, icon }, index) => (
                        <li key={index}>
                          <Link
                            href={`${href}`}
                            className="flex items-center justify-end rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                          >
                            {icon}
                            <span className="ml-3 whitespace-nowrap">
                              {label}
                            </span>
                          </Link>
                        </li>
                      ))}
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
          </div>
        </section>
        <div>
          <div className="flex-grow p-8">{children}</div>
        </div>
      </div>
    </>
  );
}
