import { Materia } from "./materia";

export interface CalificacionMateria {
  id: number;
  materia: Materia;
  calificacion: number;
}

export interface CalificacionEditFormFields {
  id:number;
  calificacion: number;
}