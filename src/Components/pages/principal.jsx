import React, { useState, useEffect } from "react";
import "./principal.css";
import imagen from "../Assets/logo.png";
import { FaUserCircle, FaEdit, FaTrashAlt, FaSearch, FaPlus, FaEye } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Principal = () => {
  const navigate = useNavigate();
  const [comerciantes, setComerciantes] = useState([]);
  const [searchId, setSearchId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch("http://localhost:8081/comerciantes")
      .then((response) => response.json())
      .then((data) => setComerciantes(data))
      .catch((error) => console.error("Error fetching comerciantes:", error));
  }, []);

  const handleSearch = () => {
    if (searchId.trim() === "") {
      alert("Por favor, ingresa un ID válido.");
      return;
    }

    fetch(`http://localhost:8081/comerciantes/${searchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Comerciante no encontrado");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          alert("No se encontró un comerciante con ese ID.");
        } else {
          setComerciantes([data]);
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.error("Error buscando comerciante:", error);
        alert("No se encontró un comerciante con ese ID.");
      });
  };

  const handleRedirect = () => {
    navigate("/registro");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comerciantes.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(comerciantes.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate("/registro", { state: { id } });
  };

  const handleAddEstablecimiento = (id) => {
    console.log(id);
    navigate("/establecimientoNew", { state: { id } });
  };

  const handleViewEstablecimiento = (id) => {
    console.log(id);
    navigate("/establecimientoView", { state: { id } });
  };

  const handleDelete = (idComerciante) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este comerciante?")
    ) {
      fetch(`http://localhost:8081/comerciantes/${idComerciante}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar comerciante");
          }
          setComerciantes((prevComerciantes) =>
            prevComerciantes.filter(
              (comerciante) => comerciante.idComerciante !== idComerciante
            )
          );
          alert("Comerciante eliminado con éxito");
        })
        .catch((error) => {
          console.error("Error eliminando comerciante:", error);
          alert("Hubo un error al eliminar al comerciante");
        });
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

      <div className="content">
        <h2 className="min-title">LISTA DE FORMULARIOS CREADOS</h2>
        <div className="search-bar">
          <input
            className="buscarInp"
            type="text"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="buscar" onClick={handleSearch}>
            <FaSearch /> Buscar
          </button>
          <button className="buscar" onClick={() => window.location.reload()}>
            <FaSearch /> Reiniciar busqueda
          </button>
        </div>
        <div>
          <button className="button" onClick={handleRedirect}>
            Crear Formulario Nuevo
          </button>
        </div>
      </div>

      <div className="tabla">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Razón Social</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Fecha Registro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((comerciante, index) => (
              <tr key={index}>
                <td>{comerciante.idComerciante}</td>
                <td>{comerciante.nombre}</td>
                <td>{comerciante.telefono}</td>
                <td>{comerciante.correoElectronico}</td>
                <td>{comerciante.fechaRegistro}</td>
                <td>
                  <span
                    className={`badge ${
                      comerciante.estado === "ACTIVO"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {comerciante.estado}
                  </span>
                </td>
                <td>
                  <FaEdit
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    title="Editar"
                    onClick={() => handleEdit(comerciante.idComerciante)}
                  />
                  <FaTrashAlt
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "red",
                    }}
                    title="Eliminar"
                    onClick={() => handleDelete(comerciante.idComerciante)}
                  />
                  <FaPlus
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "Blue",
                    }}
                    title="Añadir Establecimiento"
                    onClick={() => handleAddEstablecimiento(comerciante.idComerciante)}
                  />                  
                  <FaEye
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "green",
                    }}
                    title="Ver Establecimientos"
                    onClick={() => handleViewEstablecimiento(comerciante.idComerciante)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="pagination">
          <button
            className="pag-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de{" "}
            {Math.ceil(comerciantes.length / itemsPerPage)}
          </span>
          <button
            className="pag-btn"
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(comerciantes.length / itemsPerPage)
            }
          >
            Siguiente
          </button>
        </div>

        <div className="select-container">
          <label>Elementos por página: </label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Principal;
