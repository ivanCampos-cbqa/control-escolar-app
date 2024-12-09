import { CustomInput } from "@components/common";
import CustomButton from "@components/common/CustomButton/CustomButton";
import { DivInputs } from "./Alumnos.style";
import { useEffect, useState } from "react";
import { useUsersStore } from "@store/useUsersStore";
import { ROLES_USUARIO, Usuario } from "@interfaces";
import { Button } from "@components/common/CustomButton/CustomButton.style";
import { useNavigate } from "react-router-dom";

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState<Usuario[]>([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [contadorMatriculas, setContadorMatriculas] = useState(1);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<Usuario | null>(null)

  const callCrearAlumnoApi = useUsersStore((state) => state.callCrearAlumnoApi);
  const callGetAlumnosApi = useUsersStore((state) => state.callGetAlumnosApi);
  const callEditarAlumnoApi = useUsersStore((state) => state.callEditarAlumnoApi);
  const callEliminarAlumnoApi = useUsersStore((state)=> state.callEliminarAlumnoApi);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchedAlumnos = callGetAlumnosApi();
    setAlumnos(fetchedAlumnos);

    if (fetchedAlumnos.length > 0) {
      const maxMatricula = Math.max(
        ...fetchedAlumnos.map((alumno) =>
          parseInt(alumno.matricula.replace("ALU", ""), 10)
        )
      );
      setContadorMatriculas(maxMatricula + 1);
    }
  }, []);

  const handleRegistrarOEditarAlumno = () => {
    if (!nombre || !apellido || !password) {
      window.confirm('LLena todos los campos!');
      return;
    }

    if (alumnoSeleccionado) {
      const alumnoEditado: Usuario = {
        ...alumnoSeleccionado,
        nombre,
        apellidos: apellido,
        password: password
      };

      try {
        callEditarAlumnoApi(alumnoEditado);
        setAlumnos((prev) =>
          prev.map((alumno) =>
            alumno.id === alumnoEditado.id ? alumnoEditado : alumno
          )
        );
        window.confirm('Alumno editado exitosamente');
        limpiarFormulario();
      } catch (error) {
        console.error('Error al editar alumno:', error);
        window.confirm('Error al editar, intenta más tarde.');
      }
    } else {
      const nuevaMatricula = `ALU${contadorMatriculas
        .toString()
        .padStart(3, "0")}`;

      const nuevoAlumno = {
        id: 0,
        nombre,
        apellidos: apellido,
        matricula: nuevaMatricula,
        password: password,
        rol: ROLES_USUARIO.ALUMNO,
      };

      callCrearAlumnoApi(nuevoAlumno);
      setAlumnos((prev) => [...prev, nuevoAlumno]);
      window.confirm('Alumno registrado exitosamente:)');
      limpiarFormulario();
      const updatedAlumnos = callGetAlumnosApi();
      setAlumnos(updatedAlumnos);
    }
  }

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setPassword("");
    setAlumnoSeleccionado(null);
  };

  const handleSeleccionarAlumno = (alumno: Usuario) => {
    if (alumnoSeleccionado && alumnoSeleccionado.id === alumno.id) {
      setAlumnoSeleccionado(null);
      limpiarFormulario();
    } else {
      setAlumnoSeleccionado(alumno);
      setNombre(alumno.nombre);
      setApellido(alumno.apellidos);
      setPassword(alumno.password); 
    }
  };

  const handleNavigateCalificaciones = (id:number) =>{
    navigate(`/alumno/${id}`)
  };

  const handleEliminarAlumno = () => {
    if (!alumnoSeleccionado) {
      window.confirm('No hay alumno seleccionado para eliminar');
      return;
    }

    const alumnoId = alumnoSeleccionado.id;

    try {
      callEliminarAlumnoApi(alumnoId); 
      setAlumnos((prev) => prev.filter((alumno) => alumno.id !== alumnoId)); 
      window.confirm('Alumno eliminado exitosamente:)');
      limpiarFormulario(); 
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
      window.confirm('Error al eliminar, intenta más tarde.');
    }
  }

  return (
    <div style={{textAlign:"center"}}>
      <h3 style={{fontWeight:"normal"}}>Administrar Alumnos</h3>
      <DivInputs>
        <CustomInput label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></CustomInput>
        <CustomInput label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}></CustomInput>
        <CustomInput label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)}></CustomInput>
      </DivInputs>


      <CustomButton
        title={alumnoSeleccionado ? "Editar Alumno" : "Registrar Alumno"}
        onClick={handleRegistrarOEditarAlumno}
        style={{backgroundColor:"#042160"}}
      ></CustomButton>
            {alumnoSeleccionado && (
        <>
          <CustomButton
            title="Eliminar"
            onClick={handleEliminarAlumno}
            style={{ backgroundColor: "#92212D" }}
          />
          <CustomButton
            title="Cancelar"
            onClick={() => limpiarFormulario()}
            style={{backgroundColor:"#042160"}}
          />
        </>
      )}

      <div
        style={{
          maxHeight: '300px', 
          overflowY: 'auto', 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          padding: '10px',
          marginTop: '20px',
          backgroundColor:"#042160",
          paddingRight:"60px"
        }}
      >
        <ul style={{ listStyle: 'none' }}>
          {alumnos.length > 0 ? (
            alumnos.map((alumno) => (
              <div key={alumno.id}  style={{ backgroundColor: 'white', margin: '15px 5px', padding: '5px 30px', borderRadius: '12px', }} onClick={() => handleSeleccionarAlumno(alumno)}>
                <li >
                  {alumno.nombre} {alumno.apellidos} - Matrícula: {alumno.matricula}
                </li>
                <Button style={{width: 'fit-content', backgroundColor: "#92212D"}} onClick={()=>handleNavigateCalificaciones(alumno.id)}>Ver Calificaciones</Button>
              </div>
            ))
          ) : (
            <p>No hay alumnos registrados.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
