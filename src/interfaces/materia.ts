export interface Materia {
  id: number;
  nombre: string;
  codigoMateria: string;
  nombreProfesor: string;
}

export interface MateriaCreateFormFields {
  nombre: string;
  codigoMateria: string;
  nombreProfesor: string;
}

export interface MateriaEditFormFields {
  id:number;
  nombre: string;
  codigoMateria: string;
  nombreProfesor: string;
}