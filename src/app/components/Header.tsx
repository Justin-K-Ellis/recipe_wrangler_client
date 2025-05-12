import Link from "next/link";
import SignInSignOutBtn from "./SignInSignOutBtn";

export default function Header() {
  return (
    <nav className="navbar bg-base-100 shadow-sm mb-4">
      <Link href={"/"} className=" text-2xl font-bold navbar-start">
        Recipe Wrangler
      </Link>
      <div className="navbar-end flex flex-row gap-2">
        <button className="btn">
          <Link href={"/about"}>About</Link>
        </button>
        <SignInSignOutBtn />
      </div>
    </nav>
  );
}
