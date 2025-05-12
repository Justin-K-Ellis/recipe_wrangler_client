import Link from "next/link";
import { SideBarItem } from "../types";

export default function Sidebar() {
  const listItems: SideBarItem[] = [
    {
      name: "Favorites",
      icon: "❤️",
      link: "/home/favorites",
    },
    {
      name: "Want to Make",
      icon: "🤔",
      link: "/home/want-to-make",
    },
    {
      name: "My Recipes",
      icon: "✍️",
      link: "/home/my-recipes",
    },
  ];

  return (
    <div className="w-2/10 h-full mx-2 shadow p-2">
      <ul className="flex flex-col gap-4">
        {listItems.map((item) => (
          <li
            key={item.name}
            className="text-xl border border-accent rounded shadow p-1 hover:bg-base-300"
          >
            <Link href={item.link}>{item.name + " " + item.icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
