/*import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "";

const MapComponent = ({ locations = [], zoom = 10 }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (locations.length > 0) {
      setMapCenter(locations[0]); // Center map to the first location
    }
  }, [locations]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap center={mapCenter} zoom={zoom} mapContainerStyle={{ width: "100%", height: "400px" }}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;*/