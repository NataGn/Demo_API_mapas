-- Crear la base de datos
CREATE DATABASE mapasdb;

-- Conectarse a la base (en psql usar: \c mapasdb)

-- Crear la tabla poligonos
CREATE TABLE public.poligonos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    coordenadas JSONB NOT NULL
);
