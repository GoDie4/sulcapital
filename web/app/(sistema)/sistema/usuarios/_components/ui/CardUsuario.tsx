import { UserIcon, MailIcon, PhoneIcon, CalendarIcon } from "lucide-react";
// components/CardUsuario.tsx
type Usuario = {
  id: string;
  nombres: string;
  apellidos: string;
  tipo_documento?: string;
  documento?: string;
  email: string;
  celular: string;
  activo: boolean;
  createdAt: string;
};

export default function CardUsuario({ usuario }: { usuario: Usuario }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 space-y-3 transition hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-secondary-main text-white-main rounded-full p-3">
          <UserIcon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-lg font-semibold">
            {usuario.nombres} {usuario.apellidos}
          </p>
          <span
            className={`text-xs font-medium ${
              usuario.activo ? "text-green-600" : "text-red-500"
            }`}
          >
            {usuario.activo ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <div className="flex items-center gap-2">
          <MailIcon className="w-4 h-4 text-gray-400" />
          <span>{usuario.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 text-gray-400" />
          <span>{usuario.celular}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span>
            Registrado el {new Date(usuario.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
