"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import { RecipeFullInfo } from "@/app/types";
import { useRouter } from "next/navigation";
import auth from "../../../../auth/firebase";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [recipeData, setRecipeData] = useState<RecipeFullInfo>({
    externalId: 0,
    name: "",
    cuisine: null,
    ingredients: [],
    steps: [],
    readyInMinutes: 0,
    servings: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { id } = use(params);

  const baseApi = process.env.NEXT_PUBLIC_EXP_API;
  const isCustomRecipe = id.length > 6;
  let url = "";
  if (isCustomRecipe) {
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

  async function handleDelete(recipeId: number | string) {
    const answer = confirm("Are you sure you want to delete this recipe?");
    if (answer) {
      console.log(`delete recipe ${recipeId}`);
      const user = auth.currentUser;
      const token = await user?.getIdToken();
      try {
        const response = await fetch(`${baseApi}/custom-recipe/${recipeId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          console.error(response);
          alert("Could not delete recipe.");
        } else {
          router.push("/home/my-recipes");
        }
      } catch (error) {
        console.error(error);
        alert("Could not delete recipe.");
      }
    }
  }

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
          <div>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => handleDelete(recipeData.externalId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
