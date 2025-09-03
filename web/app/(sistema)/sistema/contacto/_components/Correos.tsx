import React, { type SetStateAction } from 'react'

export interface CorreosItem {
  correo: string
  position: number
}

export const Correos = ({
  correos,
  setCorreos
}: {
  correos: CorreosItem[]
  setCorreos: React.Dispatch<SetStateAction<CorreosItem[]>>
}) => {
  const handleAddCorreo = (): void => {
    if (correos.length < 6) {
      setCorreos((prevCorreo) => [
        ...prevCorreo,
        { correo: '', position: prevCorreo.length + 1 }
      ])
    }
  }

  const handleCorreoChange = (index: number, correo: string): void => {
    const newCorreo = [...correos]
    newCorreo[index].correo = correo
    setCorreos(newCorreo)
  }

  const eliminarItemPorIndex = (index: number): void => {
    const updatedCorreos = correos
      .filter((_, i) => i !== index)
      .map((item, idx) => ({
        ...item,
        position: idx + 1 // Reasigna posiciones
      }))
    setCorreos(updatedCorreos)
  }

  const handlePositionChange = (index: number, newPosition: number): void => {
    const updatedCorreos = [...correos]
    const [movedItem] = updatedCorreos.splice(index, 1) // Elimina el elemento de la posición original
    updatedCorreos.splice(newPosition - 1, 0, movedItem) // Inserta en la nueva posición

    // Reasigna la posición para cada elemento en base a su índice
    const reorderedCorreos = updatedCorreos.map((item, idx) => ({
      ...item,
      position: idx + 1
    }))

    setCorreos(reorderedCorreos)
  }

  return (
    <>
      <div className="w-full flex items-center mb-0 sm:mb-1 flex-row gap-4 justify-between">
        <h2 className="text-secondary-main text-lg font-bold text-left font-TypographBold">Correos</h2>
        {correos.length < 4 && (
          <button
            type="button"
            className="bg-secondary-600  text-white-main flex h-fit w-fit text-sm p-2 rounded-lg"
            onClick={handleAddCorreo}
          >
            Añadir correo
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-between my-1">
        {correos.map((correo, index) => (
          <div
            key={index}
            className="flex    w-full lg:w-[49%] flex-col mb-2 border-secondary-900 relative"
          >
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  eliminarItemPorIndex(index)
                }}
                className="absolute top-0 right-0 text-red-500 underline"
              >
                Eliminar
              </button>
            )}
            <div className="flex flex-col mb-2">
              <label className="text-white">
                Correo {correo.position}
              </label>
              <div className="w-full flex items-center gap-4">
                <input
                  type="text"
                  value={correo.correo}
                  onChange={(e) => {
                    handleCorreoChange(index, e.target.value)
                  }}
                  className="border w-4/5 placeholder:text-sm focus:border-secondary-main outline-none text-sm  rounded-main py-2 px-3"
                />
                <select
                  value={correo.position}
                  onChange={(e) => {
                    handlePositionChange(index, parseInt(e.target.value, 10))
                  }}
                  className="border w-1/5 placeholder:text-sm focus:border-secondary-main outline-none rounded-main p-2 "
                >
                  {Array.from({ length: correos.length }, (_, i) => i + 1).map(
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
  )
}

export default Correos
