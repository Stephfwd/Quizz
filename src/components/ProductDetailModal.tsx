import React from 'react';
import '../styles/ProductDetailModal.css';
import { useCart } from '../context/CartContext';

const ProductDetailModal = ({ product, isOpen, onClose }: any) => {
    const { addToCart } = useCart();

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        // Optional: show a small toast or just close the modal
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="modal-body">
                    <div className="modal-image-container">
                        <img src={product.imagen} alt={product.title} className="modal-image" />
                    </div>
                    <div className="modal-info">
                        <h2 className="modal-title">{product.title}</h2>
                        <p className="modal-price">{product.precio}</p>
                        <div className="modal-description">
                            <h3>Descripción</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {product.detalle ? product.detalle : "Esta prenda de alta calidad forma parte de nuestra colección exclusiva.\nDiseñada para ofrecer comodidad y estilo en cualquier ocasión."}
                            </p>
                            <ul>
                                <li>Material: Premium</li>
                                <li>Cuidado: Lavar a máquina</li>
                            </ul>
                        </div>
                        <button className="btn-modal-add" onClick={handleAddToCart}>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
