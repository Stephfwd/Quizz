import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(() => {
        const savedUser = localStorage.getItem('quizz-user');
        return savedUser ? JSON.parse(savedUser).id : null;
    });

    // Cargar carrito inicial (Local o Servidor)
    useEffect(() => {
        const loadCart = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:3000/carritos/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setCartItems(data.items || []);
                    } else {
                        // Si no hay carrito en el servidor, usar local
                        const savedCart = localStorage.getItem('quizz-cart');
                        if (savedCart) setCartItems(JSON.parse(savedCart));
                    }
                } catch (error) {
                    console.error("Error loading cart from server:", error);
                }
            } else {
                const savedCart = localStorage.getItem('quizz-cart');
                if (savedCart) setCartItems(JSON.parse(savedCart));
            }
        };

        loadCart();
    }, [userId]);

    // Sincronizar con localStorage y Servidor
    useEffect(() => {
        localStorage.setItem('quizz-cart', JSON.stringify(cartItems));

        const syncWithServer = async () => {
            if (userId && cartItems.length >= 0) {
                try {
                    // Primero intentamos ver si existe
                    const checkResp = await fetch(`http://localhost:3000/carritos/${userId}`);
                    const method = checkResp.ok ? 'PUT' : 'POST';

                    await fetch(`http://localhost:3000/carritos${method === 'PUT' ? '/' + userId : ''}`, {
                        method: method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: userId,
                            items: cartItems,
                            lastUpdate: new Date().toISOString()
                        })
                    });
                } catch (error) {
                    console.error("Error syncing cart with server:", error);
                }
            }
        };

        const timeoutId = setTimeout(syncWithServer, 500); // Debounce de 500ms
        return () => clearTimeout(timeoutId);
    }, [cartItems, userId]);

    // Escuchar cambios en el usuario (login/logout)
    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem('quizz-user');
            setUserId(savedUser ? JSON.parse(savedUser).id : null);
        };

        window.addEventListener('storage', handleStorageChange);
        // Intervalo para detectar cambios locales si storage event no dispara en la misma pestaña
        const interval = setInterval(handleStorageChange, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    const addToCart = (product) => {
        // ... existing addToCart ...
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            // Remove symbols like $ and convert to number
            const price = parseFloat(item.precio.replace(/[^\d.]/g, ''));
            return total + (price * item.quantity);
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartCount,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
