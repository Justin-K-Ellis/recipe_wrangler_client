"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInSignOutBtn() {
  const [currentUser, setCurrentUser] = useState<boolean>(false);

  return (
    <button className="btn">
      <Link href={currentUser ? "/signout" : "/signin"}>
        {currentUser ? "Sign Out" : "Sign In"}
      </Link>
    </button>
  );
}
