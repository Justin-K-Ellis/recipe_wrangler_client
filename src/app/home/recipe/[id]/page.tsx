"use client";

// import { useState, useEffect } from "react";
import PageTitle from "@/app/components/PageTitle";

interface RecipeIdProps {
  params: Promise<{ id: string }>;
}

// interface RecipeIdProps {
//   params: string;
// }

export default function Page({ params }: RecipeIdProps) {
  // const [recipeData, setRecipeData] = useState([]);

  const { id } = params;
  // const api = process.env.NEXT_PUBLIC_EXP_API;

  // useEffect(() => {
  //   async function getRecipeData() {
  //     const response = await fetch(`${api}/custom-recipe/${id}`);
  //     const data = await response.json();
  //     console.log("recipe data:", data);
  //   }
  //   getRecipeData();
  // }, []);

  return (
    <>
      <PageTitle text="A Particular Recipe" />
      <p>For BANANA id {id}.</p>
    </>
  );
}
