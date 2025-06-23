"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import PageTitle from "@/app/components/PageTitle";
import auth from "../auth/firebase.js";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isPasswordMatchError, setisPasswordMatchError] =
    useState<boolean>(false);
  const [isSignupError, setIsSignupError] = useState<boolean>(false);
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_EXP_API;

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (password1 !== password2) {
      setisPasswordMatchError(true);
      return;
    }
    setisPasswordMatchError(false);
    try {
      await createUserWithEmailAndPassword(auth, email, password1);
      onAuthStateChanged(auth, (user) => {
        console.log(user);

        user?.getIdToken().then((idToken) => {
          fetch(`${api}/user`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          });
          router.push("/");
        });
      });
    } catch (error) {
      console.error(error);
      setIsSignupError(true);
    }
  }

  return (
    <div className="mx-auto w-9/10 md:w-4/10 flex flex-col items-center">
      <PageTitle text="Register" />
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="input w-full"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="input w-full"
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            className="input w-full"
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-neutral">
          Register
        </button>
        {isPasswordMatchError && (
          <div className="text-red-500">Passwords must match.</div>
        )}
        {isSignupError && (
          <div className="text-red-500">
            There was a problem when signin up. Try again later.
          </div>
        )}
      </form>
    </div>
  );
}
