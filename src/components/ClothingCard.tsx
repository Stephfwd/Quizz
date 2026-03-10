import React from 'react';
import ServicioPrendas from '../services/ServicioPrendas';
import '../styles/ClothingCard.css';

const ClothingCard = ({ image, title, price, isAddCard, onAdd }: any) => {
    if (isAddCard) {
        return (
            <div className="clothing-card clothing-card-add" onClick={onAdd as any}>
                <div className="add-icon">+</div>
                <p className="add-text">Añadir Nueva Prenda</p>
            </div>
        );
    }

    return (
        <div className="clothing-card">
            <div className="clothing-card-image-wrapper">
                <img
                    src={image as any || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000'}
                    alt={title as any}
                    className="clothing-card-image"
                />
                <div className="clothing-card-info">
                    <h3 className="clothing-card-title">{title as any}</h3>
                    <p className="clothing-card-price">{price as any}</p>
                </div>
            </div>
        </div>
    );
};

export default ClothingCard;
