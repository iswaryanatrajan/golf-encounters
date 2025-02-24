import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventContextStore } from "../contexts/eventContext"; // Ensure correct import

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY_MAPS; // ✅ Load from .env

interface Event {
  id: number;
  creator: {
    id: number;
    nickName: string;
    imageUrl: string;
  };
  isFavorite: boolean;
  comments: any[];
  eventStartDate: string;
  eventEndDate: string;
  eventName: string;
  eventDetails: string;
  eventType: string;
  eventVideoUrl: string;
  imageUrl: string[];
  place: string;  // ✅ Ensure this property exists!
}

const loadGoogleMapsScript = (apiKey: string) => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject("Google Maps API failed to load.");
    document.body.appendChild(script);
  });
};

const EventMap: React.FC = () => {
  const navigate = useNavigate();
  const { eventss }: { eventss: Event[] } = eventContextStore();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false); 


  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setGoogleLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setGoogleLoaded(true);
      script.onerror = () => console.error("Google Maps API failed to load.");
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

 

  useEffect(() => {
    if (googleLoaded) {
      const mapElement = document.getElementById("map");
      if (mapElement && window.google) {
        const newMap = new google.maps.Map(mapElement as HTMLElement, {
          center: { lat: 35.6895, lng: 139.6917 }, // Default to Tokyo
          zoom: 5.5,
        });

        setMap(newMap);
      }
    }
  }, [googleLoaded]);

  useEffect(() => {
    if (!map || !googleLoaded) return;
    if (map) {
      const geocoder = new google.maps.Geocoder();
      const locationEventsMap = new Map<string, Event[]>(); // Group events by location


      eventss.forEach((event: Event) => {
        if (event?.place) {
          if (!locationEventsMap.has(event.place)) {
            locationEventsMap.set(event.place, []);
          }
          locationEventsMap.get(event.place)?.push(event);
        }
      });

      locationEventsMap.forEach((events, place) => {
        geocodeAddress(place, geocoder, map, events);
      });
    }
  }, [map, googleLoaded, eventss]);

  const geocodeAddress = (address: string, geocoder: google.maps.Geocoder, map: google.maps.Map, events: Event[]) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0].geometry.location) {
        const location = results[0].geometry.location;

        const marker = new google.maps.Marker({
          map,
          position: location,
        });

        const infoWindow = new google.maps.InfoWindow({
          /*content: 
          <div>
          <h3>📍 ${address}</h3> 
          <hr/>
          ${events
            .map(
              (e) => `<h4 class="event-link" data-id="${e.id}" style="cursor:pointer;color:blue;">
                        ${e.eventName}
                      </h4>`
            )
            .join("<hr/>")}
        </div>
        ,*/
          content: events
            .map(
              (e) => `<h4 class="event-link" data-id="${e.id}" style="cursor:pointer;color:blue;">${e.eventName}</h4>`
            )
            .join("<hr/>"),
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);

          setTimeout(() => {
            document.querySelectorAll(".event-link").forEach((el) => {
              el.addEventListener("click", (event) => {
                const eventId = (event.target as HTMLElement).getAttribute("data-id");
                if (eventId) {
                  navigate(`/edit-team/${eventId}`); // ✅ Navigate to event details page
                }
              });
            });
          }, 100);
        });
      } else {
        console.error(`Geocode failed for ${address}: ${status}`);
      }
    });
  };

  return <div id="map" style={{ width: "100%", height: "80%" }} />;
};

export default EventMap;
