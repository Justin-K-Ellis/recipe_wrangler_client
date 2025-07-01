"use client";

import { useState, useEffect } from "react";
import auth from "../../auth/firebase";
import Link from "next/link";
import PageTitle from "@/app/components/PageTitle";
import RecipePreviewCard from "@/app/components/RecipePreviewCard";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import type { RecipePreview } from "@/app/types";

export default function Page() {
  const [favorites, setFavorites] = useState<RecipePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const baseApi = process.env.NEXT_PUBLIC_EXP_API;

  useEffect(() => {
    async function getFavorites() {
      const user = auth.currentUser;
      const token = await user?.getIdToken();

      try {
        const response = await fetch(`${baseApi}/external-recipe/favorites`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error(response);
          setError(true);
          return;
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getFavorites();
  }, [baseApi]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-red-500">
        Something went wrong when loading your favorites.
      </p>
    );

  return (
    <>
      <PageTitle text="Favorites" />
      <div className="flex flex-col gap-2 mx-auto w-9/10 md:w-6/10">
        {favorites.map((recipe) => (
          <Link
            href={`/home/recipe/${recipe.externalId}/make-this?favorited=true`}
            key={recipe.externalId}
          >
            <RecipePreviewCard
              key={recipe.externalId}
              name={recipe.name}
              cuisine={recipe.cuisine || null}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
