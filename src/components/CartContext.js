import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  const addToCart = (product) => {
    // Determine the appropriate image based on screen size
    const getProductImage = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1024;
      if (width < 768) {
        return product.categoryImage?.mobile || product.image?.mobile;
      } else if (width < 1024) {
        return product.categoryImage?.tablet || product.image?.tablet;
      } else {
        return product.categoryImage?.desktop || product.image?.desktop;
      }
    };

    // Create a cart-ready product with the correct image
    const cartProduct = {
      ...product,
      image: getProductImage()
    };

    const existingItem = cartItems.find((item) => item.id === cartProduct.id);
    if (existingItem) {
      updateCartItem(cartProduct.id, {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      });
    } else {
      setCartItems([...cartItems, { ...cartProduct, quantity: 1 }]);
    }
  };

  // Update cart item
  const updateCartItem = (id, updatedItem) => {
    if (updatedItem === null) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? updatedItem : item))
      );
    }
  };

  // Remove specific cart item
  const removeCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Remove all items
  const removeAllItems = () => {
    setCartItems([]);
  };

  // Get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Open/close cart
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    updateCartItem,
    removeCartItem,
    removeAllItems,
    getTotalItems,
    getTotalPrice,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};