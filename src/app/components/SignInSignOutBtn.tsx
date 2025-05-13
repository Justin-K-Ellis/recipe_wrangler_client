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
    <button className="btn">
      <Link href="/signin">Sign In</Link>
    </button>
  );

  const signOutBtn = (
    <button className="btn" onClick={handleSignOut}>
      Sign Out
    </button>
  );

  const btn = isSignedIn ? signOutBtn : signInBtn;

  return btn;
}
