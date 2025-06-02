"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { config } from "@/assets/config/config";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const mapOptions = {
  styles: [
    // Puedes pegar aquí el estilo de Snazzy Maps o dejarlo vacío para el default
  ],
  disableDefaultUI: false,
};

function separarCoordenadas(coordenadas: string) {
  const partes = coordenadas.split(",");
  if (partes.length !== 2) {
    return null; // Retorna null si el formato no es válido
  }
  const latitud = parseFloat(partes[0].trim());
  const longitud = parseFloat(partes[1].trim());
  return { latitud, longitud };
}

export const UbicacionInmueble = ({
  coordenadas,
  direccion,
}: {
  coordenadas: string;
  direccion: string;
}) => {
  const coords = separarCoordenadas(coordenadas);
  const location = {
    lat: Number(coords?.latitud ?? 0),
    lng: Number(coords?.longitud ?? 0),
  };
  return (
    <>
      {coordenadas && coordenadas !== "" && (
        <div className="pt-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-xl text-secondary-main font-TypographBold mb-4">
              Ubicar en el mapa
            </p>
            <p className="text-sm text-black-900">{direccion}</p>
          </div>
          <div className="w-full rounded-main overflow-hidden">
            <LoadScript googleMapsApiKey={config.GOOGLE_MAPS_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={13}
                options={mapOptions}
              >
                <Marker position={location} label="Satipo" />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}
    </>
  );
};
