import Link from "next/link";
import listItems from "../data/sideBarData";
import SignInSignOutBtn from "./SignInSignOutBtn";
import SidebarBtn from "./SidebarBtn";

interface HamburgerMenuProps {
  isSignedIn: boolean;
}

export default function HamburgerMenu({ isSignedIn }: HamburgerMenuProps) {
  return (
    <nav className="w-full md:hidden mb-1">
      <ul className="w-full">
        {listItems.map((item) => (
          <li
            className="flex flex-row justify-center border-b-1 border-primary text-2xl"
            key={item.name}
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
        <li className="p-1 flex flex-row justify-center items-center border-b-1 border-primary">
          <SidebarBtn link="/home/search" text="Find a Recipe" />
        </li>
        <li className="p-1 flex flex-row justify-center items-center border-b-1 border-primary">
          <SidebarBtn link="/home/create" text="Create a Recipe" />
        </li>
        <li className=" p-1 flex flex-row justify-center border-b-1 border-primary">
          <SignInSignOutBtn isSignedIn={isSignedIn} />
        </li>
      </ul>
    </nav>
  );
}
