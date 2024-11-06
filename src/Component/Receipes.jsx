import React, { useMemo, useState } from "react";

const Receipes = () => {
  const [search, setSearch] = useState("");

  // Dummy data representing the list of recipes with ingredients
  const dummyData = [
    {
      id: 1,
      name: "Chicken Nuggets",
      integrents: ["chicken", "onions", "chilly sauce"],
    },
    {
      id: 2,
      name: "Pizza",
      integrents: ["tomato", "pepper", "cheese"],
    },
    {
      id: 3,
      name: "momo",
      integrents: ["meat", "flour", "water"],
    },
  ];
  // useMemo hook to filter recipes based on the search input
  // It only recalculates when the search value changes
  const filterReceipes = useMemo(() => {
    return dummyData.filter((receipe) =>
      receipe.integrents.some((integrents) =>
        integrents.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]); // Dependency array: Re-run the filter logic only when 'search' changes
  return (
    <div className="container">
      <div className="input-field">
        <input
          type="text"
          placeholder="Search for anything.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filterReceipes.length > 0 ? (
        <ul className="receipe-box">
          {filterReceipes.map((receipe) => (
            <li key={receipe.id} className="receipe-item">
              <strong>{receipe.name}</strong>
              <span>Integrents: {receipe.integrents.join(",")}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No receipe found for integrent: " {search} "</p>
      )}
    </div>
  );
};

export default Receipes;
