"use client";

import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Link from "next/link";
import app from "../auth/firebase.js";
import provider from "../auth/authGoogleProviderCreate.js";

export default function SignInSignOutBtn() {
  const [currentUser, setCurrentUser] = useState();

  // console.log("api key:", process.env.FB_API_KEY);

  // const auth = getAuth(app);
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential?.accessToken;
  //     const user = result.user;
  //     console.log(user);
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     console.error(errorCode, errorMessage, email, credential);
  //   });

  return (
    <button className="btn">
      <Link href={currentUser ? "/signout" : "/signin"}>
        {currentUser ? "Sign Out" : "Sign In"}
      </Link>
    </button>
  );
}
