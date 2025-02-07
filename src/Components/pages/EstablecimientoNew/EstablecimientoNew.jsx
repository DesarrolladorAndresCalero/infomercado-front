import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import imagen from "../../Assets/logo.png";
import "./EstablecimientoNew.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EstablecimientoNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idComerciante = location.state?.id || null;

  const [nombreEstablecimiento, setNombreEstablecimiento] = useState("");
  const [ingresos, setIngresos] = useState("");
  const [numeroEmpleados, setNumeroEmpleados] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombre = usuario?.correoElectronico ? usuario.nombre : "Usuario";
  let rol = usuario?.correoElectronico ? usuario.rol : "Usuario";
  if (rol === "AUXILIAR_REGISTRO") rol = "AUXILIAR";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const establecimiento = {
      nombreEstablecimiento,
      ingresos: parseFloat(ingresos),
      numeroEmpleados: parseInt(numeroEmpleados, 10),
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/establecimientos?idComerciante=${idComerciante}`, 
        establecimiento
      );
      console.log("Establecimiento agregado:", response.data);

      navigate("/principal");
    } catch (error) {
      console.error("Error al agregar establecimiento:", error);
    }
  };

  return (
    <div>
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

      <div className="formulario">
        <form onSubmit={handleSubmit} style={{ margin: "auto" }} className="form1">
          <div className="contenedor3">
            <h2>{"Añadir establecimiento"}</h2>
            <div className="izq1">
              <div className="input-container1">
                <input
                  type="text"
                  name="nombre"
                  value={nombreEstablecimiento}
                  onChange={(e) => setNombreEstablecimiento(e.target.value)}
                  required
                />
                <label htmlFor="nombre">Nombre del establecimiento</label>
              </div>

              <div className="input-container1">
                <input
                  type="text"
                  name="ingresos"
                  value={ingresos}
                  onChange={(e) => setIngresos(e.target.value)}
                  required
                />
                <label htmlFor="ingresos">Ingresos</label>
              </div>

              <div className="input-container1">
                <input
                  type="text"
                  name="empleados"
                  value={numeroEmpleados}
                  onChange={(e) => setNumeroEmpleados(e.target.value)}
                />
                <label htmlFor="empleados">Numero de empleados</label>
              </div>

              <button type="submit" className="buttonEnviar1">
                {"Añadir establecimiento"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstablecimientoNew;
