import React from 'react';
import '../styles/ClothingCard.css';

const ClothingCard = ({ image, title, price, isAddCard, onAdd }) => {
    if (isAddCard) {
        return (
            <div className="clothing-card clothing-card-add" onClick={onAdd}>
                <div className="add-icon">+</div>
                <p className="add-text">Añadir Nueva Prenda</p>
            </div>
        );
    }

    return (
        <div className="clothing-card">
            <div className="clothing-card-image-wrapper">
                <img
                    src={image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000'}
                    alt={title}
                    className="clothing-card-image"
                />
                <div className="clothing-card-info">
                    <h3 className="clothing-card-title">{title}</h3>
                    <p className="clothing-card-price">{price}</p>
                </div>
            </div>
        </div>
    );
};

export default ClothingCard;
