import SidebarBtn from "./SidebarBtn";
import listItems from "../data/sideBarData";

export default function Sidebar() {
  return (
    <div className="w-2/10 h-full mx-2 shadow p-2 md:block hidden">
      <ul className="flex flex-col gap-4">
        {listItems.map((item) => (
          <li key={item.name}>
            <SidebarBtn link={item.link} text={item.name + " " + item.icon} />
          </li>
        ))}
        <li>
          <SidebarBtn link="/home/search" text="Find a Recipe" />
        </li>
        <li>
          <SidebarBtn link="/home/create" text="Create a Recipe" />
        </li>
      </ul>
    </div>
  );
}
