import { Materia } from "@interfaces";
import { getFromLocalStorage, saveToLocalStorage } from "@utils/browserUtils";
import { zustandCreate } from "./zustandStore";
import { materiasMock } from "@mockData/subjects";

export const materiasStorageKey = "MateriasState";

interface MateriasStore {
  callCrearMateriaApi: (Materia: Materia) => void;
  callEditarMateriaApi: (Materia: Materia) => void;
  callEliminarMateriaApi: (id: number) => void;
  callGetMateriasApi: () => Materia[];
}

// Inicializa los datos en localStorage solo si no existen
const initializeMateriasInStorage = (): void => {
  const storedMaterias = getFromLocalStorage<Materia[]>(materiasStorageKey);

  if (!storedMaterias || storedMaterias.length === 0) {
    saveToLocalStorage(materiasStorageKey, materiasMock);
  }
};

// Creamos el store utilizando Zustand
export const useSubjectsStore = zustandCreate<MateriasStore>(() => {
  // Inicializar los datos al cargar el store
  initializeMateriasInStorage();

  return {

    callCrearMateriaApi: (materia: Materia): void => {
      const materias = getFromLocalStorage<Materia[]>(materiasStorageKey) || [];
      materia.id = materias[materias.length - 1].id+1;
      const nuevasMaterias = [...materias, materia];
      saveToLocalStorage(materiasStorageKey, nuevasMaterias);
      alert(`Materia ${materia.nombre} creada con éxito`);
    },

    callEditarMateriaApi: (materia: Materia): void => {
      const materias = getFromLocalStorage<Materia[]>(materiasStorageKey) || [];
      const materiasActualizadas = materias.map((materiaExistente) =>
        materiaExistente.id === materia.id ? { ...materiaExistente, ...materia } : materiaExistente
      );
      saveToLocalStorage(materiasStorageKey, materiasActualizadas);
      alert(`Materia ${materia.nombre} editada con éxito`);
    },

    callEliminarMateriaApi: (id: number): void => {
      const materias = getFromLocalStorage<Materia[]>(materiasStorageKey) || [];
      const materiasFiltradas = materias.filter((materia) => materia.id !== id);
      saveToLocalStorage(materiasStorageKey, materiasFiltradas);
      alert("Materia eliminada con éxito");
    },

    callGetMateriasApi: (): Materia[] => {
      const materias = getFromLocalStorage<Materia[]>(materiasStorageKey) || [];
      return materias;
    },
  };
});