import Dock from "../components/Dock";
import Sidebar from "../components/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <main className="w-8/10">{children}</main>
      <Dock />
    </div>
  );
}
