"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import auth from "../auth/firebase";
import PageTitle from "@/app/components/PageTitle";
import ListInput from "@/app/components/ListInput";
import useGetCustomRecipeData from "../hooks/useGetCustomRecipeData";
import { RecipeFullInfo } from "@/app/types";

interface RecipeInputProps {
  inputType: "create" | "update";
  recipeId: string | null;
}

export default function RecipeInput({ inputType, recipeId }: RecipeInputProps) {
  const [name, setName] = useState<string>("");
  const [cuisine, setCuisine] = useState<string | null>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [readyInMinutes, setReadyInMinutes] = useState<string>("10");
  const [servings, setServings] = useState<string>("1");

  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_EXP_API;

  const recipeData: RecipeFullInfo | null = useGetCustomRecipeData(recipeId);

  useEffect(() => {
    if (recipeData) {
      setName(recipeData.name);
      setCuisine(recipeData.cuisine);
      setIngredients(recipeData.ingredients);
      setSteps(recipeData.steps);
      setReadyInMinutes(recipeData.readyInMinutes.toString());
      setServings(recipeData.servings.toString());
    }
  }, [recipeData]);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const user = auth.currentUser;
    const token = await user?.getIdToken();
    const url =
      inputType === "create"
        ? `${api}/custom-recipe`
        : `${api}/custom-recipe/${recipeId}`;
    const httpMethod = inputType === "create" ? "POST" : "PUT";

    try {
      const readyNum = parseInt(readyInMinutes);
      const servingNum = parseInt(servings);

      const response = await fetch(url, {
        method: httpMethod,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          cuisine,
          ingredients,
          steps,
          readyInMinutes: readyNum,
          servings: servingNum,
        }),
      });
      if (!response.ok) {
        console.error(response);
      } else {
        router.push(`/home/my-recipes`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // == Ingredient operations ==
  // Create
  function handleAddToIngredients() {
    setIngredients([...ingredients, ""]);
  }

  // Update
  function handleIngredientChange(value: string, index: number) {
    const newIngredients = ingredients.map((_ing, i) => {
      if (index === i) {
        return value;
      } else {
        return ingredients[i];
      }
    });
    setIngredients(newIngredients);
  }

  // Delete
  function handleIngredientDelete(index: number) {
    const newIngredients = ingredients.filter((ing, i) => {
      if (index !== i) return ing;
    });
    setIngredients(newIngredients);
  }

  // == Step Operations ==
  // Create
  function handleAddToSteps() {
    setSteps([...steps, ""]);
  }

  // Update
  function handleStepChange(value: string, index: number) {
    const newSteps = steps.map((_step, i) => {
      if (index === i) {
        return value;
      } else {
        return steps[i];
      }
    });
    setSteps(newSteps);
  }

  // Delete
  function handleStepsDelete(index: number) {
    const newSteps = steps.filter((step, i) => {
      if (index !== i) return step;
    });
    setSteps(newSteps);
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <PageTitle
        text={
          inputType === "create"
            ? "Create a New Recipe"
            : `Update ${recipeData?.name}`
        }
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-8 gap-4 w-9/10 md:w-6/10"
      >
        {/* Name */}
        <div className="flex flex-row gap-4 items-center">
          <label className="text-xl font-bold">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Sushi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* Cuisine */}
        <div className="flex flex-row gap-4 items-center">
          <label className="text-xl font-bold">Cuisine</label>
          <input
            type="text"
            className="input"
            placeholder="Japanese"
            value={cuisine ? cuisine : ""}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        {/* Ready in Minutes */}
        <div className="flex flex-row gap-4 items-center">
          <label className="text-xl font-bold">
            Ready in how many minutes?
          </label>
          <input
            type="number"
            className="input"
            placeholder="10"
            value={readyInMinutes}
            onChange={(e) => setReadyInMinutes(e.target.value)}
            required
          />
        </div>
        {/* Servings */}
        <div className="flex flex-row gap-4 items-center">
          <label className="text-xl font-bold">Servings</label>
          <input
            type="number"
            className="input"
            placeholder="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </div>
        {/* Ingredients */}
        <ListInput
          title="Ingredient"
          data={ingredients}
          dataAddHandler={handleAddToIngredients}
          dataChangeHandler={handleIngredientChange}
          dataDeleteHandler={handleIngredientDelete}
        />
        {/* Steps */}
        <ListInput
          title="Step"
          data={steps}
          dataAddHandler={handleAddToSteps}
          dataChangeHandler={handleStepChange}
          dataDeleteHandler={handleStepsDelete}
        />

        <div className="flex flex-row justify-center">
          <button type="submit" className="btn btn-success w-5/10">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
