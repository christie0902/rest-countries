import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { Routes, Route } from "react-router-dom";
import CountryDetails from "./CountryDetails";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const loadCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const filteredCountries =
    filter === "All"
      ? countries
      : countries.filter((country) => country.region === filter);

  return (
    <>
      <SearchBar />
      <div className="country-container">
        <div className="filter-container">
          <Filter label="All" filter={filter} setFilter={setFilter} />
          <Filter label="Africa" filter={filter} setFilter={setFilter} />
          <Filter label="Americas" filter={filter} setFilter={setFilter} />
          <Filter label="Asia" filter={filter} setFilter={setFilter} />
          <Filter label="Europe" filter={filter} setFilter={setFilter} />
          <Filter label="Oceania" filter={filter} setFilter={setFilter} />
        </div>
        {filteredCountries.length ? (
          <ul className="country-list">
            {filteredCountries.map((country) => (
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
                    Population: {country.population}
                  </p>
                  <Link
                    to={`/country/name/${encodeURIComponent(
                      country.name.common
                    )}`}
                  >
                    See more
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </>
  );
};

export default Country;
