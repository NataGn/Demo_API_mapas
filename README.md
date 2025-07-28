# Demo API Mapas (Google Maps API)

# Este proyecto es una demostración del uso de la API de Google Maps con varias funcionalidades:
# - Búsqueda de direcciones con Autocomplete.
# - Rutas entre dos puntos (con distancia y tiempo).
# - Visualización de polígonos (simples y multi-polígonos).
# - Editor de polígonos con guardado en base de datos PostgreSQL.


# 1. REQUISITOS PREVIOS

# - Node.js >= 18.x
# - PostgreSQL >= 13
# - Una API KEY de Google Maps

# 2. CONFIGURAR LA BASE DE DATOS
# Conectarse a PostgreSQL:
psql -U postgres

# Crear la base de datos:
CREATE DATABASE mapasdb;

# Salir de psql:
\q

# Ejecutar el script para crear la tabla `poligonos`:
psql -U postgres -d mapasdb -f scripts/00_create_database.sql

# 3. VARIABLES DE ENTORNO
# Crear archivo .env en backend-mapas:
cat > backend-mapas/.env <<EOL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=TU_CONTRASEÑA
DB_NAME=mapasdb
PORT=3001
EOL

# Crear archivo .env en mapa-demo con tu API KEY:
cat > mapa-demo/.env <<EOL
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY
EOL

# 4. INICIAR EL BACKEND
cd backend-mapas
npm install
node index.js
# El backend estará en: http://localhost:3001

# 5. INICIAR EL FRONTEND
cd ../mapa-demo
npm install
npm run dev
# Abrir la URL que aparezca en la terminal (por ejemplo, http://localhost:5173)
