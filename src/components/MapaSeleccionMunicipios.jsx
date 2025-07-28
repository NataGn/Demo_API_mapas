import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = { lat: 17.0617, lng: -96.7211 };

export default function MapaSeleccionMunicipios() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Lista de municipios con polígonos y multi-polígonos
  const municipios = [
    {
      nombre: "Oaxaca de Juárez",
      color: "#FF5722",
      zonas: [
        [
          { lat: 17.06, lng: -96.72 },
          { lat: 17.065, lng: -96.715 },
          { lat: 17.07, lng: -96.72 },
          { lat: 17.065, lng: -96.725 },
        ],
      ],
    },
    {
      nombre: "Xoxocotlán",
      color: "#4CAF50",
      zonas: [
        [
          { lat: 17.03, lng: -96.72 },
          { lat: 17.035, lng: -96.715 },
          { lat: 17.04, lng: -96.72 },
          { lat: 17.035, lng: -96.725 },
        ],
        [
          { lat: 17.02, lng: -96.73 },
          { lat: 17.025, lng: -96.728 },
          { lat: 17.022, lng: -96.726 },
        ],
      ],
    },
    {
      nombre: "Etla",
      color: "#2196F3",
      zonas: [
        [
          { lat: 17.15, lng: -96.80 },
          { lat: 17.155, lng: -96.795 },
          { lat: 17.16, lng: -96.80 },
          { lat: 17.155, lng: -96.805 },
        ],
      ],
    },
    {
      nombre: "Mitla",
      color: "#9C27B0",
      zonas: [
        [
          { lat: 16.92, lng: -96.35 },
          { lat: 16.925, lng: -96.345 },
          { lat: 16.93, lng: -96.35 },
        ],
        [
          { lat: 16.915, lng: -96.36 },
          { lat: 16.91, lng: -96.355 },
          { lat: 16.915, lng: -96.35 },
        ],
        [
          { lat: 16.935, lng: -96.34 },
          { lat: 16.93, lng: -96.335 },
          { lat: 16.935, lng: -96.33 },
        ],
      ],
    },
    {
      nombre: "Zachila",
      color: "#FF9800",
      zonas: [
        [
          { lat: 16.95, lng: -96.75 },
          { lat: 16.955, lng: -96.745 },
          { lat: 16.96, lng: -96.75 },
        ],
        [
          { lat: 16.94, lng: -96.76 },
          { lat: 16.945, lng: -96.755 },
          { lat: 16.94, lng: -96.75 },
        ],
      ],
    },
    {
      nombre: "Cuilápam de Guerrero",
      color: "#795548",
      zonas: [
        [
          { lat: 17.03, lng: -96.75 },
          { lat: 17.035, lng: -96.745 },
          { lat: 17.04, lng: -96.75 },
          { lat: 17.035, lng: -96.755 },
        ],
      ],
    },
  ];

  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);

  const handleClickMunicipio = (nombre) => {
    setMunicipioSeleccionado(nombre);
  };

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Selección de Municipios
      </h3>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {municipios.map((mun, index) =>
          mun.zonas.map((zona, idx) => (
            <Polygon
              key={`${index}-${idx}`}
              paths={zona}
              options={{
                fillColor:
                  municipioSeleccionado === mun.nombre ? "#FFFF00" : mun.color,
                fillOpacity: 0.5,
                strokeColor:
                  municipioSeleccionado === mun.nombre ? "#FFD700" : mun.color,
                strokeWeight: 2,
              }}
              onClick={() => handleClickMunicipio(mun.nombre)}
            />
          ))
        )}
      </GoogleMap>

      {municipioSeleccionado && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h4>Municipio seleccionado: {municipioSeleccionado}</h4>
        </div>
      )}
    </div>
  );
}
