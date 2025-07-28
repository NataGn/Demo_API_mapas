import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

// Centro aproximado entre ambos municipios
const center = { lat: 16.45, lng: -96.65 };

export default function MapaMultiMunicipios() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Ejutla de Crespo con 4 islas
  const ejutla = [
    [
      { lat: 16.58, lng: -96.75 },
      { lat: 16.57, lng: -96.74 },
      { lat: 16.58, lng: -96.73 },
    ],
    [
      { lat: 16.575, lng: -96.72 },
      { lat: 16.565, lng: -96.71 },
      { lat: 16.575, lng: -96.70 },
    ],
    [
      { lat: 16.56, lng: -96.76 },
      { lat: 16.55, lng: -96.755 },
      { lat: 16.555, lng: -96.74 },
    ],
    [
      { lat: 16.565, lng: -96.73 },
      { lat: 16.555, lng: -96.725 },
      { lat: 16.56, lng: -96.715 },
    ],
  ];

  // Miahuatlán con 4 islas
  const miahuatlan = [
    [
      { lat: 16.33, lng: -96.60 },
      { lat: 16.32, lng: -96.595 },
      { lat: 16.33, lng: -96.59 },
    ],
    [
      { lat: 16.325, lng: -96.58 },
      { lat: 16.315, lng: -96.575 },
      { lat: 16.32, lng: -96.565 },
    ],
    [
      { lat: 16.34, lng: -96.59 },
      { lat: 16.335, lng: -96.585 },
      { lat: 16.34, lng: -96.58 },
    ],
    [
      { lat: 16.31, lng: -96.61 },
      { lat: 16.305, lng: -96.60 },
      { lat: 16.31, lng: -96.59 },
    ],
  ];

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Municipios con Multi-Polígonos (4 islas cada uno)
      </h3>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Ejutla de Crespo */}
        <Polygon
          paths={ejutla}
          options={{
            fillColor: "#FF5722",
            fillOpacity: 0.4,
            strokeColor: "#E64A19",
            strokeWeight: 2,
          }}
        />

        {/* Miahuatlán */}
        <Polygon
          paths={miahuatlan}
          options={{
            fillColor: "#4CAF50",
            fillOpacity: 0.4,
            strokeColor: "#388E3C",
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </div>
  );
}
