import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm.jsx";
import Principal from "./Components/pages/principal";
import Registro from "./Components/pages/Registro/Registro.jsx";
import EstablecimientoNew from "./Components/pages/EstablecimientoNew/EstablecimientoNew.jsx";
import EstablecimientoView from "./Components/pages/EstablecimientoView/EstablecimientoView.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/principal" element={<Principal />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/establecimientoNew" element={<EstablecimientoNew />} />
                <Route path="/establecimientoView" element={<EstablecimientoView/>} />
            </Routes>
        </Router>
    );
};

export default App;
