"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import PageTitle from "@/app/components/PageTitle";
import auth from "../auth/firebase.js";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [isSignInError, setIsSignInError] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password1
      );
      const user = userCredential.user;
      console.log(user);
      router.push("/home/");
    } catch (error) {
      console.error(error);
      setIsSignInError(true);
    }
  }

  return (
    <div className="mx-auto w-8/10">
      <PageTitle text="Sign In" />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="flex flex-row gap-2">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password */}
        <div className="flex flex-row gap-2">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="input"
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        {/* Button */}
        <button type="submit" className="btn btn-neutral">
          Sign In
        </button>
        {isSignInError && (
          <div className="text-red-500">
            There was a problem when signin. Try again later.
          </div>
        )}
      </form>
    </div>
  );
}
