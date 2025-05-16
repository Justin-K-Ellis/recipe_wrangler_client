interface RecipeDataProps {
  externalId: number;
  name: string;
  ingredients: string[];
  steps: string[];
  readyInMinutes: number;
  servings: number;
}

export default function MakeThisCard({ recipeData }: RecipeDataProps) {
  return (
    <div className="card card-border p-4 w-7/10">
      <div className="card-title">{recipeData.name}</div>
      <div className="card-body">
        <p>Ready in {recipeData.readyInMinutes}</p>
        <p>Serves: {recipeData.servings}</p>
      </div>
    </div>
  );
}
