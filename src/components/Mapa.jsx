import { GoogleMap, useLoadScript, DrawingManager, Polygon } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 17.0617, lng: -96.7211 };
const libraries = ["drawing", "geometry", "places"];

export default function EditorPoligonos() {
  const [poligono, setPoligono] = useState(null); // Solo un polígono
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error al cargar mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  const handlePolygonComplete = (polygon) => {
    const path = polygon.getPath().getArray().map(latlng => ({
      lat: latlng.lat(),
      lng: latlng.lng(),
    }));
    setPoligono(path);

    // Guardar en BD
    fetch("http://localhost:3001/poligonos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: "Polígono simple", coordenadas: path }),
    }).catch(console.error);
  };

  const limpiar = () => setPoligono(null);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={limpiar}>Limpiar Dibujos</button>
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <DrawingManager
          onPolygonComplete={handlePolygonComplete}
          options={{ drawingControl: true, drawingControlOptions: { drawingModes: ["polygon"] } }}
        />
        {poligono && (
          <Polygon paths={poligono} options={{ fillColor: "#2196F3", fillOpacity: 0.5 }} />
        )}
      </GoogleMap>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        {poligono ? (
          <div>
            <p><strong>Tipo:</strong> Polígono simple</p>
            <ul style={{ textAlign: "left", display: "inline-block" }}>
              {poligono.map((c, i) => (
                <li key={i}>Lat: {c.lat.toFixed(6)}, Lng: {c.lng.toFixed(6)}</li>
              ))}
            </ul>
          </div>
        ) : <p>No hay polígonos dibujados.</p>}
      </div>
    </div>
  );
}
