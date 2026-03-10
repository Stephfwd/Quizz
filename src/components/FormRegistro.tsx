import React, { useState, useEffect } from 'react'
import ServicioUsuarios from '../services/ServicioUsuarios'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import '../styles/FormRegistro.css'





function FormRegistro() {

    const [usuarios, setUsuarios] = useState<any[]>([])

    const [nombreUsuario, setNombreUsuario] = useState("")
    const [correoUsuario, setCorreoUsuario] = useState("")
    const [contraseñaUsuario, setContraseñaUsuario] = useState("")

    const [editandoId, setEditandoId] = useState(null)

    useEffect(() => {

        async function cargarUsuarios() {

            const dataUsuarios = await ServicioUsuarios.getUsuarios()

            setUsuarios(dataUsuarios)

        }

        cargarUsuarios()

    }, [])



    async function registroUsuario() {
        const nombreTrimmed = nombreUsuario.trim();
        const correoTrimmed = correoUsuario.trim();
        const contraseñaTrimmed = contraseñaUsuario.trim();

        if (!nombreTrimmed || !correoTrimmed || !contraseñaTrimmed) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos Incompletos',
                text: 'Por favor, completa todos los campos. No se permiten solo espacios.',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        // Validar que el nombre no contenga números
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nombreRegex.test(nombreTrimmed)) {
            Swal.fire({
                icon: 'error',
                title: 'Nombre Inválido',
                text: 'El nombre no puede contener números ni caracteres especiales.',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        // Validar formato de correo básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoTrimmed)) {
            Swal.fire({
                icon: 'error',
                title: 'Correo Inválido',
                text: 'Por favor, ingresa un correo electrónico válido.',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        if (contraseñaTrimmed.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña Corta',
                text: 'La contraseña debe tener al menos 6 caracteres.',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        const objUsuario = {
            nombre: nombreTrimmed,
            correo: correoTrimmed,
            contraseña: contraseñaTrimmed,
            role: "user"
        }

        // Verificar si el correo ya está registrado
        const usuarioExistente = usuarios.find((u: any) => u.correo.toLowerCase() === correoTrimmed.toLowerCase());
        if (usuarioExistente) {
            Swal.fire({
                icon: 'warning',
                title: '¡Correo ya registrado!',
                text: 'Este correo electrónico ya tiene una cuenta. Por favor inicia sesión o usa otro correo.',
                confirmButtonColor: '#00A19B'
            });
            return;
        }

        try {
            const usuarioAlmacenado = await ServicioUsuarios.postUsuarios(objUsuario)
            if (usuarioAlmacenado) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro Exitoso!',
                    text: 'Te has registrado correctamente.',
                    confirmButtonColor: '#10b981'
                });
                setNombreUsuario("");
                setCorreoUsuario("");
                setContraseñaUsuario("");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups...',
                    text: 'Hubo un error al registrar el usuario',
                    confirmButtonColor: '#ef4444'
                });
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            Swal.fire({
                icon: 'error',
                title: '¡Error de conexión!',
                text: 'No se pudo conectar con el servidor.',
                confirmButtonColor: '#ef4444'
            });
        }
    }



    async function editar(id: any) {

        const objUsuario = {

            nombre: nombreUsuario,
            correo: correoUsuario,
            contraseña: contraseñaUsuario

        }

        const valorEditado = await ServicioUsuarios.patchUsuarios(objUsuario, id)

        console.log(valorEditado)

    }


    return (
        <div className="register-card">
            <h2 className="register-title">Únete a <span>Mercedes F1</span></h2>
            <p className="register-subtitle">Crea tu cuenta para acceder a compras exclusivas</p>

            <form className="register-form" onSubmit={(e) => { e.preventDefault(); registroUsuario(); }}>
                <div className="input-group">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        placeholder="Ej. Lewis Hamilton"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                </div>

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
                        placeholder="Mínimo 6 caracteres"
                        value={contraseñaUsuario}
                        onChange={(e) => setContraseñaUsuario(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn-register-submit">
                    Registrar Cuenta
                </button>
            </form>

            <div className="register-footer">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión aquí</Link>
            </div>
        </div>
    )

}

export default FormRegistro