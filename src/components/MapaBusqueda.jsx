import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  height: "600px",
  borderRadius: "10px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)",
  margin: "20px auto",
};

const libraries = ["places"];

export default function MapaConBusqueda() {
  const [posicion, setPosicion] = useState(null);
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !window.google) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["geocode"] }
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const loc = place.geometry.location;
        setPosicion({ lat: loc.lat(), lng: loc.lng() });
      }
    });
  }, [isLoaded]);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe una dirección"
      />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={posicion || { lat: 17.0617, lng: -96.7211 }}
        zoom={posicion ? 15 : 13}
      >
        {posicion && <Marker position={posicion} />}
      </GoogleMap>
    </div>
  );
}
