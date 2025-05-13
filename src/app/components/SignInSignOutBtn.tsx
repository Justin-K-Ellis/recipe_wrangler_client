import Link from "next/link";

export default function SignInSignOutBtn({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  return (
    <button className="btn">
      <Link href={isSignedIn ? "/signout" : "/signin"}>
        {isSignedIn ? "Sign Out" : "Sign In"}
      </Link>
    </button>
  );
}
