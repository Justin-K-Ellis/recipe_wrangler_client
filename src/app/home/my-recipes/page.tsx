"use client";

import { useEffect, useState } from "react";
import auth from "@/app/auth/firebase";
import PageTitle from "@/app/components/PageTitle";
import RecipePreviewCard from "@/app/components/RecipePreviewCard";

export default function Page() {
  const [customRecipes, setCustomRecipes] = useState([]);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const api = process.env.NEXT_PUBLIC_EXP_API;

  useEffect(() => {
    const token = auth.currentUser.accessToken;
    async function getAllRecipes() {
      try {
        const response = await fetch(`${api}/custom-recipe`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          setIsLoadingError(true);
        } else {
          const recipes = await response.json();
          setCustomRecipes(recipes);
        }
      } catch (error) {
        console.error(error);
        setIsLoadingError(true);
      }
    }
    getAllRecipes();
  }, []);

  if (isLoadingError)
    return (
      <p className="text-red-500">
        Something went wrong when loading your recipes.
      </p>
    );

  return (
    <section className="flex flex-col mx-auto w-6/10 gap-3">
      <PageTitle text="My Recipes" />
      {customRecipes.map((recipe) => (
        <RecipePreviewCard
          key={recipe.uuid}
          name={recipe.name}
          cuisine={recipe.cuisine}
          notes={recipe.notes}
        />
      ))}
    </section>
  );
}
