"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { config } from "@/assets/config/config";

interface LocationMap {
  lat: number;
  lng: number;
  label?: string;
}

const ubicaciones: LocationMap[] = [
  { lat: -11.1262, lng: -75.3365, label: "Pichanaki" },
  { lat: -11.2535, lng: -74.6381, label: "Satipo" },
  { lat: -11.1501, lng: -74.7389, label: "Río Negro" },
  { lat: -11.2544, lng: -74.7923, label: "Mazamari" },
  { lat: -11.1804, lng: -74.3152, label: "Pangoa" },
  { lat: -11.0642, lng: -75.3209, label: "La Merced" },
  { lat: -11.0797, lng: -75.2849, label: "Perené" },
  { lat: -11.0985, lng: -75.2239, label: "Sangani" },
  { lat: -11.1252, lng: -75.3548, label: "San Ramón" },
  { lat: -10.7301, lng: -75.2667, label: "Villa Rica" },
  { lat: -10.5755, lng: -75.4056, label: "Oxapampa" },
  { lat: -11.1053, lng: -74.6756, label: "Puerto Ocopa" },
];

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: -11.0985,
  lng: -75.2239,
};

const mapStyles = [
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: false,
};

export const MapaGeneral = () => {

  return (
    <LoadScript googleMapsApiKey={config.GOOGLE_MAPS_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
      >
        {ubicaciones.map((ubicacion, index) => (
          <Marker
            key={index}
            position={{ lat: ubicacion.lat, lng: ubicacion.lng }}
            //label={ubicacion.label}
            icon={"/images/logo/mapa.png"}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
