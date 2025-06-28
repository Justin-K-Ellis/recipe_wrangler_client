import { useState, useEffect } from "react";
import type { RecipeFullInfo } from "@/app/types";

export default function useGetCustomRecipeData(
  recipeId: string | null
): RecipeFullInfo | null {
  const [recipeData, setRecipeData] = useState<RecipeFullInfo>({
    externalId: 0,
    name: "",
    cuisine: "",
    ingredients: [],
    steps: [],
    readyInMinutes: 0,
    servings: 0,
  });
  const api = process.env.NEXT_PUBLIC_EXP_API;

  useEffect(() => {
    async function getCustomRecipeData() {
      if (!recipeId) {
        return null;
      }
      const response = await fetch(`${api}/custom-recipe/${recipeId}`);
      if (!response.ok) {
        throw new Error("Could not fetch recipe");
      } else {
        const data: RecipeFullInfo = await response.json();
        setRecipeData(data);
      }
    }
    getCustomRecipeData();
  }, [api, recipeId]);

  if (!recipeId) {
    return null;
  }

  return recipeData;
}
