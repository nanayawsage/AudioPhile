import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, updateCartItem, removeAllItems }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const updateQuantity = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      if (newQuantity === 0) {
        updateCartItem(id, null); // Remove item
      } else {
        updateCartItem(id, { ...item, quantity: newQuantity });
      }
    }
  };

  const getProductTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShippingCost = () => {
    return cartItems.length > 0 ? 50 : 0;
  };

  const getVAT = () => {
    return Math.round(getProductTotal() * 0.2);
  };

  const getGrandTotal = () => {
    return getProductTotal() + getShippingCost() + getVAT();
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    const orderNum = 'XX' + Math.floor(Math.random() * 90000 + 10000);
    setOrderNumber(orderNum);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    removeAllItems();
    onClose();
  };

  const formatPrice = (price) => {
    return `$ ${price.toLocaleString()}`;
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: isOpen ? 'block' : 'none',
    },
    cartContainer: {
      position: 'fixed',
      top: 0,
      right: isOpen ? 0 : '-100%',
      width: isMobile ? '100%' : isTablet ? '400px' : '420px',
      height: '100vh',
      backgroundColor: '#ffffff',
      boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
      transition: 'right 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    },
    cartHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '1rem 1rem' : '1.5rem 2rem',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#000000',
      color: 'white'
    },
    cartTitle: {
      fontSize: isMobile ? '1.125rem' : '1.25rem',
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    itemCount: {
      backgroundColor: '#fb923c',
      color: 'white',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.75rem',
      minWidth: '1.5rem',
      textAlign: 'center'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    cartContent: {
      flex: 1,
      padding: isMobile ? '1rem' : '1.5rem 2rem',
      overflowY: 'auto'
    },
    emptyCart: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#6b7280'
    },
    emptyCartIcon: {
      margin: '0 auto 1rem',
      color: '#d1d5db'
    },
    emptyCartText: {
      fontSize: '1rem',
      fontWeight: '500',
      marginBottom: '0.5rem'
    },
    emptyCartSubtext: {
      fontSize: '0.875rem',
      color: '#9ca3af'
    },
    cartItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    cartItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb'
    },
    itemImage: {
      width: '60px',
      height: '60px',
      backgroundColor: '#e5e7eb',
      borderRadius: '0.5rem',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      color: '#6b7280',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    itemDetails: {
      flex: 1,
      minWidth: 0
    },
    itemName: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem',
      lineHeight: '1.2'
    },
    itemPrice: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.375rem',
      padding: '0.5rem'
    },
    quantityButton: {
      background: 'none',
      border: 'none',
      color: '#fb923c',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s ease',
      width: '28px',
      height: '28px'
    },
    quantity: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827',
      minWidth: '20px',
      textAlign: 'center'
    },
    cartActions: {
      padding: isMobile ? '1rem' : '1.5rem 2rem',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb'
    },
    removeAllButton: {
      background: 'none',
      border: 'none',
      color: '#6b7280',
      cursor: 'pointer',
      fontSize: '0.875rem',
      textDecoration: 'underline',
      marginBottom: '1rem',
      padding: '0.5rem 0',
      transition: 'color 0.2s ease'
    },
    totalSection: {
      marginBottom: '1.5rem'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    totalLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    totalPrice: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827'
    },
    grandTotalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #e5e7eb'
    },
    grandTotalLabel: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    grandTotalPrice: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#fb923c'
    },
    checkoutButton: {
      width: '100%',
      backgroundColor: '#fb923c',
      color: 'white',
      border: 'none',
      padding: '1rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    
    // Confirmation Modal Styles
    confirmationOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 10001,
      display: showConfirmation ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '2rem'
    },
    confirmationModal: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      width: '100%',
      maxWidth: isMobile ? '100%' : '500px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    confirmationHeader: {
      padding: isMobile ? '1.5rem 1.5rem 1rem' : '2rem 2rem 1rem',
      borderBottom: '1px solid #e5e7eb'
    },
    confirmationTitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    orderNumber: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    confirmationContent: {
      padding: isMobile ? '1rem 1.5rem' : '1.5rem 2rem'
    },
    thankYouMessage: {
      fontSize: '0.875rem',
      color: '#6b7280',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    orderSummary: {
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1.5rem'
    },
    summaryTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    summaryItems: {
      marginBottom: '1rem'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      fontSize: '0.875rem'
    },
    summaryItemName: {
      color: '#111827',
      fontWeight: '500'
    },
    summaryItemDetails: {
      color: '#6b7280',
      fontSize: '0.75rem'
    },
    summaryItemPrice: {
      color: '#111827',
      fontWeight: '600'
    },
    summaryTotals: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '1rem'
    },
    summaryTotalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      fontSize: '0.875rem'
    },
    summaryGrandTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '0.5rem',
      borderTop: '1px solid #e5e7eb',
      fontWeight: 'bold',
      fontSize: '1rem',
      color: '#fb923c'
    },
    confirmationActions: {
      padding: isMobile ? '1rem 1.5rem 1.5rem' : '1rem 2rem 2rem',
      borderTop: '1px solid #e5e7eb'
    },
    continueButton: {
      width: '100%',
      backgroundColor: '#fb923c',
      color: 'white',
      border: 'none',
      padding: '1rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        style={styles.overlay}
        onClick={onClose}
      />
      
      {/* Cart Container */}
      <div style={styles.cartContainer}>
        {/* Cart Header */}
        <div style={styles.cartHeader}>
          <div style={styles.cartTitle}>
            <ShoppingCart size={20} />
            CART 
            {getTotalItems() > 0 && (
              <span style={styles.itemCount}>{getTotalItems()}</span>
            )}
          </div>
          <button
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Close cart"
            onMouseEnter={(e) => {
              e.target.style.color = '#fb923c';
              e.target.style.backgroundColor = 'rgba(251, 146, 60, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'white';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div style={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div style={styles.emptyCart}>
              <ShoppingCart size={48} style={styles.emptyCartIcon} />
              <div style={styles.emptyCartText}>Your cart is empty</div>
              <div style={styles.emptyCartSubtext}>Add some products to get started</div>
            </div>
          ) : (
            <div style={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <div 
                    style={{
                      ...styles.itemImage,
                      backgroundImage: item.image ? `url(${item.image})` : 'none'
                    }}
                  >
                    {!item.image && 'IMG'}
                  </div>
                  <div style={styles.itemDetails}>
                    <div style={styles.itemName}>{item.name}</div>
                    <div style={styles.itemPrice}>{formatPrice(item.price)}</div>
                  </div>
                  <div style={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={styles.quantityButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(251, 146, 60, 0.1)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={styles.quantityButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(251, 146, 60, 0.1)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Actions */}
        {cartItems.length > 0 && (
          <div style={styles.cartActions}>
            <button
              onClick={removeAllItems}
              style={styles.removeAllButton}
              onMouseEnter={(e) => e.target.style.color = '#fb923c'}
              onMouseLeave={(e) => e.target.style.color = '#6b7280'}
            >
              Remove all
            </button>
            
            <div style={styles.totalSection}>
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalPrice}>{formatPrice(getProductTotal())}</span>
              </div>
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Shipping</span>
                <span style={styles.totalPrice}>{formatPrice(getShippingCost())}</span>
              </div>
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>VAT (Included)</span>
                <span style={styles.totalPrice}>{formatPrice(getVAT())}</span>
              </div>
              <div style={styles.grandTotalRow}>
                <span style={styles.grandTotalLabel}>Grand Total</span>
                <span style={styles.grandTotalPrice}>{formatPrice(getGrandTotal())}</span>
              </div>
            </div>

            <button
              style={styles.checkoutButton}
              onClick={handleCheckout}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fb923c'}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      
      {/* Order Confirmation Modal */}
      <div style={styles.confirmationOverlay}>
        <div style={styles.confirmationModal}>
          <div style={styles.confirmationHeader}>
            <h2 style={styles.confirmationTitle}>Thank you for your order!</h2>
            <p style={styles.orderNumber}>Order #{orderNumber}</p>
          </div>
          
          <div style={styles.confirmationContent}>
            <p style={styles.thankYouMessage}>
              You will receive an email confirmation shortly. Your order has been processed and will be shipped within 2-3 business days.
            </p>
            
            <div style={styles.orderSummary}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              
              <div style={styles.summaryItems}>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.summaryItem}>
                    <div>
                      <div style={styles.summaryItemName}>{item.name}</div>
                      <div style={styles.summaryItemDetails}>Qty: {item.quantity} × {formatPrice(item.price)}</div>
                    </div>
                    <div style={styles.summaryItemPrice}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={styles.summaryTotals}>
                <div style={styles.summaryTotalRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(getProductTotal())}</span>
                </div>
                <div style={styles.summaryTotalRow}>
                  <span>Shipping</span>
                  <span>{formatPrice(getShippingCost())}</span>
                </div>
                <div style={styles.summaryTotalRow}>
                  <span>VAT (20%)</span>
                  <span>{formatPrice(getVAT())}</span>
                </div>
                <div style={styles.summaryGrandTotal}>
                  <span>Grand Total</span>
                  <span>{formatPrice(getGrandTotal())}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.confirmationActions}>
            <button
              style={styles.continueButton}
              onClick={handleConfirmationClose}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fb923c'}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Main App Component with Cart functionality
const ShoppingApp = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Sample products for demonstration
  const sampleProducts = [
    {
      id: 1,
      name: 'XX99 Mark II Headphones',
      price: 2999,
      image: null
    },
    {
      id: 2,
      name: 'XX59 Headphones',
      price: 899,
      image: null
    },
    {
      id: 3,
      name: 'YX1 Wireless Earphones',
      price: 599,
      image: null
    }
  ];

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateCartItem(product.id, { ...existingItem, quantity: existingItem.quantity + 1 });
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItem = (id, updatedItem) => {
    if (updatedItem === null) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => item.id === id ? updatedItem : item));
    }
  };

  const removeAllItems = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6'
    }}>
      {/* Header with Cart Icon */}
      <header style={{
        backgroundColor: '#000000',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Audiophile
        </h1>
        
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            position: 'relative',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#fb923c';
            e.target.style.backgroundColor = 'rgba(251, 146, 60, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'white';
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <ShoppingCart size={24} />
          {getTotalItems() > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#fb923c',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.75rem',
              minWidth: '1.25rem',
              textAlign: 'center'
            }}>
              {getTotalItems()}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
          Products
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {sampleProducts.map((product) => (
            <div key={product.id} style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#e5e7eb',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                Product Image
              </div>
              
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {product.name}
              </h3>
              
              <p style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#fb923c',
                marginBottom: '1rem'
              }}>
                $ {product.price.toLocaleString()}
              </p>
              
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: '100%',
                  backgroundColor: '#fb923c',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#fb923c'}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        removeAllItems={removeAllItems}
      />
    </div>
  );
};

export default ShoppingApp;