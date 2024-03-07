import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState({});
  const [fetchError, setFetchError] = useState(false);

  const loadCountry = async (name) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      if (!response.ok) {
        setFetchError(true);
        return;
      }
      const data = await response.json();
      setCountry(data[0]);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setFetchError(true);
    }
  };

  useEffect(() => {
    loadCountry(name);
  }, [name]);
  console.log(country);
  if (fetchError) {
    return <div>No data found. Please try again later.</div>;
  }

  return (
    <div className="country-details-container">
      {" "}
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
            <strong>Population:</strong> {country.population || "Unknown"}
          </p>
          <p>
            <strong>Region:</strong> {country.region || "Unknown"}
          </p>
          <p>
            {country.languages && Object.keys(country.languages).length > 0 ? (
              <>
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages).join(", ")}
              </>
            ) : (
              "Unknown"
            )}
          </p>
          <p>
            <strong>Borders:</strong>{" "}
            {country.borders && Object.keys(country.borders).length > 0 ? (
              <>
                {country.borders.map((border) => (
                  <Link
                    to={`/country/name/${border}`}
                    key={border}
                    className="border-button"
                  >
                    {border}
                  </Link>
                ))}
              </>
            ) : (
              "Unknown"
            )}
          </p>
          <p>
            <strong>Area:</strong> {country.area || "Unknown"} sq km
          </p>
          <p>
            <strong>Timezones:</strong>{" "}
            {country.timezones && country.timezones.length > 0
              ? country.timezones.join(", ")
              : "Unknown"}
          </p>
          <p>
            <strong>Official Map Links:</strong>{" "}
            {country.maps &&
            country.maps.googleMaps &&
            country.maps.openStreetMaps ? (
              <>
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
              </>
            ) : (
              "Unknown"
            )}
          </p>
          <Link to={`/`} className="back-link">
            Back
          </Link>
        </>
      )}
    </div>
  );
};

export default CountryDetails;
