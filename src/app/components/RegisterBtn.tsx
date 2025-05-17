import Link from "next/link";

export default function RegisterBtn() {
  return (
    <button type="button" className="btn btn-soft btn-primary">
      <Link href="/register">Register</Link>
    </button>
  );
}
