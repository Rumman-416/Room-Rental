import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const LocationSelector = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDGHXNN59XIyBbNVNo4QRVmkHGtVFieNh8",
  });

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: "15rem", height: "300px" }}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
      <button onClick={handleConfirmLocation}>Confirm Location</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default LocationSelector;
