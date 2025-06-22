import Sidebar from "../components/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <main className="md:w-8/10 w-full">{children}</main>
    </div>
  );
}
