import React from "react";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";

export const FormContactoInmueble = () => {
  return (
    <div className="rounded-main border bg-secondary-main border-secondary-main/40 flex justify-center p-4">
      <div className=" p-2 sm:p-3 w-full max-w-lg">
        <h2 className="text-xlfont-medium font-TypographBold text-white-main mb-6">
          Contáctate para la casa en Satipo
        </h2>

        <form>
          {/* Email Field */}
          <div className="mb-5">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={`w-full p-3 border rounded-main text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary-main`}
              required
            />
          </div>

          {/* Name and Phone Fields */}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="flex-1">
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                className="w-full p-3 border rounded-main text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary-main"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="tel"
                id="telefono"
                placeholder="Teléfono"
                className="w-full p-3 border rounded-main text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary-main"
                required
              />
            </div>
          </div>

          {/* DNI Field */}
          <div className="mb-5">
            <input
              type="text"
              id="dni"
              placeholder="DNI"
              className="w-full p-3 border rounded-main text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary-main"
              required
            />
          </div>

          {/* Unit of Interest Dropdown */}
          {/* <div className="mb-5">
            <select
              id="unidad-interes"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Selecciona la unidad de interés</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="local">Local Comercial</option>
            </select>
          </div> */}

          {/* Message Textarea */}
          <div className="mb-6">
            <textarea
              id="mensaje"
              placeholder="Mensaje"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
              defaultValue="¡Hola! Quiero que se comuniquen conmigo por esta casa en venta que vi en SULCAPITAL."
            ></textarea>
          </div>

          {/* Checkboxes */}
          {/* <div className="mb-4 flex items-start">
            <input
              type="checkbox"
              id="acepto-terminos"
              className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 mr-2"
              defaultChecked // O checked si lo manejas con estado
              required
            />
            <label
              htmlFor="acepto-terminos"
              className="text-sm text-gray-700 leading-tight"
            >
              Acepto los{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Términos y Condiciones de Uso
              </a>
              , y las{" "}
              <a href="#" className="text-blue-600 hover:underline">
                políticas de privacidad
              </a>
              .
            </label>
          </div>

          <div className="mb-6 flex items-start">
            <input
              type="checkbox"
              id="autorizo-informacion"
              className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 mr-2"
              defaultChecked // O checked si lo manejas con estado
            />
            <label
              htmlFor="autorizo-informacion"
              className="text-sm text-gray-700 leading-tight"
            >
              Autorizo el uso de mi información para{" "}
              <a href="#" className="text-blue-600 hover:underline">
                fines adicionales
              </a>
            </label>
          </div> */}

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-primary-main hover:bg-primary-700 text-white-main font-medium py-3 px-6 rounded-main flex gap-2 items-center justify-center transition-colors duration-200"
            >
              <BsEnvelope />
              Contactar
            </button>
            <button
              type="button"
              className="bg-secondary-700 hover:bg-secondary-800 text-white-main font-medium py-3 px-6 rounded-main flex gap-2 items-center justify-center transition-colors duration-200"
            >
              <BsWhatsapp />
              Contactar por WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
