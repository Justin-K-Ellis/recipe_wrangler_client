import listItems from "../data/sideBarData";
import SignInSignOutBtn from "./SignInSignOutBtn";
import SidebarBtn from "./SidebarBtn";

interface HamburgerMenuProps {
  isSignedIn: boolean;
}

export default function HamburgerMenu({ isSignedIn }: HamburgerMenuProps) {
  // listItems.concat([{ name: "Find a Recipe", icon: "", link: "/home/search" }]);
  // listItems.concat([
  //   { name: "Create a Recipe", icon: "", link: "/home/recipe" },
  // ]);

  return (
    <nav className="w-full md:hidden mb-1">
      <ul className="w-full">
        {listItems.map((item) => (
          <li
            key={item.name}
            className="p-1 flex flex-row justify-center items-center"
          >
            <SidebarBtn link={item.link} text={item.name + " " + item.icon} />
          </li>
        ))}
        <li className="p-1 flex flex-row justify-center items-center">
          <SidebarBtn link="/home/search" text="Find a Recipe" />
        </li>
        <li className="p-1 flex flex-row justify-center items-center">
          <SidebarBtn link="/home/create" text="Create a Recipe" />
        </li>
        <li className=" p-1 flex flex-row justify-center">
          <SignInSignOutBtn isSignedIn={isSignedIn} />
        </li>
      </ul>
      <hr className="my-2 text-slate-400" />
    </nav>
  );
}
