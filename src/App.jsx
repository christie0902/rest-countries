import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import Country from "./components/Country";
import SearchBar from "./components/SearchBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <>
        <SearchBar />

        <Routes>
          <Route path="/" element={<Country />} />
          <Route path="country/name/:name" element={<CountryDetails />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
