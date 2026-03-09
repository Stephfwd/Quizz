import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import '../styles/Home.css';
import ServicioPrendas from '../services/ServicioPrendas';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const fetchProductos = async () => {
        try {
            const endpoints = ["prendas", "prendasKimi", "prendasRusell"];
            const responses = await Promise.all(
                endpoints.map(endpoint => ServicioPrendas.getPrendas(endpoint))
            );

            // Combinar todos los arrays en uno solo, preservando el endpoint
            const allProducts = responses.flatMap((items, idx) =>
                (items || []).map(p => ({ ...p, _endpoint: endpoints[idx] }))
            );

            setProductos(allProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();

        // Polling cada 5 segundos para actualizar si se agrega algo desde admin
        const interval = setInterval(fetchProductos, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-wrapper">
            <Navbar onCartClick={() => setIsCartOpen(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Explora nuestra <span>Colección Exclusiva</span></h1>
                    <p className="hero-subtitle">Descubre las últimas tendencias con la mejor calidad y estilo.</p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">500+</span>
                            <span className="stat-label">Productos</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">24/7</span>
                            <span className="stat-label">Soporte</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="products-container">
                <div className="section-header">
                    <h2 className="section-title">Nuevas Llegadas</h2>
                    <div className="divider"></div>
                </div>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="products-grid">
                        {productos.map((producto) => (
                            <ProductCard
                                key={producto.id}
                                id={producto.id}
                                title={producto.title}
                                precio={producto.precio}
                                imagen={producto.imagen}
                                detalle={producto.detalle}
                                stock={producto.stock}
                                endpoint={producto._endpoint}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
