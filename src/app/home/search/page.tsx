"use client";

import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { SearchResults } from "@/app/types";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  const api = process.env.NEXT_PUBLIC_EXP_API;

  async function handleSubmit(event: SyntheticEvent) {
    const token = localStorage.getItem("token");
    event.preventDefault();
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
      console.log(searchResults);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="container" className="flex flex-col">
      <section className="flex flex-row justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-2">
            {/* Search bar */}
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
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
      <div className="flex flex-col gap-2">
        {searchResults &&
          searchResults?.map((result) => (
            <div key={result.id} className="card card-border w-5/10 mx-auto">
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
