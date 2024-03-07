import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState({});

  const loadCountry = async (name) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();
      setCountry(data[0]);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    loadCountry(name);
  }, [name]);
  console.log(country);

  return (
    <div>
      {country.name && (
        <>
          <h2>{country.name.common}</h2>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <p>
            <strong>Capital:</strong>{" "}
            {country.capital && country.capital.length > 0
              ? country.capital[0]
              : "Unknown"}
          </p>
          <p>
            <strong>Population:</strong> {country.population}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {Object.values(country.languages).join(", ")}
          </p>
          <p>
            <strong>Borders:</strong> {country.borders.join(", ")}
          </p>
          <p>
            <strong>Area:</strong> {country.area} sq km
          </p>
          <p>
            <strong>Timezones:</strong> {country.timezones.join(", ")}
          </p>
          <p>
            <strong>Official Map Links:</strong>{" "}
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
            ,{" "}
            <a
              href={country.maps.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </a>
          </p>
          <Link to={`/`}>Back</Link>
        </>
      )}
    </div>
  );
};

export default CountryDetails;
