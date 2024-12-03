import salle from '../../assets/img/salle.png';
export default function HomePage() {
  return (
    <div style={{textAlign:"center", fontWeight:"normal"}}>
      <h1 style={{fontWeight:"normal"}}>¡Bienvenido al Control Académico!</h1>
      <img src={salle} alt=""  width={'900px'} />
    </div>
  );
}