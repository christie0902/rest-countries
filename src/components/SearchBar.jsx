import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const loadCountries = async (query) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${query}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleSearch = () => {
    loadCountries(query);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter country name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {result !== null && ( // Render result only when it's not null)
        <div className="search-result">
          {result.length
            ? result.map((country) => (
                <li key={country.name.common} className="country-item">
                  <div>
                    <img src={country.flags.png} alt="Flag" />
                  </div>
                  <div>
                    <h2>{country.name.common}</h2>
                    <p>
                      Official Name: {country.name.official}
                      <br />
                      Capital:{" "}
                      {country.capital && country.capital.length > 0
                        ? country.capital[0]
                        : "Unknown"}
                      <br />
                      <br />
                      Population: {country.population}
                    </p>
                  </div>
                </li>
              ))
            : "No results found"}
        </div>
      )}
    </>
  );
};

export default SearchBar;
