"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import SignInSignOutBtn from "./SignInSignOutBtn";
import RegisterBtn from "./RegisterBtn";
import auth from "../auth/firebase.js";
import HamburgerMenu from "./HamburgerMenu";
import HamMenuBtn from "../svgs/HamMenuBtn";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  function toggleHamburgerMenu(): void {
    if (showHamburgerMenu) {
      setShowHamburgerMenu(false);
    } else {
      setShowHamburgerMenu(true);
    }
  }

  return (
    <>
      <nav className="navbar bg-base-100 shadow-sm mb-4 flex flex-row justify-between">
        <Link href={"/"} className="md:text-2xl font-bold navbar-start">
          Recipe Wrangler
        </Link>
        <div className="navbar-end md:flex md:flex-row hidden gap-2">
          <button className="btn btn-soft btn-primary">
            <Link href={"/about"}>About</Link>
          </button>
          <SignInSignOutBtn isSignedIn={isSignedIn} />
          {!isSignedIn && <RegisterBtn />}
        </div>
        <div onClick={toggleHamburgerMenu} className="md:hidden">
          {isSignedIn && <HamMenuBtn />}
        </div>
      </nav>
      {isSignedIn && showHamburgerMenu && (
        <HamburgerMenu isSignedIn={isSignedIn} />
      )}
    </>
  );
}
