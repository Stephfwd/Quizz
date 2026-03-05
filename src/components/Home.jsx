import React, { useState } from 'react';
import ClothingCard from './ClothingCard';
import '../styles/Home.css';

function Home() {
    const [items, setItems] = useState([
        { id: 1, title: 'Camiseta Premium', price: '$29.99', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000' },
        { id: 2, title: 'Chaqueta de Cuero', price: '$89.00', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000' },
        { id: 3, title: 'Pantalones Denim', price: '$45.50', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000' },
        { id: 4, title: 'Sudadera Urbana', price: '$55.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000' }
    ]);

    const handleAddProduct = () => {
        const url = prompt('Introduce la URL de la imagen de la prenda:');
        const name = prompt('Introduce el nombre de la prenda:');
        const price = prompt('Introduce el precio (ej: $25.00):');

        if (url && name && price) {
            const newItem = {
                id: items.length + 1,
                title: name,
                price: price,
                image: url
            };
            setItems([newItem, ...items]);
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">Catálogo de Ropa</h1>
                <menu className="home-menu">
                    <ul className="menu-list">
                        <li><a href="#" className="menu-link">Home</a></li>
                        <li><a href="#" className="menu-link">Registrarse</a></li>
                        <li><a href="#" className="menu-link">Iniciar Sesión</a></li>
                    </ul>
                </menu>
            </header>

            <div className="clothing-card-container">
                <ClothingCard isAddCard={true} onAdd={handleAddProduct} />
                {items.map(item => (
                    <ClothingCard
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
