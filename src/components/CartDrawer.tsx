import React from 'react';
import '../styles/CartDrawer.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartDrawer = ({ isOpen, onClose }: any) => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        const savedUser = localStorage.getItem('quizz-user');

        if (!savedUser) {
            onClose(); // Cerrar el carrito primero
            Swal.fire({
                icon: 'info',
                title: 'Inicia Sesión',
                text: 'Para finalizar tu compra, primero debes registrarte o iniciar sesión.',
                showCancelButton: true,
                confirmButtonText: 'Ir a Login',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#9ca3af',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        const user = JSON.parse(savedUser);
        const orderData = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.nombre,
            userEmail: user.correo,
            items: cartItems,
            total: getCartTotal(),
            date: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:3000/compras', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Compra Exitosa!',
                    text: 'Tu pedido ha sido procesado correctamente. Gracias por tu preferencia.',
                    confirmButtonColor: '#10b981'
                });
                clearCart();
                onClose();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Procesando Compra',
                    text: 'Hubo un problema al procesar tu compra. Por favor, intenta de nuevo.',
                    confirmButtonColor: '#ef4444'
                });
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo conectar con el servidor. Inténtalo más tarde.',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2>Tu Carrito</h2>
                    <button className="btn-close-drawer" onClick={onClose}>&times;</button>
                </div>

                <div className="drawer-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Tu carrito está vacío</p>
                            <span>¡Agrega algunas prendas para empezar!</span>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartItems.map((item: any) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.imagen} alt={item.title} className="cart-item-image" />
                                    <div className="cart-item-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.precio}</p>
                                        <div className="cart-item-controls">
                                            <div className="quantity-selector">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="drawer-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <button className="btn-checkout" onClick={handleCheckout}>Finalizar Compra</button>
                        <button className="btn-clear" onClick={clearCart}>Vaciar Carrito</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
