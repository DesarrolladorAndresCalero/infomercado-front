import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            correo: email,
            contrasena: password
        };

        try {
            const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login exitoso:", data);
                localStorage.setItem("usuario", JSON.stringify(data));
                window.location.href = "/principal";
            } else {
                setError("Correo o contraseña incorrectos");
            }
        } catch (error) {
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <div className='container1'>
            <p className='title1'>Debes iniciar sesión para acceder a la plataforma</p>
            <div className='card1'>
                <form onSubmit={handleSubmit}>
                    <p className='title1'>Digita tu correo y contraseña</p>
                    <hr />
                    {error && <p className="error-message">{error}</p>}
                    <div className='input-box'>
                        <input type="text" id='email' placeholder=' ' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <label htmlFor="email">Email</label>
                        <FaUser className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input type="password" placeholder=' ' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <label htmlFor="password">Contraseña</label>
                        <FaLock className='icon'/>
                    </div>
                    <div className="conditions-terms">
                        <label><input type="checkbox" required/> Acepto términos y condiciones</label>
                    </div>
                    <button type='submit'>Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
