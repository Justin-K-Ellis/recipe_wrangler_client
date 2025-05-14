"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      );
      const user = userCredential.user;
      const token = user.accessToken;
      const response = await fetch(`${api}/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          diplayName: user.displayName,
        }),
      });
      if (!response.ok) {
        console.error(response);
        setIsSignupError(true);
      }
    } catch (error) {
      console.error(error);
      setIsSignupError(true);
    }

    // createUserWithEmailAndPassword(auth, email, password1)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user);
    //     router.push("/home/");
    //   })
    //   .catch((error) => {
    //     console.error(error.code, error.message);
    //     setIsSignupError(true);
    //   });
  }

  return (
    <div className="mx-auto w-8/10">
      <PageTitle text="Register" />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="input"
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            className="input"
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
