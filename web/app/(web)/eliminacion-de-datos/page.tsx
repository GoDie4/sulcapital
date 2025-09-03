import { BannerInternas } from "../../_components/estructura/BannerInternas";

export default function SolicitudEliminacionDatos() {
  return (
    <>
      <BannerInternas
        image="/images/fondos/fondo_ubicaciones.webp"
        title="Eliminación de datos"
      />
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">
          Solicitud de Eliminación de Datos Personales
        </h1>

        <p className="mb-4">
          En <strong>Sulcapital Perú SAC</strong> respetamos tu derecho a la
          protección de tus datos personales. Aunque actualmente{" "}
          <strong>no contamos con una funcionalidad automática</strong> para
          eliminar cuentas desde la plataforma, puedes ejercer tu derecho a la
          eliminación ({'"'}derecho de supresión{'"'}) solicitándolo por correo
          electrónico.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          ¿Cómo solicitar la eliminación?
        </h2>
        <p className="mb-4">
          Para que podamos atender tu solicitud de forma segura, envía un correo
          electrónico a:
        </p>

        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
          <p>
            <strong>Correo de contacto:</strong>{" "}
            <a
              href="mailto:contacto@sulcapital.pe"
              className="text-blue-600 underline"
            >
              contacto@sulcapital.pe
            </a>
          </p>
        </div>

        <p className="mb-4">Incluye obligatoriamente los siguientes datos:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Nombres completos</li>
          <li>Apellidos</li>
          <li>Número de celular registrado</li>
          <li>Correo electrónico con el que te registraste</li>
        </ul>

        <p className="mb-4">
          Una vez verificada tu identidad, procederemos con la eliminación
          manual de tus datos en un plazo máximo de{" "}
          <strong>15 días hábiles</strong>, siempre que no existan obligaciones
          legales que nos obliguen a conservarlos.
        </p>

        <p className="mb-4 text-sm text-gray-600 italic">
          * Nos reservamos el derecho de conservar ciertos datos por motivos
          legales, contractuales o de prevención de fraude, de conformidad con
          la legislación peruana.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          ¿Qué datos se eliminarán?
        </h2>
        <p className="mb-4">
          Se eliminarán los datos personales vinculados a tu cuenta, incluidos:
          nombres, apellidos, celular, correo, contraseña cifrada y
          publicaciones asociadas. Sin embargo, parte de la información puede
          permanecer de forma anonimizada para fines estadísticos o legales.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">¿Tienes dudas?</h2>
        <p>
          Si necesitas más información antes de enviar tu solicitud, puedes
          escribirnos al mismo correo indicado. Estamos comprometidos con la
          protección de tus datos y responderemos lo antes posible.
        </p>
      </div>
    </>
  );
}
