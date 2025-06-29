"use client";

import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { SearchResults } from "@/app/types";
import SearchGlass from "@/app/svgs/SearchGlass";
import auth from "../../auth/firebase";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const api = process.env.NEXT_PUBLIC_EXP_API;

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    const token = await user?.getIdToken();
    try {
      const response = await fetch(`${api}/external-recipe/${searchValue}`, {
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error(response);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div id="container" className="flex flex-col">
      <section className="flex flex-row justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-2">
            {/* Search bar */}
            <label className="input">
              <SearchGlass />
              <input
                type="search"
                className="grow"
                placeholder="Search"
                value={searchValue}
                required
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-info">
              Search
            </button>
          </div>
        </form>
      </section>
      <div className="flex flex-col gap-2 my-4">
        {searchResults &&
          searchResults?.map((result) => (
            <div
              key={result.id}
              className="card card-border w-9/10 md:w-5/10 mx-auto"
            >
              <Link href={`/home/recipe/${result.id}/make-this/`}>
                <div className="card-body">
                  <p className="text-xl font-bold">{result.name}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
