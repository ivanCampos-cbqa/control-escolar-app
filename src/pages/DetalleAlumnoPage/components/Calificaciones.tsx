import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Section,
  List,
  ListItem,
  ListCalificacionItem,
  DetalleCalificacionItem,
} from "../DetalleAlumnoPage.style";
import CustomInput from "@components/common/CustomInput";
import { Label } from "@components/common/CustomInput/CustomInput.styles"
import { Button } from "@components/common/CustomButton/CustomButton.style";
import { useForm } from "react-hook-form";
import { CalificacionEditFormFields, CalificacionMateria } from "@interfaces";
import { calificacionEditFormValidationSchema } from "../hooks/useEditFormValidationSchema";
import { useUsersStore } from "@store/useUsersStore";
import { useEnrollmentsStore } from "@store/useEnrollmentsStore";

const Calificaciones = ({ id, onRefresh, refreshFlag }: { id: number; onRefresh: () => void, refreshFlag: boolean }) => {
  const callGetAlumnosApi = useUsersStore((state) => state.callGetAlumnosApi);
  const callEditarAlumnoApi = useUsersStore((state)=> state.callEditarAlumnoApi);
  const callEliminarInsccripcionAlumnoApi = useEnrollmentsStore((state) => state.callEliminarInscripcionAlumnoApi);
  let alumnos =  callGetAlumnosApi();
  let alumno = alumnos.find((a)=>a.id === id)
  const calificaciones = alumno?.materias;

  const [calificacionesList, setCalificacionesList] = useState<CalificacionMateria[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const {
    register: registerEdit,
    formState: { errors: errorsEdit },
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
  } = useForm<CalificacionEditFormFields>();


  const handleGetCalificaciones = () => {
    alumnos =  callGetAlumnosApi();
    alumno = alumnos.find((a)=>a.id === id)
    const calificaciones = alumno?.materias;
    if(calificaciones!==undefined){
      setCalificacionesList(calificaciones);
    }
  };

  const handleDelete = (id: number) => {
    const calificaciones = alumno?.materias;
    if(calificaciones!==undefined && alumno!==undefined){
      const calificacionToDelete = calificaciones.find((c)=>c.id == id)
      if(calificacionToDelete!==undefined){
        callEliminarInsccripcionAlumnoApi(alumno,calificacionToDelete.materia);
        onRefresh();
        handleGetCalificaciones();
      }
    }
  };

  const handleEditToggle = (id: number) => {
    if (isEditing === id) {
      setIsEditing(null);
      resetEdit();
    } else {
      const editingCalificacion = calificacionesList.find((calificacion) => calificacion.id === id);
      if (editingCalificacion) {
        resetEdit({
          calificacion: editingCalificacion.calificacion,
        });
        setIsEditing(id);
      }
    }
  };

  const onEditFormSubmit = (formContent: CalificacionEditFormFields) => {
    const editingCalificacion = calificacionesList.find(
      (calificacion) => calificacion.id === formContent.id
    );
  
    if (editingCalificacion) {
      const updatedCalificaciones = calificacionesList.map((calificacion) =>
        calificacion.id === formContent.id
          ? {
              ...calificacion,
              calificacion: formContent.calificacion,
            }
          : calificacion
      );

      if (alumno?.materias !== undefined) {
        const updatedAlumno = { ...alumno, materias: updatedCalificaciones };
        callEditarAlumnoApi(updatedAlumno);
  
        alert("Calificación registrada con éxito");
        handleGetCalificaciones();
        setIsEditing(null);
      }
    }
  };

  useEffect(() => {
    handleGetCalificaciones();
  }, []);

  useEffect(() => {
    handleGetCalificaciones();
  }, [refreshFlag]);

  if(alumno !== undefined && alumno !== null ){
    if(calificaciones !== undefined && calificaciones.length > 0 ){
    return (
    <Container>
      <Title>Calificaciones</Title>
      <Section>
        <List>
          {calificacionesList.map((calificacion) => (
            <ListItem key={calificacion.id}>
              {isEditing === calificacion.id ? (
                <form
                  onSubmit={handleSubmitEdit((formContent) =>{
                    formContent.id = calificacion.id;
                    onEditFormSubmit(formContent);
                  }
                  )}
                >
                  <ListCalificacionItem>
                  <DetalleCalificacionItem style={{flexBasis: "62%"}}>
                  <Label>Materia</Label>
                  <CustomInput value={calificacion.materia.nombre} disabled={true}/>
                  </DetalleCalificacionItem>
                  <DetalleCalificacionItem style={{flexBasis: "38%"}}>
                  <Label>Calificación</Label>
                  <CustomInput
                    error={errorsEdit.calificacion?.message}
                    register={registerEdit("calificacion", {
                      ...calificacionEditFormValidationSchema.calificacion,
                    })}
                  />
                  </DetalleCalificacionItem>
                  </ListCalificacionItem>
                  <ListCalificacionItem>
                  <Button type="submit">Guardar</Button>
                  <Button
                    type="button"
                    onClick={() => handleEditToggle(calificacion.id)}
                    style={{ backgroundColor: "gray" }}
                  >
                    Cancelar
                  </Button>
                  </ListCalificacionItem>
                </form>
              ) : (
                <>
                <ListCalificacionItem>
                  <DetalleCalificacionItem style={{flexBasis: "62%"}}>
                  <Label>Materia</Label>
                  <CustomInput value={calificacion.materia.nombre} disabled={true}/>
                  </DetalleCalificacionItem>
                  <DetalleCalificacionItem style={{flexBasis: "38%"}}>
                  <Label>Calificación</Label>
                  <CustomInput value={String(calificacion.calificacion)} disabled={true}/>
                  </DetalleCalificacionItem>
                </ListCalificacionItem>
                  <ListCalificacionItem>
                  <Button
                    type="button"
                    onClick={() => handleEditToggle(calificacion.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete(calificacion.id)}
                    style={{ backgroundColor: "red" }}
                  >
                    Eliminar
                  </Button>
                  </ListCalificacionItem>
                  </>
              )}
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );}
  else{
    return <h3>El alumno no está inscrito a ninguna materia</h3>;
  }
}else{
  return <h3>No se encontró al alumno</h3>;
}
};

export default Calificaciones;