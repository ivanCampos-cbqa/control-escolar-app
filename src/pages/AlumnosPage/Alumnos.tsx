import { CustomInput } from "@components/common";
import CustomButton from "@components/common/CustomButton/CustomButton";
import { DivInputs } from "./Alumnos.style";
import { useEffect, useState } from "react";
import { useUsersStore } from "@store/useUsersStore";
import { ROLES_USUARIO, Usuario } from "@interfaces";

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
      alert('LLena todos los campos!');
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

        alert('Alumno editado exitosamente:)');
        limpiarFormulario();
      } catch (error) {
        console.error('Error al editar alumno:', error);
        alert('Error al editar, intenta más tarde.');
      }
    } else {
      const nuevaMatricula = `ALU${contadorMatriculas
        .toString()
        .padStart(3, "0")}`;

      const nuevoAlumno = {
        id: Date.now(),
        nombre,
        apellidos: apellido,
        matricula: nuevaMatricula,
        password: password,
        rol: ROLES_USUARIO.ALUMNO,
      };

      callCrearAlumnoApi(nuevoAlumno);
      setAlumnos((prev) => [...prev, nuevoAlumno]);
      alert('Alumno registrado exitosamente:)');
      limpiarFormulario();
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

  const handleEliminarAlumno = () => {
    if (!alumnoSeleccionado) {
      alert('No hay alumno seleccionado para eliminar');
      return;
    }

    const alumnoId = alumnoSeleccionado.id;

    try {
      callEliminarAlumnoApi(alumnoId); 
      setAlumnos((prev) => prev.filter((alumno) => alumno.id !== alumnoId)); 
      alert('Alumno eliminado exitosamente:)');
      limpiarFormulario(); 
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
      alert('Error al eliminar, intenta más tarde.');
    }
  }

  return (
    <div>
      <h3>Lista de alumnos</h3>
      <DivInputs>
        <CustomInput label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></CustomInput>
        <CustomInput label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}></CustomInput>
        <CustomInput label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)}></CustomInput>
      </DivInputs>


      <CustomButton
        title={alumnoSeleccionado ? "Editar Alumno" : "Registrar Alumno"}
        onClick={handleRegistrarOEditarAlumno}
        style={alumnoSeleccionado ? { backgroundColor: "#1E8E3E" } : {}}
      ></CustomButton>
            {alumnoSeleccionado && (
        <>
          <CustomButton
            title="Eliminar"
            onClick={handleEliminarAlumno}
            style={{ backgroundColor: "#eb2f4e" }}
          />
          <CustomButton
            title="Cancelar"
            onClick={() => limpiarFormulario()}
            style={{ backgroundColor: "#2f8aeb" }}
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
        }}
      >
        <ul style={{ listStyle: 'none' }}>
          {alumnos.length > 0 ? (
            alumnos.map((alumno) => (
              <div key={alumno.id}  style={{ backgroundColor: '#e0e0e0', margin: '15px 5px', padding: '5px 30px', borderRadius: '12px', }} onClick={() => handleSeleccionarAlumno(alumno)}>
                <li >
                  {alumno.nombre} {alumno.apellidos} - Matrícula: {alumno.matricula}
                </li>
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
