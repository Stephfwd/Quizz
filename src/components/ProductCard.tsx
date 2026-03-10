import React, { useState } from 'react';
import '../styles/ProductCard.css';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ServicioPrendas from '../services/ServicioPrendas';

const ProductCard = ({ title, precio, imagen, id, detalle, stock, endpoint }: any) => {
    const { addToCart }: any = useCart();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStock, setCurrentStock] = useState(stock ?? 0);
    const product = { title, precio, imagen, id, detalle };

    const handleAddToCart = async () => {
        const savedUser = localStorage.getItem('quizz-user');
        if (!savedUser) {
            Swal.fire({
                icon: 'info',
                title: 'Inicia Sesión',
                text: 'Para añadir productos al carrito, primero debes registrarte o iniciar sesión.',
                showCancelButton: true,
                confirmButtonText: 'Ir a Login',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#9ca3af',
            }).then((result: any) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        if (currentStock <= 0) return;

        const newStock = currentStock - 1;

        // Update stock in db.json via the product's endpoint
        try {
            const ep = endpoint || 'prendas';
            await ServicioPrendas.patchPrendas({ stock: newStock }, id, ep);
            setCurrentStock(newStock);
        } catch (error: any) {
            console.error('Error al actualizar stock:', error);
        }

        addToCart(product);
    };

    const sinStock = currentStock <= 0;

    return (
        <>
            <div className="product-card">
                <div className="product-image-container">
                    <img src={imagen} alt={title} className="product-image" />
                    <div className="product-overlay">
                        <button className="btn-view" onClick={() => setIsModalOpen(true)}>
                            Ver Detalles
                        </button>
                    </div>
                    {/* Stock badge */}
                    <div className={`stock-badge ${sinStock ? 'stock-agotado' : currentStock <= 3 ? 'stock-bajo' : 'stock-ok'}`}>
                        {sinStock ? 'Agotado' : `Stock: ${currentStock}`}
                    </div>
                </div>
                <div className="product-info">
                    <h3 className="product-title">{title}</h3>
                    <p className="product-price">{precio}</p>
                    <button
                        className="btn-add-cart"
                        onClick={handleAddToCart}
                        disabled={sinStock}
                        style={sinStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                        {sinStock ? 'Sin Stock' : 'Añadir al Carrito'}
                    </button>
                </div>
            </div>

            <ProductDetailModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ProductCard;
