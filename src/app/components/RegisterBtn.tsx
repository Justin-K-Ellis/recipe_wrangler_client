import Link from "next/link";

export default function RegisterBtn() {
  return (
    <button type="button" className="btn">
      <Link href="/register">Register</Link>
    </button>
  );
}
