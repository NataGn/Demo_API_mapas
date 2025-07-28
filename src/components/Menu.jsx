import { useState } from "react";

import MapaConBusqueda from "./MapaBusqueda";
import MapaRutas from "./MapaRutas";
import MapaRutasDetalles from "./MapaRutasDetalles";
import MapaPoligonoFijo from "./MapaPoligonoFijo";
import MapaMultiPoligono from "./MapaMultiPoligono";
import MapaSeleccionMunicipios from "./MapaSeleccionMunicipios";
import Mapa from "./Mapa";
import EditorMultiPoligonos from "./EditorMultiPoligonos";

const opciones = [
  "1. Buscar dirección",
  "2. Rutas",
  "3. Distancia y peajes",
  "4. Polígono fijo",
  "5. Multi-Poligonos",
  "6. Mapa Seleccion ",
  "7. Editor de poligonos ",
  "8. Editor Multipoligonos"
];

export default function Menu() {
  const [vista, setVista] = useState(1);

  return (
    <div className="menu-container">
      {/* Barra lateral */}
      <aside className="sidebar">
        <div>
          <h2>
            Demo de uso de mapas <br />
            (API de Google Maps)
          </h2>
          <ul className="menu-list">
            {opciones.map((opcion, index) => (
              <li key={index} className="menu-item">
                <button
                  onClick={() => setVista(index + 1)}
                  className={`menu-button ${vista === index + 1 ? "active" : ""}`}
                >
                  {opcion}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <footer>
          <p>Desarrollado por:</p>
          <strong>Oswaldo</strong>
        </footer>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        {vista === 1 && <MapaConBusqueda />}
        {vista === 2 && <MapaRutas />}
        {vista === 3 && <MapaRutasDetalles />}
        {vista === 4 && <MapaPoligonoFijo />}
        {vista === 5 && <MapaMultiPoligono/>}
        {vista === 6 && <MapaSeleccionMunicipios/>}
        {vista === 7 && <Mapa/>}
        {vista === 8 && <EditorMultiPoligonos/>}
      </main>
    </div>
  );
}
