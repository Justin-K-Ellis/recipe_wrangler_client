import Sidebar from "../components/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
