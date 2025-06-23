// ShopContext.js - Context Provider for Cart Functionality
import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // Initialize cart items from localStorage or empty object
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return {};
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  // Remove one item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  // Update cart item quantity
  const updateCartItem = (newQuantity, itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newQuantity <= 0) {
        delete newCart[itemId];
      } else {
        newCart[itemId] = newQuantity;
      }
      return newCart;
    });
  };

  // Calculate total cart amount
  const totalCartAmount = () => {
    try {
      // You'll need to import your data.json here or pass it as a prop
      // For this example, I'll assume you have access to product data
      const data = require('../data.json'); // Adjust path as needed
      
      let total = 0;
      for (const itemId in cartItems) {
        const quantity = cartItems[itemId];
        const product = data.find(item => item.id === parseInt(itemId));
        if (product && quantity > 0) {
          total += product.newPrice * quantity;
        }
      }
      return total;
    } catch (error) {
      console.error('Error calculating cart total:', error);
      return 0;
    }
  };

  // Get cart item count
  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems({});
  };

  // Check if item is in cart
  const isInCart = (itemId) => {
    return cartItems[itemId] > 0;
  };

  // Get specific item quantity
  const getItemQuantity = (itemId) => {
    return cartItems[itemId] || 0;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    totalCartAmount,
    getCartItemCount,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;