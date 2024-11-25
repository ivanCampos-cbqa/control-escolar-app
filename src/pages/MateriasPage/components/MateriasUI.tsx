import { useState } from "react";
import {
  Container,
  Title,
  Section,
  List,
  ListItem
} from "../MateriasPage.style";
import { Label,Input } from "@components/common/CustomInput/CustomInput.styles"
import { CustomInput } from "@components/common"
import { Button } from "@components/common/CustomButton/CustomButton.style"
import { useSubjectsStore } from "@store/useSubjectsStore";
import { Materia } from "@interfaces/materia";
import { SubmitHandler, useForm } from "react-hook-form";
import { MateriaCreateFormFields } from "@interfaces";
import { materiaaCreateFormValidationSchema } from "../hooks/useCreateFormValidationSchema";

const MateriasUI = () => {

  const [materiasList, setMateriasList] = useState<Materia[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const {
    register,
    formState: { errors, defaultValues },
    handleSubmit,
    reset
  } = useForm<MateriaCreateFormFields>();

  const [formErrorMessage, setFormErrorMessage] = useState<string>("");

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

  const onCreateFormSubmit: SubmitHandler<MateriaCreateFormFields> = (formContent: MateriaCreateFormFields
  ): void => handleCreate(formContent.nombre, formContent.codigoMateria, formContent.nombreProfesor);

  const handleCreate = (nombre: string, codigoMateria: string, nombreProfesor: string) => {
    const newMateria={id:0,nombre:nombre,codigoMateria:codigoMateria,nombreProfesor:nombreProfesor}
    callCrearMateriaApi(newMateria);
    handleGetAll();
    reset();
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
        <form onSubmit={handleSubmit(onCreateFormSubmit)}>
        <CustomInput
          placeholder="Nombre"
          error={errors.nombre?.message}
          register={register("nombre", {
            ...materiaaCreateFormValidationSchema.nombre,
          })}
        />
        <CustomInput
          placeholder="Código Materia"
          error={errors.codigoMateria?.message}
          register={register("codigoMateria", {
            ...materiaaCreateFormValidationSchema.codigoMateria,
          })}
        />
        <CustomInput
          placeholder="Nombre Profesor"
          error={errors.nombreProfesor?.message}
          register={register("nombreProfesor", {
            ...materiaaCreateFormValidationSchema.nombreProfesor,
          })}
        />
        <Button>Crear</Button>
        </form>
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
