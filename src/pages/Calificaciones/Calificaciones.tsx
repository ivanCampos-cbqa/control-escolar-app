import { CalificacionMateria, Usuario } from "@interfaces";
import { useUsersStore } from "@store/useUsersStore";
import { useEffect, useState } from "react";

export default function Calificaciones() {
  const [calificacionesList, setCalificacionesList] = useState<CalificacionMateria[]>([]);
  const callGetAlumnosApi = useUsersStore((state) => state.callGetAlumnosApi);
  const [loggedUser, setLoggedUser] = useState<Usuario | null>(null);


  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setLoggedUser(user);
    }
  }, []);

  useEffect(() => {
    if (loggedUser?.id) {
      const alumnos = callGetAlumnosApi();
      const alumno = alumnos.find((a) => a.id === loggedUser.id);
      if (alumno && alumno.materias) {
        setCalificacionesList(alumno.materias);
      } else {
        setCalificacionesList([]); // No tiene materias
      }
    }
  }, [loggedUser]);

  return (
    <div>
      <h3>{loggedUser
          ? `Calificaciones de ${loggedUser.nombre}`
          : "Cargando información del usuario..."}</h3>
      {calificacionesList.length > 0 ?(<div
        style={{
          maxHeight: '500px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          marginTop: '20px',
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
            {calificacionesList.map((calificacion) => (
              <li
                key={calificacion.id}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  display: 'flex',
              justifyContent: 'space-between',
              width: '700px'
                }}
              >
                <span style={{ fontSize: '24px', fontWeight: '500', margin:'15px'}}>{calificacion.materia.nombre}</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin:'15px'}}>
              {calificacion.calificacion}
            </span>
              </li>
            ))}
          </ul>
      </div>):<p style={{ marginTop: "20px", fontSize: "18px", color: "#888" }}>
          No tienes materias asignadas aún.
        </p>}
    </div>
  );
}