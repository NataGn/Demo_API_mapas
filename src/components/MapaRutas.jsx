import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
    width: "1500px",
    height: "700px",
};

const center = {
  lat: 17.0617,
  lng: -96.7211,
};

const libraries = ["places"];

export default function MapaRutas() {
  const [directions, setDirections] = useState(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    // Autocomplete en los inputs
    const options = { types: ["geocode"] };
    new window.google.maps.places.Autocomplete(originRef.current, options);
    new window.google.maps.places.Autocomplete(destinationRef.current, options);
  }, [isLoaded]);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  const calcularRuta = () => {
    if (!originRef.current.value || !destinationRef.current.value) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          alert("No se pudo calcular la ruta: " + status);
        }
      }
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <input
          ref={originRef}
          type="text"
          placeholder="Origen"
          style={{ marginRight: "10px", padding: "5px", }}
        />
        <input
          ref={destinationRef}
          type="text"
          placeholder="Destino"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={calcularRuta}>Mostrar Ruta</button>
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
