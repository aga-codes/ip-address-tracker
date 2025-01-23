import React, { useRef } from "react";
import "./styles.css";

const Search = () => {
  const inputRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    // setUserSearchValue(inputRef.current.value);
  };
  return (
    <div id="search-container">
      <h1>IP Address Tracker</h1>
      <div id="input-container">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for any IP address or domain"
        />
        <button onClick={handleSearch} id="search-button">
          🔍
        </button>
      </div>
    </div>
  );
};

export { Search };
