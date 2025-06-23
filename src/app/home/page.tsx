import StartChoiceCard from "../components/StartChoiceCard";

export default function page() {
  return (
    <section className="flex md:flex-row flex-col md:justify-center justify-start items-center gap-4 h-full">
      <StartChoiceCard
        title="Find a Recipe"
        description="Search by cusine, ingredient, or dish name"
        link="/home/search"
      />
      <StartChoiceCard
        title="My Recipes"
        description="Use one of your own recipes"
        link="/home/my-recipes"
      />
    </section>
  );
}
