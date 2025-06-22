import listItems from "../data/sideBarData";
import SignInSignOutBtn from "./SignInSignOutBtn";
import RegisterBtn from "./RegisterBtn";

export default function HamburgerMenu() {
  console.log(listItems);

  return (
    <nav className="w-full md:hidden">
      <ul className="w-full">
        <li>Test</li>
      </ul>
    </nav>
  );
}
