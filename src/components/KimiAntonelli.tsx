import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import ServicioPrendas from '../services/ServicioPrendas';
import '../styles/Home.css';

const KimiAntonelli = () => {
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const endpoint = "prendasKimi";

    const fetchProductos = async () => {
        try {
            const data = await ServicioPrendas.getPrendas(endpoint);
            setProductos(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Kimi products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
        const interval = setInterval(fetchProductos, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-wrapper">
            <Navbar onCartClick={() => setIsCartOpen(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <header className="hero-section" style={{
                background: `linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.7)), url('https://i.pinimg.com/736x/64/eb/33/64eb33da9291ecb506dedffe0f44ef6a.jpg')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderBottom: '2px solid var(--primary)'
            }}>
                <div className="hero-content">
                    <h1 className="hero-title">Colección <span>Kimi Antonelli</span></h1>
                    <p className="hero-subtitle">Equípate con el estilo de la joven promesa de Mercedes F1.</p>
                </div>
            </header>

            <main className="products-container">
                <div className="section-header">
                    <h2 className="section-title">Productos de Kimi</h2>
                    <div className="divider"></div>
                </div>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="products-grid">
                        {productos.length > 0 ? (
                            productos.map((producto: any) => (
                                <ProductCard
                                    key={producto.id as any}
                                    id={producto.id as any}
                                    title={producto.title as any}
                                    precio={producto.precio as any}
                                    imagen={producto.imagen as any}
                                    detalle={producto.detalle as any}
                                    stock={producto.stock as any}
                                    endpoint={endpoint}
                                />
                            ))
                        ) : (
                            <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>No hay productos disponibles en esta colección.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default KimiAntonelli;