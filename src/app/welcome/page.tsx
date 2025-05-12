import Link from "next/link";

export default function Page() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Welcome to Recipe Wrangler</h1>
          <p className="text-3xl">Make preparing a delicious meal easy</p>
          <p className="text-2xl">
            Create your own recipe or find one that's just right and click
            through ingredients and recipes sets with ease.
          </p>
          <p className="py-6"></p>
          <button className="btn btn-primary">
            <Link href={"/signin"}>Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
