/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { initialFiltros } from "./FiltrosBusqueda";

export const ResultadosText = ({
  dataFiltrosActivos,
  data,
}: {
  dataFiltrosActivos: initialFiltros;
  data: any;
}) => {
  return (
    <p>
      {dataFiltrosActivos.tipo_propiedad ||
      dataFiltrosActivos.ciudad ||
      dataFiltrosActivos.disponibilidad ? (
        <>
          {data.length} resultados para{" "}
          {/*
        1) Si existe tipo_propiedad, muéstralo primero en negrita:
      */}
          {dataFiltrosActivos.tipo_propiedad && (
            <strong>{dataFiltrosActivos.tipo_propiedad}</strong>
          )}
          {/*
        2) Si no hay tipo_propiedad pero sí ciudad, muéstrala sola en negrita:
      */}
          {!dataFiltrosActivos.tipo_propiedad && dataFiltrosActivos.ciudad && (
            <strong>{dataFiltrosActivos.ciudad}</strong>
          )}
          {/*
        3) Si no hay ni tipo_propiedad ni ciudad, pero hay disponibilidad:
           muéstrala sola en negrita:
      */}
          {!dataFiltrosActivos.tipo_propiedad &&
            !dataFiltrosActivos.ciudad &&
            dataFiltrosActivos.disponibilidad && (
              <strong>
                {dataFiltrosActivos.disponibilidad === "EN_ALQUILER"
                  ? "Alquiler"
                  : dataFiltrosActivos.disponibilidad === "EN_COMPRA"
                  ? "Compra"
                  : dataFiltrosActivos.disponibilidad === "EN_VENTA"
                  ? "Venta"
                  : dataFiltrosActivos.disponibilidad}
              </strong>
            )}
          {/*
        4) Si existen tipo_propiedad y ciudad juntos, antepón " en " antes de ciudad:
      */}
          {dataFiltrosActivos.tipo_propiedad && dataFiltrosActivos.ciudad && (
            <>
              {" en "}
              <strong>{dataFiltrosActivos.ciudad}</strong>
            </>
          )}
          {/*
        5) Si al menos uno de tipo_propiedad o ciudad existe, y además hay disponibilidad,
           antepón ", disponibilidad: " antes del valor traducido:
      */}
          {(dataFiltrosActivos.tipo_propiedad || dataFiltrosActivos.ciudad) &&
            dataFiltrosActivos.disponibilidad && (
              <>
                {", disponibilidad: "}
                <strong>
                  {dataFiltrosActivos.disponibilidad === "EN_ALQUILER"
                    ? "Alquiler"
                    : dataFiltrosActivos.disponibilidad === "EN_COMPRA"
                    ? "Compra"
                    : dataFiltrosActivos.disponibilidad === "EN_VENTA"
                    ? "Venta"
                    : dataFiltrosActivos.disponibilidad}
                </strong>
              </>
            )}
        </>
      ) : (
        <>{data.length} resultados</>
      )}
    </p>
  );
};
