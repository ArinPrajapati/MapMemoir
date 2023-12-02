import React from "react";
import MapLayer from "./Layers/MapLayer";
import NavLayer from "./Layers/NavLayer";

const App = () => {
  return (
    <div>
      <NavLayer />
      <MapLayer />
    </div>
  );
};

export default App;
