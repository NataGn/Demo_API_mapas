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

export default function MapaRutasDetalles() {
  const [directions, setDirections] = useState(null);
  const [distancia, setDistancia] = useState("");
  const [duracion, setDuracion] = useState("");
  const [hayPeajes, setHayPeajes] = useState(false);
  const [costo, setCosto] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;
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

          const leg = result.routes[0].legs[0];
          setDistancia(leg.distance.text);
          setDuracion(leg.duration.text);

          // Verificar si hay peajes (warnings)
          const tienePeajes = result.routes[0].warnings.some(w =>
            w.toLowerCase().includes("toll")
          );
          setHayPeajes(tienePeajes);
        } else {
          alert("No se pudo calcular la ruta: " + status);
        }
      }
    );
  };

  return (
    <div>
      <div className="contenedor-rutas">
        <input
          ref={originRef}
          type="text"
          placeholder="Origen"
        />
        <input
          ref={destinationRef}
          type="text"
          placeholder="Destino"
        />
        <button onClick={calcularRuta}>Mostrar Ruta</button>
      </div>
  
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
  
      {(distancia || duracion) && (
        <div className="info-rutas">
          <p><strong>Distancia:</strong> {distancia}</p>
          <p><strong>Tiempo estimado:</strong> {duracion}</p>
          {/* <p><strong>¿Hay peajes?:</strong> {hayPeajes ? "Sí" : "No"}</p> */}
          {hayPeajes && (
            <div className="costo-peaje">
              <label>
                Ingresar costo de casetas:
                <input
                  type="text"
                  value={costo}
                  onChange={e => setCosto(e.target.value)}
                  placeholder="Ej. $120 MXN"
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  
}
