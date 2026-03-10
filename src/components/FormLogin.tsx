import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../styles/FormLogin.css';

function FormLogin() {
    const [correoUsuario, setCorreoUsuario] = useState("");
    const [contraseñaUsuario, setContraseñaUsuario] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function iniciarSesion(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const correoTrimmed = correoUsuario.trim();
        const contraseñaTrimmed = contraseñaUsuario.trim();

        if (!correoTrimmed || !contraseñaTrimmed) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos Incompletos',
                text: 'Por favor, llena todos los campos correctamente. No se permiten solo espacios.',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/usuarios');
            const usuarios = await response.json();

            const usuarioEncontrado = usuarios.find(
                (u: any) => u.correo === correoUsuario && u.contraseña === contraseñaUsuario
            );

            if (usuarioEncontrado) {
                console.log("Sesión iniciada como:", usuarioEncontrado.nombre);

                // Guardar sesión del usuario
                localStorage.setItem('quizz-user', JSON.stringify({
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    correo: usuarioEncontrado.correo,
                    role: usuarioEncontrado.role
                }));

                if (usuarioEncontrado.role === "admin") {
                    navigate("/panel-administrativo");
                } else {
                    navigate("/");
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Fallo de Autenticación',
                    text: 'Correo o contraseña incorrectos.',
                    confirmButtonColor: '#ef4444'
                });
                setError("Correo o contraseña incorrectos.");
            }
        } catch (err) {
            console.error("Error al iniciar sesión:", error);
            Swal.fire({
                icon: 'error',
                title: '¡Error de conexión!',
                text: 'Hubo un problema al conectar con el servidor.',
                confirmButtonColor: '#ef4444'
            });
            setError("Hubo un problema al conectar con el servidor.");
        }
    }

    return (
        <div className="login-card">
            <h2 className="login-title">Bienvenido de <span>Nuevo</span></h2>
            <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

            <form onSubmit={iniciarSesion} className="login-form">
                <div className="input-group">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={correoUsuario}
                        onChange={(e) => setCorreoUsuario(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={contraseñaUsuario}
                        onChange={(e) => setContraseñaUsuario(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="btn-login-submit">
                    Iniciar Sesión
                </button>
            </form>

            <div className="login-footer">
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </div>
        </div>
    );
}

export default FormLogin;