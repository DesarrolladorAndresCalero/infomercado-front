import { useEffect, useState } from "react";
import imagen from "../../Assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { Table, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";


const EstablecimientoView = () => {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombre = usuario?.correoElectronico ? usuario.nombre : "Usuario";
  let rol = usuario?.correoElectronico ? usuario.rol : "Usuario";
  if (rol === "AUXILIAR_REGISTRO") rol = "AUXILIAR";

  const location = useLocation();
  const idComerciante = location.state?.id || null;

  useEffect(() => {
    if (idComerciante) {
      fetch(`http://localhost:8081/establecimientos/comerciante/${idComerciante}`)
        .then((response) => response.json())
        .then((data) => setEstablecimientos(data))
        .catch((error) => console.error("Error al obtener establecimientos:", error));
    }
  }, [idComerciante]);

  const handleDelete = (idEstablecimiento) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este establecimiento?")) {
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8081/establecimientos/${idEstablecimiento}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el establecimiento");
        }
        setEstablecimientos((prev) =>
          prev.filter((establecimiento) => establecimiento.idEstablecimiento !== idEstablecimiento)
        );
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div>
          <img src={imagen} alt="logo OlSoftware" />
        </div>
        <div className="info-user">
          <div>
            <FaUserCircle className="icon" />
          </div>
          <div className="info-text">
            <label className="bnv">BIENVENIDO!</label>
            <label> {nombre} </label>
            <label> {rol} </label>
          </div>
        </div>
      </div>

      <div className="tabla">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre de establecimiento</th>
              <th>Ingresos</th>
              <th>Número de empleados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {establecimientos.map((establecimiento) => (
              <tr key={establecimiento.idEstablecimiento}>
                <td>{establecimiento.idEstablecimiento}</td>
                <td>{establecimiento.nombreEstablecimiento}</td>
                <td>${establecimiento.ingresos}</td>
                <td>{establecimiento.numeroEmpleados}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={loading}
                    onClick={() => handleDelete(establecimiento.idEstablecimiento)}
                  >
                    {loading ? "Eliminando..." : "Eliminar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EstablecimientoView;
