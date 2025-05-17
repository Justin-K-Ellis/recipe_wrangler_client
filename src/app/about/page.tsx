import PageTitle from "../components/PageTitle";

export default function page() {
  return (
    <section className="flex flex-col items-center justify-center">
      <PageTitle text="About" />
      <p className="w-9/10 text-justify flex justify-center">
        Recipe Wrangler helps you find and use delicious recipes and create and
        manage your own.
      </p>
    </section>
  );
}
