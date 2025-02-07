import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EstablecimientoView from "../pages/EstablecimientoView/EstablecimientoView";

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify({ correoElectronico: "usuario@test.com", nombre: "Juan", rol: "ADMIN" })
  );
});

test("Renderiza la tabla de establecimientos correctamente", () => {
  render(
    <MemoryRouter>
      <EstablecimientoView />
    </MemoryRouter>
  );

  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("Nombre de establecimiento")).toBeInTheDocument();
  expect(screen.getByText("Ingresos")).toBeInTheDocument();
  expect(screen.getByText("Número de empleados")).toBeInTheDocument();
  expect(screen.getByText("Acciones")).toBeInTheDocument();
});
