"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./auth/firebase";
import LoadingSpinner from "./components/LoadingSpinner";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      } else {
        router.push("/welcome");
      }
    });
  }, [router]);

  return <LoadingSpinner />;
}
