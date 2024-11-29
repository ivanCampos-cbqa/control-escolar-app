import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Section,
  List,
  ListItem
} from "../DetalleAlumnoPage.style";
import { Label,Input } from "@components/common/CustomInput/CustomInput.styles"
import { Button } from "@components/common/CustomButton/CustomButton.style"
import { useSubjectsStore } from "@store/useSubjectsStore";
import { Materia } from "@interfaces/materia";
import { useUsersStore } from "@store/useUsersStore";
import { useEnrollmentsStore } from "@store/useEnrollmentsStore";

const Inscripciones = ({ id, onRefresh, refreshFlag }: { id: number; onRefresh: () => void, refreshFlag: boolean }) => {

  const callGetAlumnosApi = useUsersStore((state) => state.callGetAlumnosApi);
  const callInscribirAlumnoApi = useEnrollmentsStore((state) => state.callInscribirAlumnoApi);
  const callGetMateriasApi = useSubjectsStore((state) => state.callGetMateriasApi);
  const alumnos =  callGetAlumnosApi();
  const materias = callGetMateriasApi();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredMaterias, setFilteredMaterias] = useState<Materia[]>([]);
  const [alumno, setAlumno] = useState(alumnos.find((a)=>a.id === id));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    if (query === "") {
      setFilteredMaterias([]);
    } else {
      setFilteredMaterias(
        materias.filter((materia) =>
          materia.nombre.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleAddMateria = (materia: Materia) => { 
    if (alumno) {
      callInscribirAlumnoApi(alumno,materia);
      onRefresh();
    }
    else{
      alert("No se encontró el alumno seleccionado.");
    }
  }

  useEffect(() => {
    const alumnos = callGetAlumnosApi();
    const updatedAlumno = alumnos.find((a) => a.id === id);
    if (updatedAlumno) {
      setAlumno(updatedAlumno);
    }
  }, [refreshFlag]);
  
  if(alumno !== undefined && alumno !== null ){
  return (
    <Container>
      <Title>Alumno {alumno?.matricula}: {alumno?.nombre} {alumno?.apellidos}</Title>
      <Section>
      <Label>Inscribir a Materia</Label>
        <Input
          type="text"
          placeholder="Buscar por nombre de materia"
          value={searchQuery}
          onChange={handleSearch}
        />
        <List>
          {filteredMaterias.map((materia) => (
            <ListItem key={materia.id}>
              <span>{materia.nombre}</span>
              <Button
                onClick={() => handleAddMateria(materia)}
                style={{ backgroundColor: "green" }}
              >
                Inscribir alumno
              </Button>
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
}else{
  return <h3>No se encontró al alumno</h3>;
}
};

export default Inscripciones;