import { GoogleMap, useLoadScript, DrawingManager, Polygon } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 17.0617, lng: -96.7211 };
const libraries = ["drawing", "geometry", "places"];

export default function EditorMultiPoligonos() {
  const [multiPoligono, setMultiPoligono] = useState([]); // Varios polígonos dibujados
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error al cargar mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  // Cuando se termina de dibujar un polígono
  const handlePolygonComplete = (polygon) => {
    const path = polygon.getPath().getArray().map(latlng => ({
      lat: latlng.lat(),
      lng: latlng.lng(),
    }));
    setMultiPoligono((prev) => [...prev, path]);
  };

  // Guardar todos los polígonos dibujados como un solo multi-polígono en BD
  const guardarMultiPoligono = () => {
    if (multiPoligono.length === 0) {
      alert("No hay polígonos para guardar");
      return;
    }

    fetch("http://localhost:3001/poligonos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: "Multi-polígono",
        coordenadas: multiPoligono, // Se manda el array de arrays
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Multi-polígono guardado en la base de datos");
        setGuardadoExitoso(true);
      })
      .catch((err) => console.error("Error al guardar:", err));
  };

  // Limpiar lo dibujado en pantalla
  const limpiar = () => {
    setMultiPoligono([]);
    setGuardadoExitoso(false);
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={guardarMultiPoligono} style={{ marginRight: "10px" }}>
          Guardar Multi-Polígono
        </button>
        <button onClick={limpiar}>Limpiar Dibujos</button>
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <DrawingManager
          onPolygonComplete={handlePolygonComplete}
          options={{
            drawingControl: true,
            drawingControlOptions: { drawingModes: ["polygon"] },
            polygonOptions: {
              fillColor: "#9C27B0",
              fillOpacity: 0.5,
              strokeColor: "#6A1B9A",
              strokeWeight: 2,
            },
          }}
        />
        {multiPoligono.map((coords, idx) => (
          <Polygon key={idx} paths={coords} options={{ fillColor: "#9C27B0", fillOpacity: 0.5 }} />
        ))}
      </GoogleMap>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        {multiPoligono.length > 0 ? (
          <div>
            <p><strong>Tipo:</strong> Multi-polígono ({multiPoligono.length} polígonos)</p>
            {multiPoligono.map((poly, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <strong>Polígono {idx + 1}:</strong>
                <ul style={{ textAlign: "left", display: "inline-block" }}>
                  {poly.map((c, i) => (
                    <li key={i}>Lat: {c.lat.toFixed(6)}, Lng: {c.lng.toFixed(6)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : <p>No hay polígonos dibujados.</p>}

      </div>
    </div>
  );
}
