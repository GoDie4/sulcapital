import React, { type SetStateAction } from "react";

export interface NumerosItem {
  numero: string;
  position: number;
}

export const Numeros = ({
  numeros,
  setNumeros,
}: {
  numeros: NumerosItem[];
  setNumeros: React.Dispatch<SetStateAction<NumerosItem[]>>;
}) => {
  const handleAddNumero = (): void => {
    if (numeros.length < 6) {
      setNumeros((prevNume) => [
        ...prevNume,
        { numero: "", position: prevNume.length + 1 },
      ]);
    }
  };

  const handleNumeroChange = (index: number, numero: string): void => {
    const newNumeros = [...numeros];
    newNumeros[index].numero = numero;
    setNumeros(newNumeros);
  };

  const eliminarItemPorIndex = (index: number): void => {
    const updatedNumeros = numeros
      .filter((_, i) => i !== index)
      .map((item, idx) => ({
        ...item,
        position: idx + 1, // Reasigna posiciones
      }));
    setNumeros(updatedNumeros);
  };

  const handlePositionChange = (index: number, newPosition: number): void => {
    const updatedNumeros = [...numeros];
    const [movedItem] = updatedNumeros.splice(index, 1); // Elimina el elemento de la posición original
    updatedNumeros.splice(newPosition - 1, 0, movedItem); // Inserta en la nueva posición

    // Reasigna la posición para cada elemento en base a su índice
    const reorderedNumeros = updatedNumeros.map((item, idx) => ({
      ...item,
      position: idx + 1,
    }));

    setNumeros(reorderedNumeros);
  };

  return (
    <>
      <div className="w-full flex items-center mb-0 sm:mb-1 flex-row gap-4 justify-between">
        <h2 className="text-secondary-main text-lg font-bold text-left font-TypographBold">Números</h2>
        {numeros.length < 3 && (
          <button
            type="button"
            className="bg-secondary-600  text-white-main flex h-fit w-fit text-sm p-2 rounded-lg"
            onClick={handleAddNumero}
          >
            Añadir número
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-between my-1">
        {numeros.map((numero, index) => (
          <div
            key={index}
            className="flex    w-full lg:w-[49%] flex-col mb-2 border-secondary-900 relative"
          >
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  eliminarItemPorIndex(index);
                }}
                className="absolute top-0 right-0 text-red-500 underline"
              >
                Eliminar
              </button>
            )}
            <div className="flex flex-col mb-2">
              <label className="text-white">Número {numero.position}</label>
              <div className="w-full flex items-center gap-4">
                <input
                  type="text"
                  value={numero.numero}
                  onChange={(e) => {
                    handleNumeroChange(index, e.target.value);
                  }}
                  className="border w-4/5 placeholder:text-sm focus:border-secondary-main outline-none text-sm  rounded-main py-2 px-3"
                />
                <select
                  value={numero.position}
                  onChange={(e) => {
                    handlePositionChange(index, parseInt(e.target.value, 10));
                  }}
                  className="w-1/5 border placeholder:text-sm focus:border-secondary-main outline-none rounded-main p-2 "
                >
                  {Array.from({ length: numeros.length }, (_, i) => i + 1).map(
                    (pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Numeros;
