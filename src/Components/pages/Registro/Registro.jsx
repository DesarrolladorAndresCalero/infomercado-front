import React, { useState, useEffect } from "react";
import "./Registro.css";
import { FaUserCircle } from "react-icons/fa";
import imagen from "../../Assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Registro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idComerciante = location.state?.id || null;

  console.log("ID recibido en Registro.jsx:", idComerciante);

  const [formData, setFormData] = useState({
    nombre: "",
    municipio: "",
    telefono: "",
    correoElectronico: "",
    fechaRegistro: "",
    estado: "ACTIVO",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (idComerciante) {
      fetch(`http://localhost:8081/comerciantes/${idComerciante}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Comerciante recibido:", data);
          setFormData(data);
        })
        .catch((error) => {
          console.error("Error al cargar comerciante:", error);
          setMensaje("Error al cargar los datos del comerciante.");
        });
    }
  }, [idComerciante]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = idComerciante
      ? `http://localhost:8081/comerciantes/${idComerciante}`
      : "http://localhost:8081/comerciantes";
    const method = idComerciante ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje(
          idComerciante
            ? "Comerciante actualizado con éxito"
            : "Comerciante registrado con éxito"
        );
        setTimeout(() => navigate("/principal"), 1500);
      } else {
        setMensaje("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("Error de conexión con el servidor");
    }
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombre = usuario?.correoElectronico ? usuario.nombre : "Usuario";
  let rol = usuario?.correoElectronico ? usuario.rol : "Usuario";
  if (rol === "AUXILIAR_REGISTRO") rol = "AUXILIAR";

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
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "1000px", margin: "auto" }}
          className="form"
        >
          <div className="contenedor1">
            <h2>{idComerciante ? "Editar Comerciante" : "Datos Generales"}</h2>
          </div>

          <div className="contenedor2">
            <div className="izq">
              <div className="input-container">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="nombre">Razón Social*</label>
              </div>

              <div className="input-container">
                <input
                  type="text"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="municipio">Ciudad*</label>
              </div>

              <div className="input-container">
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
                <label htmlFor="telefono">Teléfono</label>
              </div>
            </div>

            <div className="der">
              <div className="input-container">
                <input
                  type="email"
                  name="correoElectronico"
                  value={formData.correoElectronico}
                  onChange={handleChange}
                />
                <label htmlFor="correoElectronico">Email</label>
              </div>

              <div className="input-container">
                <input
                  type="date"
                  name="fechaRegistro"
                  value={formData.fechaRegistro}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="fechaRegistro">Fecha de registro *</label>
              </div>

              <button type="submit" className="buttonEnviar">
                {idComerciante ? "Actualizar" : "Enviar"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default Registro;
