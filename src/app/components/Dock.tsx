import Link from "next/link";
import listItems from "../data/sideBarData";

export default function Dock() {
  return (
    <div className="block">
      <div className="dock md:hidden flex flex-row gap-1 mt-1">
        {listItems.map((item) => (
          <Link key={item.name} href={item.link}>
            <button className="btn btn-outline btn-primary">{item.icon}</button>
          </Link>
        ))}
        <Link href={"/home/search"}>
          <button className="btn btn-primary">Find</button>
        </Link>
        <Link href={"/home/create"}>
          <button className="btn btn-primary">Create</button>
        </Link>
      </div>
    </div>
  );
}
