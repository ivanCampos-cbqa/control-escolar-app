import { CalificacionMateria } from "./calificacion";

export interface LoginFormFields {
  matricula: string;
  password: string;
}

export interface UserModel {
  nombre: string;
  apellidos: string;
  matricula: string;
}

export interface LogInPayload {
  user: Usuario;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  matricula: string;
  password: string;
  materias?: CalificacionMateria[];
  rol: ROLES_USUARIO;
}

export enum ROLES_USUARIO {
  ADMIN = 'ADMIN',
  ALUMNO = 'ALUMNO',
}