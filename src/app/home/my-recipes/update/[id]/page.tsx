"use client";

import RecipeInput from "@/app/components/RecipeInput";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams<{ id: string }>();

  return <RecipeInput inputType="update" recipeId={id} />;
}
