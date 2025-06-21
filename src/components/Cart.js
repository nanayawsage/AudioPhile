import React, { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import '../Styles/Cart.css'



const Cart = ({
  isOpen,
  onClose,
  cartItems,
  updateCartItem,
  removeAllItems,
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const updateQuantity = (id, change) => {
    const item = cartItems.find((item) => item.id === id);
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
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
    const orderNum = "XX" + Math.floor(Math.random() * 90000 + 10000);
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

  const getResponsiveClass = () => {
    if (isMobile) return "mobile";
    if (isTablet) return "tablet";
    return "desktop";
  };

  return (
    <>
  
      
      <div 
        className={`cart-overlay ${!isOpen ? 'hidden' : ''}`} 
        onClick={onClose} 
      />
      
      <div className={`cart-container ${getResponsiveClass()} ${!isOpen ? 'closed' : ''}`}>
        {/* Cart Header */}
        <div className={`cart-header ${getResponsiveClass()}`}>
          <div className={`cart-title ${getResponsiveClass()}`}>
            <ShoppingCart size={20} />
            CART
            {getTotalItems() > 0 && (
              <span className="item-count">{getTotalItems()}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className={`cart-content ${getResponsiveClass()}`}>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} className="empty-cart-icon" />
              <div className="empty-cart-text">Your cart is empty</div>
              <div className="empty-cart-subtext">
                Add some products to get started
              </div>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div
                    className="item-image"
                    style={{
                      backgroundImage: item.image
                        ? `url(${item.image})`
                        : "none",
                    }}
                  >
                    {!item.image && "IMG"}
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="quantity-button"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="quantity-button"
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
          <div className={`cart-actions ${getResponsiveClass()}`}>
            <button
              onClick={removeAllItems}
              className="remove-all-button"
            >
              Remove all
            </button>

            <div className="total-section">
              <div className="total-row">
                <span className="total-label">Total</span>
                <span className="total-price">
                  {formatPrice(getProductTotal())}
                </span>
              </div>
              <div className="total-row">
                <span className="total-label">Shipping</span>
                <span className="total-price">
                  {formatPrice(getShippingCost())}
                </span>
              </div>
              <div className="total-row">
                <span className="total-label">VAT (Included)</span>
                <span className="total-price">{formatPrice(getVAT())}</span>
              </div>
              <div className="grand-total-row">
                <span className="grand-total-label">Grand Total</span>
                <span className="grand-total-price">
                  {formatPrice(getGrandTotal())}
                </span>
              </div>
            </div>

            <button
              className="checkout-button"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Order Confirmation Modal */}
      <div className={`confirmation-overlay ${getResponsiveClass()} ${!showConfirmation ? 'hidden' : ''}`}>
        <div className={`confirmation-modal ${getResponsiveClass()}`}>
          <div className={`confirmation-header ${getResponsiveClass()}`}>
            <h2 className={`confirmation-title ${getResponsiveClass()}`}>Thank you for your order!</h2>
            <p className="order-number">Order #{orderNumber}</p>
          </div>

          <div className={`confirmation-content ${getResponsiveClass()}`}>
            <p className="thank-you-message">
              You will receive an email confirmation shortly. Your order has
              been processed and will be shipped within 2-3 business days.
            </p>

            <div className="order-summary">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div>
                      <div className="summary-item-name">{item.name}</div>
                      <div className="summary-item-details">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="summary-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-total-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(getProductTotal())}</span>
                </div>
                <div className="summary-total-row">
                  <span>Shipping</span>
                  <span>{formatPrice(getShippingCost())}</span>
                </div>
                <div className="summary-total-row">
                  <span>VAT (20%)</span>
                  <span>{formatPrice(getVAT())}</span>
                </div>
                <div className="summary-grand-total">
                  <span>Grand Total</span>
                  <span>{formatPrice(getGrandTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`confirmation-actions ${getResponsiveClass()}`}>
            <button
              className="continue-button"
              onClick={handleConfirmationClose}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ShoppingApp = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Sample products for demonstration
  const sampleProducts = [
    {
      id: 1,
      name: "XX99 Mark II Headphones",
      price: 2999,
      image: null,
    },
    {
      id: 2,
      name: "XX59 Headphones",
      price: 899,
      image: null,
    },
    {
      id: 3,
      name: "YX1 Wireless Earphones",
      price: 599,
      image: null,
    },
  ];

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateCartItem(product.id, {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      });
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItem = (id, updatedItem) => {
    if (updatedItem === null) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? updatedItem : item))
      );
    }
  };

  const removeAllItems = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="app-container">
      {/* Header with Cart Icon */}
      <header className="header">
        <h1 className="header-title">Audiophile</h1>

        <button
          onClick={() => setIsCartOpen(true)}
          className="cart-icon-button"
        >
          <ShoppingCart size={24} />
          {getTotalItems() > 0 && (
            <span className="cart-badge">
              {getTotalItems()}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="products-title">Products</h2>

        <div className="products-grid">
          {sampleProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                Product Image
              </div>

              <h3 className="product-name">
                {product.name}
              </h3>

              <p className="product-price">
                $ {product.price.toLocaleString()}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-button"
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