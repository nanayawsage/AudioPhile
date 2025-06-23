import React, { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingCart, ArrowLeft, User, MapPin, CreditCard, Check } from "lucide-react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import '../Styles/Cart.css'

const Cart = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    // Billing Details
    name: '',
    email: '',
    phone: '',
    // Shipping Info
    address: '',
    zipCode: '',
    city: '',
    country: '',
    // Payment Details
    eMoneyNumber: '',
    eMoneyPin: '',
    paymentMethod: 'e-money' // 'e-money' or 'cash'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    cartItems,
    updateCartItem,
    removeAllItems,
    removeCartItem,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Cart Operations
  const updateQuantity = (id, change) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      if (newQuantity === 0) {
        removeCartItem(id);
      } else {
        updateCartItem(id, { ...item, quantity: newQuantity });
      }
    }
  };

  const removeItem = (id) => {
    removeCartItem(id);
  };

  // Price Calculations
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

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    // Billing Details
    if (!checkoutData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!checkoutData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(checkoutData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!checkoutData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(checkoutData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number format is invalid';
    }

    // Shipping Info
    if (!checkoutData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!checkoutData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP Code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(checkoutData.zipCode)) {
      newErrors.zipCode = 'ZIP Code format is invalid (e.g., 12345 or 12345-6789)';
    }
    if (!checkoutData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!checkoutData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // Payment Details (only for e-money)
    if (checkoutData.paymentMethod === 'e-money') {
      if (!checkoutData.eMoneyNumber.trim()) {
        newErrors.eMoneyNumber = 'e-Money Number is required';
      } else if (!/^\d{9}$/.test(checkoutData.eMoneyNumber)) {
        newErrors.eMoneyNumber = 'e-Money Number must be 9 digits';
      }
      if (!checkoutData.eMoneyPin.trim()) {
        newErrors.eMoneyPin = 'e-Money PIN is required';
      } else if (!/^\d{4}$/.test(checkoutData.eMoneyPin)) {
        newErrors.eMoneyPin = 'e-Money PIN must be 4 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Handlers
  const handleInputChange = (field, value) => {
    setCheckoutData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    setShowCheckout(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const orderNum = "XX" + Math.floor(Math.random() * 90000 + 10000);
    setOrderNumber(orderNum);
    setShowCheckout(false);
    setShowConfirmation(true);
    setIsSubmitting(false);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    removeAllItems();
    setCheckoutData({
      name: '',
      email: '',
      phone: '',
      address: '',
      zipCode: '',
      city: '',
      country: '',
      eMoneyNumber: '',
      eMoneyPin: '',
      paymentMethod: 'e-money'
    });
    navigate('/');
  };

  const formatPrice = (price) => {
    return `$ ${price.toLocaleString()}`;
  };

  const pageStyles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: isMobile ? '1rem' : '2rem',
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#64748b',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      color: '#0f172a',
      margin: 0,
    },
    cartContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
    },
  };

  const inputStyles = {
    container: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box',
    },
    inputError: {
      borderColor: '#ef4444',
    },
    inputFocus: {
      borderColor: '#fb923c',
      outline: 'none',
    },
    error: {
      marginTop: '0.25rem',
      fontSize: '0.75rem',
      color: '#ef4444',
    },
  };

  return (
    <div style={pageStyles.container}>
      {/* Page Header */}
      <div style={pageStyles.header}>
        <button
          style={pageStyles.backButton}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f1f5f9';
            e.target.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.borderColor = '#e2e8f0';
          }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 style={pageStyles.title}>
          Shopping Cart
          {getTotalItems() > 0 && (
            <span style={{ color: '#64748b', fontWeight: 'normal', marginLeft: '0.5rem' }}>
              ({getTotalItems()} items)
            </span>
          )}
        </h1>
      </div>

      {/* Cart Content Container */}
      <div style={pageStyles.cartContent}>
        <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <ShoppingCart size={64} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>
                Your cart is empty
              </h3>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                Add some products to get started
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#fb923c',
                  color: '#ffffff',
                  fontWeight: '500',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#fb923c'}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr' }}>
              {/* Cart Items */}
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
                  Items in Cart
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0',
                    }}>
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          color: '#64748b',
                          backgroundImage: item.image ? `url(${item.image})` : "none",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        {!item.image && "IMG"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>
                          {item.name}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                          {formatPrice(item.price)} each
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              style={{
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{ minWidth: '2rem', textAlign: 'center', fontWeight: '500' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              style={{
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              padding: '0.25rem 0.5rem',
                              backgroundColor: 'transparent',
                              border: '1px solid #ef4444',
                              borderRadius: '0.25rem',
                              color: '#ef4444',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#ef4444';
                              e.target.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#ef4444';
                            }}
                          >
                            Remove
                          </button>
                          <div style={{ marginLeft: 'auto', fontSize: '1rem', fontWeight: '600', color: '#0f172a' }}>
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Remove All Button */}
                <button
                  onClick={removeAllItems}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    border: '1px solid #ef4444',
                    borderRadius: '0.5rem',
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ef4444';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#ef4444';
                  }}
                >
                  Remove All Items
                </button>
              </div>

              {/* Order Summary */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                height: 'fit-content',
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>Product Total</span>
                    <span style={{ fontWeight: '500' }}>{formatPrice(getProductTotal())}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>Shipping (Fixed)</span>
                    <span style={{ fontWeight: '500' }}>{formatPrice(getShippingCost())}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>VAT (20%)</span>
                    <span style={{ fontWeight: '500' }}>{formatPrice(getVAT())}</span>
                  </div>
                  <div style={{ 
                    borderTop: '1px solid #e2e8f0', 
                    paddingTop: '0.75rem',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Grand Total</span>
                    <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#fb923c' }}>
                      {formatPrice(getGrandTotal())}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    backgroundColor: '#fb923c',
                    color: '#ffffff',
                    fontWeight: '500',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#fb923c'}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '1rem' : '2rem',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            padding: 0,
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Checkout Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                Checkout
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '0.25rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Checkout Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
              <form onSubmit={handleSubmitOrder}>
                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                  {/* Checkout Form */}
                  <div>
                    {/* Billing Details */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: '#fb923c', 
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <User size={18} />
                        Billing Details
                      </h3>
                      
                      <div style={inputStyles.container}>
                        <label style={inputStyles.label}>Name *</label>
                        <input
                          type="text"
                          value={checkoutData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          style={{
                            ...inputStyles.input,
                            ...(errors.name ? inputStyles.inputError : {})
                          }}
                          placeholder="Alexei Ward"
                        />
                        {errors.name && <div style={inputStyles.error}>{errors.name}</div>}
                      </div>

                      <div style={inputStyles.container}>
                        <label style={inputStyles.label}>Email Address *</label>
                        <input
                          type="email"
                          value={checkoutData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          style={{
                            ...inputStyles.input,
                            ...(errors.email ? inputStyles.inputError : {})
                          }}
                          placeholder="alexei@mail.com"
                        />
                        {errors.email && <div style={inputStyles.error}>{errors.email}</div>}
                      </div>

                      <div style={inputStyles.container}>
                        <label style={inputStyles.label}>Phone Number *</label>
                        <input
                          type="tel"
                          value={checkoutData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          style={{
                            ...inputStyles.input,
                            ...(errors.phone ? inputStyles.inputError : {})
                          }}
                          placeholder="+1 202-555-0136"
                        />
                        {errors.phone && <div style={inputStyles.error}>{errors.phone}</div>}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: '#fb923c', 
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <MapPin size={18} />
                        Shipping Info
                      </h3>
                      
                      <div style={inputStyles.container}>
                        <label style={inputStyles.label}>Address *</label>
                        <input
                          type="text"
                          value={checkoutData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          style={{
                            ...inputStyles.input,
                            ...(errors.address ? inputStyles.inputError : {})
                          }}
                          placeholder="1137 Williams Avenue"
                        />
                        {errors.address && <div style={inputStyles.error}>{errors.address}</div>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={inputStyles.container}>
                          <label style={inputStyles.label}>ZIP Code *</label>
                          <input
                            type="text"
                            value={checkoutData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            style={{
                              ...inputStyles.input,
                              ...(errors.zipCode ? inputStyles.inputError : {})
                            }}
                            placeholder="10001"
                          />
                          {errors.zipCode && <div style={inputStyles.error}>{errors.zipCode}</div>}
                        </div>

                        <div style={inputStyles.container}>
                          <label style={inputStyles.label}>City *</label>
                          <input
                            type="text"
                            value={checkoutData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            style={{
                              ...inputStyles.input,
                              ...(errors.city ? inputStyles.inputError : {})
                            }}
                            placeholder="New York"
                          />
                          {errors.city && <div style={inputStyles.error}>{errors.city}</div>}
                        </div>
                      </div>

                      <div style={inputStyles.container}>
                        <label style={inputStyles.label}>Country *</label>
                        <input
                          type="text"
                          value={checkoutData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          style={{
                            ...inputStyles.input,
                            ...(errors.country ? inputStyles.inputError : {})
                          }}
                          placeholder="United States"
                        />
                        {errors.country && <div style={inputStyles.error}>{errors.country}</div>}
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div>
                      <h3 style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: '#fb923c', 
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <CreditCard size={18} />
                        Payment Details
                      </h3>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={inputStyles.label}>Payment Method *</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="e-money"
                              checked={checkoutData.paymentMethod === 'e-money'}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            />
                            <span style={{ fontSize: '0.875rem', color: '#374151' }}>e-Money</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cash"
                              checked={checkoutData.paymentMethod === 'cash'}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            />
                            <span style={{ fontSize: '0.875rem', color: '#374151' }}>Cash on Delivery</span>
                          </label>
                        </div>
                      </div>

                      {checkoutData.paymentMethod === 'e-money' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div style={inputStyles.container}>
                            <label style={inputStyles.label}>e-Money Number *</label>
                            <input
                              type="text"
                              value={checkoutData.eMoneyNumber}
                              onChange={(e) => handleInputChange('eMoneyNumber', e.target.value)}
                              style={{
                                ...inputStyles.input,
                                ...(errors.eMoneyNumber ? inputStyles.inputError : {})
                              }}
                              placeholder="238521993"
                              maxLength="9"
                            />
                            {errors.eMoneyNumber && <div style={inputStyles.error}>{errors.eMoneyNumber}</div>}
                          </div>

                          <div style={inputStyles.container}>
                            <label style={inputStyles.label}>e-Money PIN *</label>
                            <input
                              type="password"
                              value={checkoutData.eMoneyPin}
                              onChange={(e) => handleInputChange('eMoneyPin', e.target.value)}
                              style={{
                                ...inputStyles.input,
                                ...(errors.eMoneyPin ? inputStyles.inputError : {})
                              }}
                              placeholder="6891"
                              maxLength="4"
                            />
                            {errors.eMoneyPin && <div style={inputStyles.error}>{errors.eMoneyPin}</div>}
                          </div>
                        </div>
                      )}

                      {checkoutData.paymentMethod === 'cash' && (
                        <div style={{
                          padding: '1rem',
                          backgroundColor: '#f8fafc',
                          borderRadius: '0.5rem',
                          border: '1px solid #e2e8f0',
                        }}>
                          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                            The 'Cash on Delivery' option enables you to pay in cash when our delivery courier 
                            arrives at your residence. Just make sure your address is correct so that your 
                            order will not be cancelled.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Summary in Checkout */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
                      Summary
                    </h3>
                    
                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0',
                    }}>
                      {/* Items */}
                      <div style={{ marginBottom: '1rem' }}>
                        {cartItems.map((item) => (
                          <div key={item.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.75rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '1px solid #e2e8f0',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  backgroundColor: '#e2e8f0',
                                  borderRadius: '0.25rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.75rem',
                                  color: '#64748b',
                                  backgroundImage: item.image ? `url(${item.image})` : "none",
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              >
                                {!item.image && "IMG"}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0f172a' }}>
                                  {item.name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                  {formatPrice(item.price)} × {item.quantity}
                                </div>
                              </div>
                            </div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0f172a' }}>
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Totals */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                          <span style={{ color: '#64748b' }}>Product Total</span>
                          <span style={{ fontWeight: '500' }}>{formatPrice(getProductTotal())}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                          <span style={{ color: '#64748b' }}>Shipping</span>
                          <span style={{ fontWeight: '500' }}>{formatPrice(getShippingCost())}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                          <span style={{ color: '#64748b' }}>VAT (20%)</span>
                          <span style={{ fontWeight: '500' }}>{formatPrice(getVAT())}</span>
                        </div>
                        <div style={{
                          borderTop: '1px solid #e2e8f0',
                          paddingTop: '0.5rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontWeight: '600',
                          color: '#0f172a',
                        }}>
                          <span>Grand Total</span>
                          <span style={{ color: '#fb923c' }}>{formatPrice(getGrandTotal())}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: isSubmitting ? '#cbd5e1' : '#fb923c',
                      color: '#ffffff',
                      fontWeight: '500',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      transition: 'background-color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      margin: '0 auto',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.backgroundColor = '#ea580c';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.target.style.backgroundColor = '#fb923c';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #ffffff',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }} />
                        Processing...
                      </>
                    ) : (
                      'Continue & Pay'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '1rem' : '2rem',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            padding: isMobile ? '1.5rem' : '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
          }}>
            {/* Success Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#fb923c',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <Check size={32} style={{ color: '#ffffff' }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#0f172a', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Thank you for your order!
              </h2>
              <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                You will receive an email confirmation shortly.
              </p>
              <p style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
                Order #{orderNumber}
              </p>
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              marginBottom: '1.5rem',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid #e2e8f0',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          color: '#64748b',
                          backgroundImage: item.image ? `url(${item.image})` : "none",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        {!item.image && "IMG"}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0f172a' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0f172a' }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#64748b' }}>Product Total</span>
                  <span>{formatPrice(getProductTotal())}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#64748b' }}>Shipping</span>
                  <span>{formatPrice(getShippingCost())}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>VAT (20%)</span>
                  <span>{formatPrice(getVAT())}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontWeight: '600', 
                  color: '#0f172a',
                  fontSize: '1.125rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid #e2e8f0',
                }}>
                  <span>Grand Total</span>
                  <span style={{ color: '#fb923c' }}>{formatPrice(getGrandTotal())}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmationClose}
              style={{
                width: '100%',
                backgroundColor: '#fb923c',
                color: '#ffffff',
                fontWeight: '500',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fb923c'}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Add removeCartItem to CartContext if not present
export default Cart;