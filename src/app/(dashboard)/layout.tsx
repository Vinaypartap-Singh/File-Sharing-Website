import SideBar from "@/components/custom/Sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <SideBar>{children}</SideBar>
    </div>
  );
}
