import Link from "next/link";
import listItems from "../data/sideBarData";

export default function Sidebar() {
  return (
    <div className="w-2/10 h-full mx-2 shadow p-2 md:block hidden">
      <ul className="flex flex-col gap-4">
        {listItems.map((item) => (
          <li
            key={item.name}
            className="text-xl border border-primary rounded shadow p-1 hover:bg-base-300"
          >
            <Link href={item.link}>{item.name + " " + item.icon}</Link>
          </li>
        ))}
        <li>
          <button className="btn btn-primary w-full text-xl">
            <Link href={"/home/search"}>Find a Recipe</Link>
          </button>
        </li>
        <li>
          <button className="btn btn-primary w-full text-xl">
            <Link href={"/home/create"}>Create a Recipe</Link>
          </button>
        </li>
      </ul>
    </div>
  );
}
