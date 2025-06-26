"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageTitle from "@/app/components/PageTitle";
import RecipePreviewCard from "@/app/components/RecipePreviewCard";
import { RecipePreview } from "@/app/types";
import auth from "../../auth/firebase";

export default function Page() {
  const [customRecipes, setCustomRecipes] = useState<RecipePreview[]>([]);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const api = process.env.NEXT_PUBLIC_EXP_API;

  useEffect(() => {
    async function getAllRecipes() {
      const user = auth.currentUser;
      const token = await user?.getIdToken();
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
  }, [api]);

  if (isLoadingError)
    return (
      <p className="text-red-500">
        Something went wrong when loading your recipes.
      </p>
    );

  return (
    <section className="flex flex-col mx-auto w-9/10 md:w-6/10 gap-3">
      <PageTitle text="My Recipes" />
      {customRecipes.map((recipe) => (
        <Link
          href={`/home/recipe/${recipe.externalId}/make-this/`}
          key={recipe.externalId}
        >
          <RecipePreviewCard name={recipe.name} cuisine={recipe.cuisine} />
        </Link>
      ))}
    </section>
  );
}
