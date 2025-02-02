import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 35.6895, // Default latitude (Tokyo)
  lng: 139.6917, // Default longitude (Tokyo)
};

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; 

const GoogleMapComponent = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // Store selected location

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address || place.name,
        };

        // Update state
        setMapCenter({ lat: location.lat, lng: location.lng });
        setMarkerPosition({ lat: location.lat, lng: location.lng });
        setSelectedLocation(location);

        // Save location in local storage
        localStorage.setItem("selectedLocation", JSON.stringify(location));
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="" libraries={["places"]}>
      <div>
        <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a location..."
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              fontSize: "16px",
            }}
          />
        </Autocomplete>

        <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={14}>
          <Marker position={markerPosition} />
        </GoogleMap>

        {selectedLocation && (
          <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd" }}>
            <h3>Selected Location</h3>
            <p><strong>Address:</strong> {selectedLocation.address}</p>
            <p><strong>Latitude:</strong> {selectedLocation.lat}</p>
            <p><strong>Longitude:</strong> {selectedLocation.lng}</p>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
