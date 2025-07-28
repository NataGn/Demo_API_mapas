import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
    width: "1500px",
    height: "700px",
};

// Lista de polígonos de ejemplo (3 zonas)
const poligonosEjemplo = [
  {
    nombre: "Colonia Volcanes",
    coords: [
      { lat: 17.070, lng: -96.725 },
      { lat: 17.068, lng: -96.723 },
      { lat: 17.067, lng: -96.726 },
      { lat: 17.069, lng: -96.728 },
    ],
  },
  {
    nombre: "Centro Oaxaca",
    coords: [
      { lat: 17.062, lng: -96.723 },
      { lat: 17.061, lng: -96.722 },
      { lat: 17.060, lng: -96.724 },
      { lat: 17.061, lng: -96.725 },
    ],
  },
  {
    nombre: "Barrio de Xochimilco",
    coords: [
      { lat: 17.075, lng: -96.725 },
      { lat: 17.074, lng: -96.723 },
      { lat: 17.073, lng: -96.726 },
      { lat: 17.074, lng: -96.728 },
    ],
  },
];

// Centro por defecto
const center = {
  lat: 17.0617,
  lng: -96.7211,
};

export default function MapaPoligonoFijo() {
  const [poligonoActual, setPoligonoActual] = useState(poligonosEjemplo[0]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Seleccionar un polígono aleatorio
  const cambiarPoligono = () => {
    let random = Math.floor(Math.random() * poligonosEjemplo.length);
    // Evitar que salga el mismo
    while (poligonosEjemplo[random].nombre === poligonoActual.nombre) {
      random = Math.floor(Math.random() * poligonosEjemplo.length);
    }
    setPoligonoActual(poligonosEjemplo[random]);
  };

  useEffect(() => {
    cambiarPoligono(); // al cargar el componente, selecciona uno aleatorio
  }, []);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div>
      <h3 className="titulo-mapa">
        Mostrando: {poligonoActual.nombre}
      </h3>
  
      <div className="contenedor-boton">
        <button onClick={cambiarPoligono}>
          Mostrar otro polígono
        </button>
      </div>
  
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Polygon
          paths={poligonoActual.coords}
          options={{
            fillColor: "#FF0000",
            fillOpacity: 0.4,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </div>
  );
  
}
