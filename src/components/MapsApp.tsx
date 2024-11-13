import React, { useState, useEffect } from 'react';
import LOS_ANGELES_CENTER from '../utils/initialMap';
import Marker from './MapMarker';
import GoogleMapReact from 'google-map-react';

interface Place {
  id: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const MapsApp: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  const fetchPlaces = async () => {
    try {
      const response = await fetch('places.json');
      const data: { results: Place[] } = await response.json();
      setPlaces(data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (!places || places.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full">
      
      <GoogleMapReact defaultZoom={10} defaultCenter={LOS_ANGELES_CENTER}>
        {places.map((place) => (
          <Marker
            key={place.id}
            text={place.name}
            lat={place.geometry.location.lat}
            lng={place.geometry.location.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapsApp;
