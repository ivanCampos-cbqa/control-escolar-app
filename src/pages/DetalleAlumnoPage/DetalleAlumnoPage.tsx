import { useParams } from "react-router"
import Inscripciones from "./components/Inscripciones"
import Calificaciones from "./components/Calificaciones";
import { useState } from "react";

export default function DetalleAlumnoPage(){
  const params = useParams();
  const [refreshFlag, setRefreshFlag] = useState(false);
  let id = -1;
  if(params.id!==undefined || params.id!==null){
    id = Number(params.id)
  }

  const handleRefresh = () => {
      setRefreshFlag((prev) => !prev);
  };

  return(
    <div style={{display:"flex",height:"inherit"}}>
    <Inscripciones id={id} onRefresh={handleRefresh} refreshFlag={refreshFlag}/>
    <Calificaciones id={id} onRefresh={handleRefresh} refreshFlag={refreshFlag} />
    </div>
  );
}