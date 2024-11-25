import { useState } from "react";
import {
  Container,
  Title,
  Section,
  List,
  ListItem
} from "../MateriasPage.style";
import { Label,Input} from "@components/common/CustomInput/CustomInput.styles"
import {Button} from "@components/common/CustomButton/CustomButton.style"
import { useSubjectsStore } from "@store/useSubjectsStore";
import { Materia } from "@interfaces/materia";

const MateriasUI = () => {
  const [newMateria, setNewMateria] = useState<Materia>({
    id: 0,
    nombre: "",
    codigoMateria: "",
    nombreProfesor: "",
  });

  const [materiasList, setMateriasList] = useState<Materia[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const {
    callCrearMateriaApi,
    callEditarMateriaApi,
    callEliminarMateriaApi,
    callGetMateriasApi,
  } = useSubjectsStore();

  const handleGetAll = () => {
    const materias = callGetMateriasApi();
    setMateriasList(materias);
  };

  const handleCreate = () => {
    callCrearMateriaApi(newMateria);
    setNewMateria({ id: 0, nombre: "", codigoMateria: "", nombreProfesor: "" });
    handleGetAll();
  };

  const handleDelete = (id: number) => {
    callEliminarMateriaApi(id);
    handleGetAll();
  };

  const handleInputChange = (id: number, field: keyof Materia, value: string) => {
    setMateriasList((prevList) =>
      prevList.map((materia) =>
        materia.id === id ? { ...materia, [field]: value } : materia
      )
    );
  };  

  const handleEditToggle = (id: number) => {
    if (isEditing === id) {
      const updatedMateria = materiasList.find((m) => m.id === id);
      if (updatedMateria) {
        callEditarMateriaApi(updatedMateria);
        handleGetAll();
      }
      setIsEditing(null);
    } else {
      setIsEditing(id);
    }
  };

  return (
    <Container>
      <Title>Administrar materias</Title>
      <Section>
        <Label>Crear Materia</Label>
        <Input
          placeholder="Nombre"
          value={newMateria.nombre}
          onChange={(e) => setNewMateria({ ...newMateria, nombre: e.target.value })}
        />
        <Input
          placeholder="Código Materia"
          value={newMateria.codigoMateria}
          onChange={(e) => setNewMateria({ ...newMateria, codigoMateria: e.target.value })}
        />
        <Input
          placeholder="Nombre Profesor"
          value={newMateria.nombreProfesor}
          onChange={(e) => setNewMateria({ ...newMateria, nombreProfesor: e.target.value })}
        />
        <Button onClick={handleCreate}>Crear</Button>
      </Section>
      <Section>
        <Label>Ver todas las materias</Label>
        <Button onClick={handleGetAll}>Obtener materias</Button>
        <List>
          {materiasList.map((materia) => (
            <ListItem key={materia.id}>
              <Label>Nombre</Label>
              <Input
                value={materia.nombre}
                disabled={isEditing !== materia.id}
                onChange={(e) => handleInputChange(materia.id, "nombre", e.target.value)}
              />
              <Label>Código de Materia</Label>
              <Input
                value={materia.codigoMateria}
                disabled={isEditing !== materia.id}
                onChange={(e) => handleInputChange(materia.id, "codigoMateria", e.target.value)}
              />
              <Label>Nombre del Profesor</Label>
              <Input
                value={materia.nombreProfesor}
                disabled={isEditing !== materia.id}
                onChange={(e) => handleInputChange(materia.id, "nombreProfesor", e.target.value)}
              />
              <Button onClick={() => handleEditToggle(materia.id)}>
                {isEditing === materia.id ? "Guardar" : "Editar"}
              </Button>
              <Button onClick={() => handleDelete(materia.id)} style={{ backgroundColor: "red" }}>
                Eliminar
              </Button>
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
};

export default MateriasUI;