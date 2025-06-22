"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import SignInSignOutBtn from "./SignInSignOutBtn";
import RegisterBtn from "./RegisterBtn";
import auth from "../auth/firebase.js";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          localStorage.setItem("token", idToken);
        });
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  return (
    <nav className="navbar bg-base-100 shadow-sm mb-4">
      <Link href={"/"} className="md:text-2xl font-bold navbar-start">
        Recipe Wrangler
      </Link>
      <div className="navbar-end md:flex md:flex-row hidden gap-2">
        <button className="btn btn-soft btn-primary">
          <Link href={"/about"}>About</Link>
        </button>
        <SignInSignOutBtn isSignedIn={isSignedIn} />
        {!isSignedIn && <RegisterBtn />}
        {isSignedIn && <HamburgerMenu />}
      </div>
    </nav>
  );
}
