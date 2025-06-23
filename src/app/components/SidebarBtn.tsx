import Link from "next/link";

interface SidebarBtnProps {
  link: string;
  text: string;
}

export default function SidebarBtn({ link, text }: SidebarBtnProps) {
  return (
    <button className="btn btn-primary w-full text-xl shadow border-slate-400">
      <Link href={link}>{text}</Link>
    </button>
  );
}
