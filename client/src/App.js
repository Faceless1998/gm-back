import React, { useState } from "react";
import "./App.css";
import "./EditApartmentForm.css";

function App() {
  const [blockSelected, setBlockSelected] = useState(null);
  const [floorSelected, setFloorSelected] = useState(null);
  const [apartmentSelected, setApartmentSelected] = useState(null);

  const blockData = {
    A: { floors: [1, 2, 3, 4], apartments: [101, 102, 103, 104, 105] },
    B: { floors: [1, 2, 3], apartments: [201, 202, 203, 204] },
    C: { floors: [1, 2], apartments: [301, 302] },
  };

  const handleBlockSelect = (block) => {
    setBlockSelected(block);
    setFloorSelected(null);
    setApartmentSelected(null);
  };

  const handleFloorSelect = (floor) => {
    setFloorSelected(floor);
    setApartmentSelected(null);
  };

  const handleApartmentSelect = (apartment) => {
    setApartmentSelected(apartment);
  };

  const handleBackToBlockSelection = () => {
    setBlockSelected(null);
    setFloorSelected(null);
    setApartmentSelected(null);
  };

  return (
    <div className="App">
      <h1>{floorSelected ? "Welcome" : "Edit Apartment"}</h1>

      {blockSelected && (
        <button className="back-button" onClick={handleBackToBlockSelection}>
          Back to Block Selection
        </button>
      )}

      {!blockSelected ? (
        <div className="block-selection">
          <h3>Select Block</h3>
          <div className="block-options">
            {["A", "B", "C"].map((block) => (
              <div
                key={block}
                className={`block ${blockSelected === block ? "selected" : ""}`}
                onClick={() => handleBlockSelect(block)}
              >
                Block {block}
              </div>
            ))}
          </div>
        </div>
      ) : !floorSelected ? (
        <div className="floor-selection">
          <h3>Select Floor in Block {blockSelected}</h3>
          <div className="floor-options">
            {blockData[blockSelected].floors.map((floor) => (
              <div
                key={floor}
                className={`floor ${floorSelected === floor ? "selected" : ""}`}
                onClick={() => handleFloorSelect(floor)}
              >
                Floor {floor}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="apartment-selection">
          <h3>Select Apartment on Floor {floorSelected}</h3>
          <div className="apartment-options">
            {blockData[blockSelected].apartments.map((apartmentNumber) => (
              <div
                key={apartmentNumber}
                className={`apartment ${
                  apartmentSelected === apartmentNumber ? "selected" : ""
                }`}
                onClick={() => handleApartmentSelect(apartmentNumber)}
              >
                Apartment {apartmentNumber}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;