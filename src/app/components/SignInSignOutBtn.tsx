import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import auth from "../auth/firebase";

interface SignProps {
  isSignedIn: boolean;
}

export default function SignInSignOutBtn({ isSignedIn }: SignProps) {
  const router = useRouter();

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        router.push("/welcome");
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  }

  const signInBtn = (
    <button className="btn btn-soft btn-primary">
      <Link href="/signin">Sign In</Link>
    </button>
  );

  const signOutBtn = (
    <button className="btn btn-soft btn-primary" onClick={handleSignOut}>
      Sign Out
    </button>
  );

  return isSignedIn ? signOutBtn : signInBtn;
}
