import React from "react";
import "./App.css";
import { Map } from "./components/Map/Map";
import { Search } from "./components/Search/Search";
import { DisplayInfo } from "./components/DisplayInfo/DisplayInfo";

function App() {
  return (
    <div>
      <Search />
      <DisplayInfo />
      <Map />
    </div>
  );
}

export default App;
