interface RecipeIdProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: RecipeIdProps) {
  const { id } = await params;
  return <div>here are the ingredients and steps to make dish {id}.</div>;
}
