import Link from "next/link";

export default function Page() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Welcome to Recipe Wrangler</h1>
          <p className="text-3xl">Make preparing a delicious meal easy</p>
          <p className="text-2xl">
            Create your own recipe or find one that&apos;s just right and click
            through ingredients and recipes sets with ease.
          </p>
          <p className="py-6"></p>
          <div
            id="button-container"
            className="flex flex-row gap-1 justify-center"
          >
            <button className="btn btn-primary w-4/10">
              <Link href={"/signin"}>Sign In</Link>
            </button>
            <button className="btn btn-primary w-4/10">
              <Link href={"/register"}>Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
