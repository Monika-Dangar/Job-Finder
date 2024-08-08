import React, { useState } from "react";

const FilterLocation = ({ initialSelectedLocations, onLocationChange }) => {
  // Manage the selected locations state locally
  const [selectedLocations, setSelectedLocations] = useState(
    initialSelectedLocations
  );

  // Define the list of available locations
  const locations = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad"];

  // Handle the change in selected locations
  const handleLocationChange = (location) => {
    // Update the selected locations based on the checkbox state
    const updatedLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((loc) => loc !== location)
      : [...selectedLocations, location];

    setSelectedLocations(updatedLocations);
    // Notify parent about the change
    onLocationChange(updatedLocations);
  };

  return (
    <div className="filter-card bg-white p-4 rounded-lg shadow-md mb-4">
      <h4>Location</h4>
      {locations.map((location) => (
        <div key={location} className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            id={`location-${location}`}
            checked={selectedLocations.includes(location)}
            onChange={() => handleLocationChange(location)}
          />
          <label htmlFor={`location-${location}`}>{location}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterLocation;
