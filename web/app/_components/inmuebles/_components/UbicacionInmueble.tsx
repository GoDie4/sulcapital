"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { config } from "@/assets/config/config";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const satipoLocation = {
  lat: -11.2535,
  lng: -74.6381,
};

const mapOptions = {
  styles: [
    // Puedes pegar aquí el estilo de Snazzy Maps o dejarlo vacío para el default
  ],
  disableDefaultUI: false,
};

export const UbicacionInmueble = () => {
  return (
    <div className="pt-4">
      <div className="w-full flex items-center justify-between">
        <p className="text-xl text-secondary-main font-TypographBold mb-4">
          Ubicar en el mapa
        </p>
        <p className="text-sm text-black-900">Jr. Los Pinos 456, Barrio El Milagro, Satipo, Junín.</p>
      </div>
      <div className="w-full rounded-main overflow-hidden">
        <LoadScript googleMapsApiKey={config.GOOGLE_MAPS_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={satipoLocation}
            zoom={13}
            options={mapOptions}
          >
            <Marker position={satipoLocation} label="Satipo" />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};
