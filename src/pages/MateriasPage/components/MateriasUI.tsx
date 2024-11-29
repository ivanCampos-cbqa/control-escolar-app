import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Section,
  List,
  ListItem,
} from "../MateriasPage.style";
import CustomInput from "@components/common/CustomInput";
import { Label } from "@components/common/CustomInput/CustomInput.styles"
import { Button } from "@components/common/CustomButton/CustomButton.style";
import { useSubjectsStore } from "@store/useSubjectsStore";
import { Materia } from "@interfaces/materia";
import { SubmitHandler, useForm } from "react-hook-form";
import { MateriaCreateFormFields } from "@interfaces";
import { MateriaEditFormFields } from "@interfaces";
import { materiaCreateFormValidationSchema } from "../hooks/useCreateFormValidationSchema";

const MateriasUI = () => {
  const [materiasList, setMateriasList] = useState<Materia[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const {
    register: registerCreate,
    formState: { errors: errorsCreate },
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
  } = useForm<MateriaCreateFormFields>();

  const {
    register: registerEdit,
    formState: { errors: errorsEdit },
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
  } = useForm<MateriaEditFormFields>();

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

  const onCreateFormSubmit: SubmitHandler<MateriaCreateFormFields> = (
    formContent
  ) => {
    handleCreate(
      formContent.nombre,
      formContent.codigoMateria,
      formContent.nombreProfesor
    );
  };

  const handleCreate = (
    nombre: string,
    codigoMateria: string,
    nombreProfesor: string
  ) => {
    const newMateria = {
      id: 0,
      nombre,
      codigoMateria,
      nombreProfesor,
    };
    callCrearMateriaApi(newMateria);
    handleGetAll();
    resetCreate();
  };

  const handleDelete = (id: number) => {
    callEliminarMateriaApi(id);
    handleGetAll();
  };

  const handleEditToggle = (id: number) => {
    if (isEditing === id) {
      setIsEditing(null);
      resetEdit();
    } else {
      const editingMateria = materiasList.find((materia) => materia.id === id);
      if (editingMateria) {
        resetEdit({
          nombre: editingMateria.nombre,
          codigoMateria: editingMateria.codigoMateria,
          nombreProfesor: editingMateria.nombreProfesor,
        });
        setIsEditing(id);
      }
    }
  };

  const onEditFormSubmit = (
    formContent: MateriaEditFormFields
  ) => {
    const updatedMateria = {
      ...formContent,
    };
    callEditarMateriaApi(updatedMateria);
    handleGetAll();
    setIsEditing(null);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <Container>
      <Title>Administrar materias</Title>
      <Section>
      <Label>Crear Materia</Label>
        <form onSubmit={handleSubmitCreate(onCreateFormSubmit)}>
          <CustomInput
            placeholder="Nombre"
            error={errorsCreate.nombre?.message}
            register={registerCreate("nombre", {
              ...materiaCreateFormValidationSchema.nombre,
            })}
          />
          <CustomInput
            placeholder="Código Materia"
            error={errorsCreate.codigoMateria?.message}
            register={registerCreate("codigoMateria", {
              ...materiaCreateFormValidationSchema.codigoMateria,
            })}
          />
          <CustomInput
            placeholder="Nombre Profesor"
            error={errorsCreate.nombreProfesor?.message}
            register={registerCreate("nombreProfesor", {
              ...materiaCreateFormValidationSchema.nombreProfesor,
            })}
          />
          <Button type="submit">Crear</Button>
        </form>
      </Section>
      <Section>
      <Label>Todas las materias</Label>
        <List>
          {materiasList.map((materia) => (
            <ListItem key={materia.id}>
              {isEditing === materia.id ? (
                <form
                  onSubmit={handleSubmitEdit((formContent) =>{
                    formContent.id = materia.id;
                    onEditFormSubmit(formContent);
                  }
                  )}
                >
                  <Label>Nombre</Label>
                  <CustomInput
                    error={errorsEdit.nombre?.message}
                    register={registerEdit("nombre", {
                      ...materiaCreateFormValidationSchema.nombre,
                    })}
                  />
                  <Label>Código de Materia</Label>
                  <CustomInput
                    error={errorsEdit.codigoMateria?.message}
                    register={registerEdit("codigoMateria", {
                      ...materiaCreateFormValidationSchema.codigoMateria,
                    })}
                  />
                  <Label>Nombre del Profesor</Label>
                  <CustomInput
                    error={errorsEdit.nombreProfesor?.message}
                    register={registerEdit("nombreProfesor", {
                      ...materiaCreateFormValidationSchema.nombreProfesor,
                    })}
                  />
                  <Button type="submit">Guardar</Button>
                  <Button
                    type="button"
                    onClick={() => handleEditToggle(materia.id)}
                    style={{ backgroundColor: "gray" }}
                  >
                    Cancelar
                  </Button>
                </form>
              ) : (
                <>
                  <Label>Nombre</Label>
                  <CustomInput value={materia.nombre} disabled={true}/>
                  <Label>Código de Materia</Label>
                  <CustomInput value={materia.codigoMateria} disabled={true}/>
                  <Label>Nombre del Profesor</Label>
                  <CustomInput value={materia.nombreProfesor} disabled={true}/>
                  <Button
                    type="button"
                    onClick={() => handleEditToggle(materia.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete(materia.id)}
                    style={{ backgroundColor: "red" }}
                  >
                    Eliminar
                  </Button>
                  </>
              )}
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
};

export default MateriasUI;
