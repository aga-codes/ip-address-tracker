import React from "react";
import "./styles.css";

const Search = () => {
  return (
    <div id="search-container">
      <h1>IP Address Tracker</h1>
      <div id="input-container">
        <input type="text" placeholder="Search for any IP address or domain" />
        <button id="search-button">❌</button>
      </div>
    </div>
  );
};

export { Search };
