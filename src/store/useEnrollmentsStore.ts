import { Materia, ROLES_USUARIO, Usuario } from "@interfaces";
import { getFromLocalStorage, saveToLocalStorage } from "@utils/browserUtils";
import { zustandCreate } from "./zustandStore";

export const usuariosStorageKey = "usuariosState";

interface EnrollmentsStore {
  callInscribirAlumnoApi: (usuario: Usuario, materia: Materia) => void;
  callEliminarInscripcionAlumnoApi: (usuario: Usuario, materia: Materia) => void;
}

// Creamos el store utilizando Zustand
export const useEnrollmentsStore = zustandCreate<EnrollmentsStore>(() => {
  return {
    callInscribirAlumnoApi: (usuario: Usuario, materia: Materia): void => {
      const alumnos = getFromLocalStorage<Usuario[]>(usuariosStorageKey) || [];
      alumnos.filter((usuario) => usuario.rol === ROLES_USUARIO.ALUMNO);
      if(alumnos.some((alumno) => alumno.id === usuario.id )){
        var nuevaInscripcion = {id:0,materia:materia,calificacion:0}
        if(usuario.materias!== undefined && usuario.materias.length > 0 ){
          const isAlreadyAssigned = usuario.materias?.some(
            (inscripcion) => inscripcion.materia.id === materia.id
          );
          if (isAlreadyAssigned) {
            window.confirm(`La materia "${materia.nombre}" ya está asignada a ${usuario.nombre}.`);
            return;
          }
          else{
            nuevaInscripcion.id = usuario.materias[usuario.materias.length - 1].id+1;
          }
        }
        else{
          if(usuario.materias!==undefined){
            nuevaInscripcion.id = 1;
          }
          else{
            window.confirm("El usuario no es alumno")
            return;
          }
        }
        usuario.materias?.push(nuevaInscripcion)
        const usuariosActualizados = alumnos.map((usuarioExistente) =>
          usuarioExistente.id === usuario.id ? { ...usuarioExistente, ...usuario } : usuarioExistente
        );
        saveToLocalStorage(usuariosStorageKey, usuariosActualizados);
        window.confirm(`Materia "${materia.nombre}" asignada a ${usuario.nombre} correctamente.`);
      }
      else{
        window.confirm("El usuario no es un alumno");
        return;
      }
    },

    callEliminarInscripcionAlumnoApi: (usuario: Usuario, materia: Materia): void => {
      const alumnos = getFromLocalStorage<Usuario[]>(usuariosStorageKey) || [];
      alumnos.filter((usuario) => usuario.rol === ROLES_USUARIO.ALUMNO);
      if(alumnos.some((alumno) => alumno.id === usuario.id )){
        if(usuario.materias !== undefined && usuario.materias?.length>0){
          const inscripcion = usuario.materias.find((m) => m.materia == materia)
          if(inscripcion !== undefined){
            usuario.materias = usuario.materias.filter((m) => m.materia != materia)
            const usuariosActualizados = alumnos.map((usuarioExistente) =>
              usuarioExistente.id === usuario.id ? { ...usuarioExistente, ...usuario } : usuarioExistente
            );
            saveToLocalStorage(usuariosStorageKey, usuariosActualizados);
            window.confirm("La materia se dió de baja correctamente");
          }
          else{
            window.confirm("El usuario no está inscrito en la materia");
          }
        }
        else{
          window.confirm("El usuario no tiene materias inscritas");
        }
      }
      else{
        window.confirm("El usuario no es un alumno");
      }
    },
  };
});
