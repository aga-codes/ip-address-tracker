import React, { useRef } from "react";
import "./styles.css";
import { useAppContext } from "../../AppProvider";
import DOMPurify from "dompurify";

const Search = () => {
  const { setUserSearchValue } = useAppContext();
  const inputRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();

    const searchValue = DOMPurify.sanitize(
      inputRef.current.value.trim()
    );
    setUserSearchValue(searchValue);
    inputRef.current.value = "";
  };
  return (
    <div id="search-container">
      <h1>IP Address Tracker</h1>
      <div id="input-container">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for any IP address"
        />
        <button onClick={handleSearch} id="search-button">
          🔍
        </button>
      </div>
    </div>
  );
};

export { Search };
