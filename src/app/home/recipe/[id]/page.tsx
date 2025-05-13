import PageTitle from "@/app/components/PageTitle";

interface RecipeIdProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: RecipeIdProps) {
  const { id } = await params;

  return (
    <>
      <PageTitle text="A Particular Recipe" />
      <p>For recipe id {id}.</p>
    </>
  );
}
