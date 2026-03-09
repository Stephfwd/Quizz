import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useCart } from '../context/CartContext';
import { MERCEDES_LOGO_BASE64 } from '../assets/mercedesLogo';

const Navbar = ({ onCartClick }) => {
    const { getCartCount } = useCart();
    const count = getCartCount();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = () => {
            const savedUser = localStorage.getItem('quizz-user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser(null);
            }
        };

        checkUser();
        // Escuchar cambios en el localStorage para actualizar el navbar instantáneamente
        window.addEventListener('storage', checkUser);
        const interval = setInterval(checkUser, 1000); // Polling de respaldo

        return () => {
            window.removeEventListener('storage', checkUser);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('quizz-user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <img src={MERCEDES_LOGO_BASE64} alt="Mercedes F1 Logo" style={{ height: '45px', objectFit: 'contain' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                        <span style={{ fontSize: '1.2rem', color: '#fff', letterSpacing: '1px' }}>MERCEDES F1</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', letterSpacing: '2px', background: 'none', WebkitTextFillColor: 'initial' }}>STORE</span>
                    </div>
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-links">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kimi-antonelli" className="nav-links">Kimi</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/george-rusell" className="nav-links">Rusell</Link>
                    </li>

                    {!user ? (
                        <>
                            <li className="nav-item">
                                <Link to="/registro" className="nav-links">Registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links btn-login">Login</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <span className="nav-user-greeting">Hola, {user.nombre}</span>
                            </li>
                            {user.role === 'admin' && (
                                <li className="nav-item">
                                    <Link to="/panel-administrativo" className="nav-links">Panel Admin</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <button onClick={handleLogout} className="nav-links btn-logout">Cerrar Sesión</button>
                            </li>
                        </>
                    )}

                    <li className="nav-item cart-icon-container" onClick={onCartClick}>
                        <div className="cart-icon">
                            🛒
                            {count > 0 && <span className="cart-badge">{count}</span>}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
