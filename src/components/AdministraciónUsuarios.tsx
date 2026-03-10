import React, { useState, useEffect } from 'react';
import ServicioUsuarios from '../services/ServicioUsuarios';
import PanelAdministrativo from './PanelAdministrativo';
import Swal from 'sweetalert2';
import '../styles/Home.css';

function AdministracionUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [role, setRole] = useState("user");
  const [contraseña, setContraseña] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  async function obtenerUsuarios() {
    const data = await ServicioUsuarios.getUsuarios();
    setUsuarios(data);
  }

  async function eliminarUsuario(id: any, userRole: any) {
    if (userRole === 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'Acción Denegada',
        text: 'No puedes eliminar a un administrador.',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción de eliminar este usuario.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await ServicioUsuarios.deleteUsuarios(id);
        obtenerUsuarios();
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El usuario ha sido eliminado.',
          icon: 'success',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  }

  function editarUsuario(usuario: any) {
    setEditandoId(usuario.id);
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setRole(usuario.role || "user");
    setContraseña("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function guardarCambios() {
    const nombreTrimmed = nombre.trim();
    const correoTrimmed = correo.trim();

    if (!nombreTrimmed || !correoTrimmed) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'El nombre y el correo no pueden estar vacíos. No se permiten solo espacios.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

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

    const contraseñaTrimmed = contraseña.trim();
    if (contraseñaTrimmed && contraseñaTrimmed.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña Corta',
        text: 'La nueva contraseña debe tener al menos 6 caracteres.',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    const datosActualizados = {
      nombre: nombreTrimmed,
      correo: correoTrimmed,
      role
    };
    if (contraseñaTrimmed) {
      (datosActualizados as any).contraseña = contraseñaTrimmed;
    }

    await ServicioUsuarios.patchUsuarios(datosActualizados, editandoId);
    Swal.fire({
      icon: 'success',
      title: '¡Usuario actualizado!',
      toast: true,
      position: 'top-end',
      timer: 2500,
      showConfirmButton: false
    });
    setEditandoId(null);
    setNombre("");
    setCorreo("");
    setRole("user");
    setContraseña("");
    obtenerUsuarios();
  }

  return (
    <div className="home-container">
      <PanelAdministrativo />

      <div className="admin-content" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Administración de Usuarios</h1>

        {editandoId && (
          <div className="admin-form-container" style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '20px', border: '1px solid var(--glass-border)', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>Editar Usuario</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
              />
              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <input
                type="password"
                placeholder="Nueva contraseña (dejar vacío para no cambiar)"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={guardarCambios} className="btn-add-cart" style={{ flex: 2, padding: '12px' }}>
                  Actualizar
                </button>
                <button
                  onClick={() => { setEditandoId(null); setNombre(""); setCorreo(""); setContraseña(""); }}
                  style={{ flex: 1, background: '#64748b', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <table style={{ width: '100%', color: '#f8fafc', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <tr>
                <th style={{ padding: '20px', textAlign: 'left', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>Nombre</th>
                <th style={{ padding: '20px', textAlign: 'left', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>Correo</th>
                <th style={{ padding: '20px', textAlign: 'left', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>Rol</th>
                <th style={{ padding: '20px', textAlign: 'center', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((user: any) => (
                  <tr key={user.id as any} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.3s' }} className="user-row">
                    <td style={{ padding: '15px 20px' }}>{user.nombre as any}</td>
                    <td style={{ padding: '15px 20px' }}>{user.correo as any}</td>
                    <td style={{ padding: '15px 20px' }}>
                      <span style={{
                        background: user.role === 'admin' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(148, 163, 184, 0.1)',
                        color: user.role === 'admin' ? '#818cf8' : '#94a3b8',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {user.role as any || 'user'}
                      </span>
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                      <button
                        onClick={() => editarUsuario(user)}
                        style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', marginRight: '10px', fontWeight: '600' }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarUsuario(user.id as any, user.role as any)}
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No hay usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdministracionUsuarios;