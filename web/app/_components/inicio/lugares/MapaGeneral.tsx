/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { config } from "@/assets/config/config";

// interface LocationMap {
//   lat: number;
//   lng: number;
//   label?: string;
// }

// const ubicaciones: LocationMap[] = [
//   { lat: -10.926705725305794, lng: -74.87448722511888, label: "Pichanaki" },
//   { lat: -10.926705725305794, lng: -74.87448722511888, label: "Satipo" },
//   { lat: -11.208215929563803, lng: -74.66029180274616, label: "Río Negro" },
//   { lat: -11.331984984414769, lng: -74.52983584832505, label: "Mazamari" },
//   { lat: -11.432433757749802, lng: -74.48471309790122, label: "Pangoa" },
//   { lat: -11.062091032272436, lng: -75.3324377054606, label: "La Merced" },
//   { lat: -10.951125872836467, lng: -75.22847315077809, label: "Perené" },
//   { lat: -10.921704280328381, lng: -74.88018208623592, label: "Sangani" },
//   { lat: -11.126232847694009, lng: -75.36088974808607, label: "San Ramón" },
//   { lat: -10.739059810976599, lng: -75.27440684441615, label: "Villa Rica" },
//   { lat: -10.574296111675373, lng: -75.40115220569004, label: "Oxapampa" },
//   { lat: -11.141897364483542, lng: -74.30937773171728, label: "Puerto Ocopa" },
// ];

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

export const MapaGeneral = ({ dataCiudades }: { dataCiudades: any[] }) => {
  const formatearUbicaciones = (datos: any[]) => {
    return datos.map(({ coordenadas, nombre }) => {
      const [latStr, lngStr] = coordenadas.split(",");
      return {
        lat: parseFloat(latStr.trim()),
        lng: parseFloat(lngStr.trim()),
        label: nombre,
      };
    });
  };

  const ubicacionesFormateadas = formatearUbicaciones(dataCiudades);
  return (
    <LoadScript googleMapsApiKey={config.GOOGLE_MAPS_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
      >
        {ubicacionesFormateadas.map((ubicacion, index) => (
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
