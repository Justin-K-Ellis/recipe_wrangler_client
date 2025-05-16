"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import SignInSignOutBtn from "./SignInSignOutBtn";
import RegisterBtn from "./RegisterBtn";
import auth from "../auth/firebase.js";

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
        console.log("user not signed in");
        setIsSignedIn(false);
      }
    });
  }, []);

  return (
    <nav className="navbar bg-base-100 shadow-sm mb-4">
      <Link href={"/"} className=" text-2xl font-bold navbar-start">
        Recipe Wrangler
      </Link>
      <div className="navbar-end flex flex-row gap-2">
        <button className="btn">
          <Link href={"/about"}>About</Link>
        </button>
        <SignInSignOutBtn isSignedIn={isSignedIn} />
        {!isSignedIn && <RegisterBtn />}
      </div>
    </nav>
  );
}
