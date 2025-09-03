import { BannerInternas } from "../../_components/estructura/BannerInternas";

export default function page() {
  return (
    <>
      <BannerInternas
        image="/images/fondos/fondo_vista.webp"
        title="Políticas de privacidad"
      />
      <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        <p className="mb-4">
          Fecha de última actualización: 12 de junio de 2025
        </p>

        <p className="mb-4">
          En <strong>Sulcapital Perú SAC</strong> (en adelante, {'"'}nosotros
          {'"'},{'"'}nuestro sitio{'"'}, {'"'}la empresa{'"'} o {'"'}la
          plataforma{'"'}
          ), reconocemos la importancia de proteger los datos personales de
          nuestros usuarios. Esta Política de Privacidad describe cómo
          recopilamos, usamos, almacenamos y protegemos tus datos personales
          cuando accedes y utilizas nuestra plataforma para publicar inmuebles.
        </p>

        <p className="mb-4">
          Al registrarte en nuestro sitio o utilizar nuestros servicios, aceptas
          esta Política de Privacidad.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          1. Responsable del tratamiento de los datos
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Razón social:</strong> Sulcapital Perú SAC
          </li>
          <li>
            <strong>Correo electrónico de contacto:</strong>{" "}
            contacto@sulcapital.pe
          </li>
          <li>
            <strong>Sitio web:</strong> www.sulcapital.pe
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          2. Datos personales que recopilamos
        </h2>
        <p className="mb-4">
          Recopilamos exclusivamente los datos que el usuario nos proporciona a
          través del formulario de registro y otros formularios relacionados con
          la publicación de inmuebles. Estos son:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Nombres</li>
          <li>Apellidos</li>
          <li>Correo electrónico</li>
          <li>Número de celular</li>
          <li>Contraseña (almacenada de forma cifrada)</li>
          <li>DNI (Documento Nacional de Identidad)</li>
          <li>
            Información sobre la intención del usuario (por ejemplo, si desea
            publicar, alquilar o vender un inmueble)
          </li>
        </ul>

        <p className="mb-4 italic">
          Nota: No recopilamos información financiera ni sensible. No
          solicitamos ubicación geográfica en tiempo real ni datos biométricos.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          3. Finalidades del tratamiento
        </h2>
        <p className="mb-4">
          Utilizamos tus datos personales para las siguientes finalidades:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Crear y gestionar tu cuenta de usuario</li>
          <li>
            Permitirte acceder y utilizar las funcionalidades de la plataforma
          </li>
          <li>
            Verificar tu identidad como parte de nuestras medidas de seguridad
          </li>
          <li>
            Facilitar la publicación de inmuebles y la interacción entre
            usuarios
          </li>
          <li>
            Enviarte notificaciones relacionadas con tu cuenta o publicaciones
          </li>
          <li>Cumplir con nuestras obligaciones legales y regulatorias</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          4. Conservación de los datos
        </h2>
        <p className="mb-4">
          Tus datos serán conservados mientras mantengas activa tu cuenta y
          mientras sea necesario para cumplir con obligaciones legales o
          contractuales. Actualmente,{" "}
          <strong>no ofrecemos la eliminación automática de cuentas</strong>,
          por lo que tus datos permanecerán en nuestros sistemas de forma
          indefinida, salvo que Sulcapital Perú SAC determine lo contrario en el
          futuro.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          5. Compartición de la información
        </h2>
        <p className="mb-4">
          No compartimos tus datos personales con terceros, salvo en los
          siguientes casos:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Proveedores que nos prestan servicios técnicos, de hosting,
            mensajería o mantenimiento bajo acuerdos de confidencialidad
          </li>
          <li>
            Requerimientos legales o mandatos de autoridades administrativas o
            judiciales
          </li>
          <li>
            Con tu consentimiento explícito, si fuera necesario para alguna
            funcionalidad específica
          </li>
        </ul>
        <p className="mb-4 font-semibold">
          Nunca vendemos ni alquilamos tus datos personales.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          6. Seguridad de la información
        </h2>
        <p className="mb-4">
          Adoptamos medidas técnicas, organizativas y legales razonables para
          proteger tus datos personales frente a accesos no autorizados,
          pérdidas, alteraciones o divulgaciones. Entre estas medidas se
          incluyen:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Cifrado de contraseñas y datos sensibles</li>
          <li>Accesos restringidos a bases de datos</li>
          <li>Uso de conexiones seguras (HTTPS)</li>
          <li>Políticas internas de protección de datos</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Uso de cookies</h2>
        <p className="mb-4">
          Nuestro sitio utiliza{" "}
          <strong>únicamente cookies técnicas esenciales</strong>, necesarias
          para el inicio de sesión y el funcionamiento básico del sistema. No
          utilizamos cookies publicitarias ni de terceros, ni realizamos
          seguimiento del comportamiento del usuario fuera de nuestra
          plataforma.
        </p>
        <p className="mb-4">
          Por tratarse de cookies esenciales, no se requiere un sistema de
          rechazo explícito.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          8. Derechos de los usuarios
        </h2>
        <p className="mb-4">
          Conforme a la Ley N.º 29733 (Ley de Protección de Datos Personales del
          Perú), tienes derecho a:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Acceder a tus datos personales</li>
          <li>Solicitar la rectificación de datos incorrectos</li>
          <li>Oponerte al tratamiento de tus datos para fines no esenciales</li>
          <li>Solicitar la eliminación de tus datos personales</li>
        </ul>

        <p className="mb-4">
          Si deseas ejercer alguno de estos derechos, en especial la eliminación
          de tu información, debes comunicarte al siguiente correo electrónico:
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

        <p className="mb-4">
          En el mensaje debes incluir los siguientes datos para verificar tu
          identidad:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Nombres completos</li>
          <li>Apellidos</li>
          <li>Número de celular registrado</li>
          <li>Correo electrónico utilizado en la cuenta</li>
        </ul>

        <p className="mb-4">
          La solicitud será evaluada y respondida en un plazo máximo de{" "}
          <strong>15 días hábiles</strong>. En ciertos casos, podríamos requerir
          conservar parte de la información por obligaciones legales o de
          seguridad.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          9. Modificaciones a esta política
        </h2>
        <p className="mb-4">
          Nos reservamos el derecho de modificar esta Política de Privacidad en
          cualquier momento para adaptarla a cambios normativos o funcionales de
          la plataforma. Las modificaciones serán notificadas a través de
          nuestro sitio web y, en su caso, mediante correo electrónico.
        </p>
        <p className="mb-4">
          Se recomienda revisar periódicamente esta política para estar
          informado sobre cómo protegemos tu información.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Contacto</h2>
        <p className="mb-4">
          Si tienes preguntas, comentarios o deseas ejercer tus derechos
          relacionados con la protección de tus datos personales, puedes
          comunicarte con nosotros a través de:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Correo electrónico:</strong> contacto@sulcapital.pe
          </li>
          <li>
            <strong>Sitio web:</strong> www.sulcapital.pe
          </li>
        </ul>
      </div>
    </>
  );
}
