export interface EmpresaContacto {
    id: string;
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    tiktok?: string | null;
    youtube?: string | null;
    linkedin?: string | null;
    whatsapp?: string | null;
    direccion: string;
    horarios?: string | null;
    createdAt: string; // O Date si lo parseas
    updatedAt: string; // O Date si lo parseas
    CorreoEmpresa: CorreoEmpresa[];
    TelefonoEmpresa: TelefonoEmpresa[];
  }
  
  export interface CorreoEmpresa {
    id: string;
    email: string;
    posicion: string;
    empresaContactoId: string;
  }
  
  export interface TelefonoEmpresa {
    id: string;
    numero: string;
    posicion: string;
    empresaContactoId: string;
  }
  
  export interface ContactoResponse {
    status: 'success';
    contacto: EmpresaContacto;
  }