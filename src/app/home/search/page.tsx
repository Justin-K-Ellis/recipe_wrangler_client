"use client";

import { useState } from "react";

type searchValueType = string | readonly string[] | number | undefined;

export default function Search() {
  const [searchType, setSearchType] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<searchValueType>("");
  const searchOptions = ["Cuisine", "Dish name", "Ingredients"];

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Search for ${searchValue} amoung the ${searchType}.`);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          {/* Search options dropdown */}
          <select
            className="select"
            defaultValue={"Search from..."}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option disabled={true}>Search from...</option>
            {searchOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

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
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-info">
            Search
          </button>
        </div>
      </form>
    </section>
  );
}
