export interface LoginInterface {
  email: string;
  password: string;
}

export type RegisterInterface = {
  email: string;
  nombres: string;
  apellidos: string;
  celular: string;
  password: string;
  confirmPassword: string;
  rol: string;
};

export type UserInterface = {
  id: string;
  email: string;
  nombres: string;
  apellidos: string;
  celular: string;
  rol_id: string | number;
  rol?: RolesInterface;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface RolesInterface {
  id: number;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecuperarContrasenaInteface {
  email: string;
}

export interface CambiarContrasenaInterface {
  password: string;
  confirmPassword: string;
}

export type UserInterfaceEdit = {
  nombres: string;
  apellidos: string;
  celular: string;
};
