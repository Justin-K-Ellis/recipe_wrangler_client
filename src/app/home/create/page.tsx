"use client";

import { SyntheticEvent, useState } from "react";
import PageTitle from "@/app/components/PageTitle";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>(["", "", ""]);
  const [steps, setSteps] = useState<string[]>([]);

  const cuisineTypes = ["Japanese", "Chinese", "Indian", "Mexican"]; // dummy data

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    console.log("cuisine:", cuisine);
    console.log("ingredients:", ingredients);
  }

  // == Ingredient operations ==
  // Create
  function handleAddToIngredients() {
    setIngredients([...ingredients, ""]);
  }

  // Update
  function handleIngredientChange(value: string, index: number) {
    const newIngredients = ingredients.map((ing, i) => {
      if (index === i) {
        return value;
      } else {
        return ingredients[i];
      }
    });
    setIngredients(newIngredients);
  }

  // Delete
  function handleIngredientDelete(index) {
    const newIngredients = ingredients.filter((ing, i) => {
      if (index !== i) return ing;
    });
    setIngredients(newIngredients);
  }

  return (
    <div className="flex flex-col items-center">
      <PageTitle text="Create a New Recipe" />
      <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-4 w-6/10">
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
          <select
            className="select"
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">What kind of food?</option>
            {cuisineTypes.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
        {/* Ingredients */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend text-xl font-bold">
            Ingredients
          </legend>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex flex-row gap-2 items-center">
              <label className="text-lg">{"Ingredient " + (i + 1)}</label>
              <input
                type="text"
                className="input"
                value={ingredients[i]}
                onChange={(e) => handleIngredientChange(e.target.value, i)}
                required
              />
              <button
                type="button"
                className="btn btn-soft btn-warning"
                onClick={() => handleIngredientDelete(i)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-neutral"
            onClick={handleAddToIngredients}
          >
            + Ingredient
          </button>
        </fieldset>
        {/* Submit Button */}
        <div>
          <button type="submit" className="btn btn-success w-5/10">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
