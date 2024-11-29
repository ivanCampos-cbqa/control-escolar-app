import { ROLES_USUARIO, Usuario } from "@interfaces";
import { getFromLocalStorage, saveToLocalStorage } from "@utils/browserUtils";
import { zustandCreate } from "./zustandStore";
import { usuariosMock } from "@mockData/users";

export const usuariosStorageKey = "usuariosState";

interface UsuariosStore {
  callLoginApi: (matricula: string, password: string) => Usuario | undefined;
  callCrearAlumnoApi: (usuario: Usuario) => void;
  callEditarAlumnoApi: (usuario: Usuario) => void;
  callEliminarAlumnoApi: (id: number) => void;
  callGetAlumnosApi: () => Usuario[];
}

// Inicializa los datos en localStorage solo si no existen
const initializeUsuariosInStorage = (): void => {
  const storedUsuarios = getFromLocalStorage<Usuario[]>(usuariosStorageKey);

  if (!storedUsuarios || storedUsuarios.length === 0) {
    saveToLocalStorage(usuariosStorageKey, usuariosMock);
  }
};

// Creamos el store utilizando Zustand
export const useUsersStore = zustandCreate<UsuariosStore>(() => {
  // Inicializar los datos al cargar el store
  initializeUsuariosInStorage();

  return {
    callLoginApi: (matricula: string, password: string): Usuario | undefined => {
      const usuarios = getFromLocalStorage<Usuario[]>(usuariosStorageKey) || [];
      return usuarios.find(
        (usuario) => usuario.matricula === matricula && usuario.password === password
      );
    },

    callCrearAlumnoApi: (usuario: Usuario): void => {
      const usuarios = getFromLocalStorage<Usuario[]>(usuariosStorageKey) || [];
      const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
      const nuevosUsuarios = [...usuarios, { ...usuario, id: newId }];
      saveToLocalStorage(usuariosStorageKey, nuevosUsuarios);
    },

    callEditarAlumnoApi: (usuario: Usuario): void => {
      const usuarios = getFromLocalStorage<Usuario[]>(usuariosStorageKey) || [];
      const usuariosActualizados = usuarios.map((usuarioExistente) =>
        usuarioExistente.id === usuario.id ? { ...usuarioExistente, ...usuario } : usuarioExistente
      );
      saveToLocalStorage(usuariosStorageKey, usuariosActualizados);
    },

    callEliminarAlumnoApi: (id: number): void => {
      const usuarios = getFromLocalStorage<Usuario[]>(usuariosStorageKey) || [];
      const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
      saveToLocalStorage(usuariosStorageKey, usuariosFiltrados);
    },

    callGetAlumnosApi: (): Usuario[] => {
      const usuarios = getFromLocalStorage<Usuario[]>(usuariosStorageKey) || [];
      return usuarios.filter((usuario) => usuario.rol === ROLES_USUARIO.ALUMNO);
    },
  };
});
