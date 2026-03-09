import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PanelAdministrativo.css';
import { MERCEDES_LOGO_BASE64 } from '../assets/mercedesLogo';

const PanelAdministrativo = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-panel-nav">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '2rem' }}>
                <img src={MERCEDES_LOGO_BASE64} alt="Mercedes F1 Logo" style={{ height: '50px' }} />
                <h2 className="admin-panel-title" style={{ margin: 0, paddingBottom: 0, borderBottom: 'none' }}>Panel Administrativo</h2>
            </div>
            <div className="admin-nav-buttons">
                <button
                    className={`nav-btn ${isActive('/administracion') ? 'active' : ''}`}
                    onClick={() => navigate('/administracion')}
                >
                    <span className="btn-icon">👕</span>
                    <span className="btn-text">Gestionar Prendas</span>
                </button>
                <button
                    className={`nav-btn ${isActive('/administracion-usuarios') ? 'active' : ''}`}
                    onClick={() => navigate('/administracion-usuarios')}
                >
                    <span className="btn-icon">👥</span>
                    <span className="btn-text">Gestionar Usuarios</span>
                </button>
                <button
                    className={`nav-btn ${isActive('/admin-kimi') ? 'active' : ''}`}
                    onClick={() => navigate('/admin-kimi')}
                >
                    <span className="btn-icon">🏎️</span>
                    <span className="btn-text">Admin Kimi</span>
                </button>
                <button
                    className={`nav-btn ${isActive('/admin-rusell') ? 'active' : ''}`}
                    onClick={() => navigate('/admin-rusell')}
                >
                    <span className="btn-icon">🏁</span>
                    <span className="btn-text">Admin Rusell</span>
                </button>
                <button
                    className="nav-btn btn-logout-admin"
                    onClick={() => {
                        localStorage.removeItem('quizz-user');
                        navigate('/');
                    }}
                    style={{ borderColor: '#f8fafc', color: '#f8fafc' }}
                >
                    <span className="btn-icon">🚪</span>
                    <span className="btn-text">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
};

export default PanelAdministrativo;
