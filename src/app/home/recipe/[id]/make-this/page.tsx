"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import { RecipeFullInfo } from "@/app/types";
import auth from "../../../../auth/firebase";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [recipeData, setRecipeData] = useState<RecipeFullInfo>({
    externalId: 0,
    name: "",
    ingredients: [],
    steps: [],
    readyInMinutes: 0,
    servings: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = use(params);

  const baseApi = process.env.NEXT_PUBLIC_EXP_API;
  let url = "";
  if (id.length > 6) {
    url = `${baseApi}/custom-recipe/${id}`;
  } else {
    url = `${baseApi}/external-recipe/id/${id}`;
  }

  useEffect(() => {
    async function getRecipeData() {
      const user = auth.currentUser;
      const token = await user?.getIdToken();
      setLoading(true);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("response:", response);
        } else {
          const data = await response.json();
          setRecipeData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getRecipeData();
  }, [id, url]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="card card-border p-4 mx-auto w-9/10 md:w-7/10">
        <div className="card-title text-2xl">{recipeData.name}</div>
        <div className="card-body">
          <p className="font-bold">
            Ready in {recipeData.readyInMinutes} minutes
          </p>
          <p className="font-bold">Serves: {recipeData.servings}</p>
          <h2 className="font-bold">Ingredients:</h2>
          {recipeData.ingredients.map((ing) => (
            <span key={ing} className="flex flex-row gap-2 items-center">
              <input type="checkbox" className="checkbox checkbox-sm" />
              {ing}
            </span>
          ))}
          <h2 className="font-bold">Steps:</h2>
          {recipeData.steps.map((step) => (
            <span key={step} className="flex flex-row gap-2 items-center">
              <input type="checkbox" className="checkbox checkbox-sm" />
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
