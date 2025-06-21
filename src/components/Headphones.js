import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, ArrowRight, } from 'lucide-react';
import Footer from './Footer';
import Navigation from './Navigation';



const Headphones = ({ onAddToCart }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [addedProducts, setAddedProducts] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  
  // Filter products to only include headphones
  const headphones = [
    {
      "id": 2,
      "slug": "xx59-headphones",
      "name": "XX59 Headphones",
      "image": {
        "mobile": "./assets/product-xx59-headphones/mobile/image-product.jpg",
        "tablet": "./assets/product-xx59-headphones/tablet/image-product.jpg",
        "desktop": "./assets/product-xx59-headphones/desktop/image-product.jpg"
      },
      "category": "headphones",
      "categoryImage": {
        "mobile": "./assets/product-xx59-headphones/mobile/image-category-page-preview.jpg",
        "tablet": "./assets/product-xx59-headphones/tablet/image-category-page-preview.jpg",
        "desktop": "./assets/product-xx59-headphones/desktop/image-category-page-preview.jpg"
      },
      "new": false,
      "price": 899,
      "description": "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move."
    },
    {
      "id": 3,
      "slug": "xx99-mark-one-headphones",
      "name": "XX99 Mark I Headphones",
      "image": {
        "mobile": "./assets/product-xx99-mark-one-headphones/mobile/image-product.jpg",
        "tablet": "./assets/product-xx99-mark-one-headphones/tablet/image-product.jpg",
        "desktop": "./assets/product-xx99-mark-one-headphones/desktop/image-product.jpg"
      },
      "category": "headphones",
      "categoryImage": {
        "mobile": "./assets/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg",
        "tablet": "./assets/product-xx99-mark-one-headphones/tablet/image-category-page-preview.jpg",
        "desktop": "./assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg"
      },
      "new": false,
      "price": 1750,
      "description": "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go."
    },
    {
      "id": 4,
      "slug": "xx99-mark-two-headphones",
      "name": "XX99 Mark II Headphones",
      "image": {
        "mobile": "./assets/product-xx99-mark-two-headphones/mobile/image-product.jpg",
        "tablet": "./assets/product-xx99-mark-two-headphones/tablet/image-product.jpg",
        "desktop": "./assets/product-xx99-mark-two-headphones/desktop/image-product.jpg"
      },
      "category": "headphones",
      "categoryImage": {
        "mobile": "./assets/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg",
        "tablet": "./assets/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg",
        "desktop": "./assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg"
      },
      "new": true,
      "price": 2999,
      "description": "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound."
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getImageSrc = (product) => {
    if (isMobile) {
      return product.categoryImage.mobile;
    } else if (isTablet) {
      return product.categoryImage.tablet;
    } else {
      return product.categoryImage.desktop;
    }
  };

  const getStyles = () => {
    const baseStyles = {
      container: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc'
      },
      header: {
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      },
      headerContent: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '2rem 1rem' : isTablet ? '2rem 1.5rem' : '2rem 2rem'
      },
      headerText: {
        textAlign: 'center'
      },
      title: {
        fontSize: isMobile ? '2rem' : isDesktop ? '2.5rem' : '2.25rem',
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: '0.5rem',
        letterSpacing: '-0.025em'
      },
      subtitle: {
        color: '#64748b',
        fontSize: isMobile ? '1rem' : '1.125rem',
        marginBottom: '1rem'
      },
      stats: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        marginTop: '1rem'
      },
      stat: {
        textAlign: 'center'
      },
      statNumber: {
        fontSize: isMobile ? '1.5rem' : '2rem',
        fontWeight: 'bold',
        color: '#fb923c'
      },
      statLabel: {
        fontSize: '0.875rem',
        color: '#64748b',
        marginTop: '0.25rem'
      },
      productsSection: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '3rem 1rem' : isTablet ? '3rem 1.5rem' : '3rem 2rem'
      },
      productsGrid: {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: isMobile ? '1.5rem' : '2rem'
      },
      productCard: {
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      },
      productImage: {
        position: 'relative',
        aspectRatio: '1',
        backgroundColor: '#f8fafc',
        overflow: 'hidden'
      },
      productImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
      },
      badge: {
        position: 'absolute',
        top: '1rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '1rem',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        zIndex: 10
      },
      newBadge: {
        left: '1rem',
        backgroundColor: '#fb923c',
        color: '#ffffff'
      },
      priceBadge: {
        right: '1rem',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        color: '#ffffff',
        backdropFilter: 'blur(4px)'
      },
      productInfo: {
        padding: isMobile ? '1.25rem' : '1.5rem'
      },
      productName: {
        fontSize: isMobile ? '1.125rem' : '1.25rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '0.5rem',
        transition: 'color 0.2s ease'
      },
      productDescription: {
        color: '#64748b',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        marginBottom: '1rem',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      },
      priceRating: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      },
      price: {
        fontSize: isMobile ? '1.5rem' : '1.75rem',
        fontWeight: 'bold',
        color: '#0f172a'
      },
      rating: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      },
      ratingText: {
        fontSize: '0.875rem',
        color: '#64748b',
        marginLeft: '0.25rem'
      },
      actionButtons: {
        display: 'flex',
        gap: '0.75rem'
      },
      addToCartButton: {
        flex: 1,
        backgroundColor: '#fb923c',
        color: '#ffffff',
        fontWeight: '500',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem'
      },
      addedButton: {
        backgroundColor: '#16a34a',
        color: '#ffffff'
      },
      viewButton: {
        backgroundColor: '#f1f5f9',
        color: '#475569',
        fontWeight: '500',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      footer: {
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '3rem 0'
      },
      footerContent: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
        textAlign: 'center'
      },
      footerTitle: {
        fontSize: isMobile ? '1.5rem' : '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
      },
      footerText: {
        color: '#cbd5e1',
        marginBottom: '1.5rem'
      },
      footerButton: {
        backgroundColor: '#fb923c',
        color: '#ffffff',
        fontWeight: '500',
        padding: '0.75rem 2rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
      }
    };

    return baseStyles;
  };

  const styles = getStyles();

  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      e.currentTarget.style.transform = 'translateY(-2px)';
      const nameElement = e.currentTarget.querySelector('[data-product-name]');
      if (nameElement) {
        nameElement.style.color = '#fb923c';
      }
    } else {
      e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
      e.currentTarget.style.transform = 'translateY(0)';
      const nameElement = e.currentTarget.querySelector('[data-product-name]');
      if (nameElement) {
        nameElement.style.color = '#0f172a';
      }
    }
  };

  const handleButtonHover = (e, isEntering, type) => {
    if (isEntering) {
      if (type === 'cart') {
        e.target.style.backgroundColor = '#ea580c';
      } else {
        e.target.style.backgroundColor = '#e2e8f0';
      }
    } else {
      if (type === 'cart') {
        e.target.style.backgroundColor = '#fb923c';
      } else {
        e.target.style.backgroundColor = '#f1f5f9';
      }
    }
  };

  const handleAddToCart = (product) => {
    // Add visual feedback
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: true
    }));

    // Remove feedback after 2 seconds
    setTimeout(() => {
      setAddedProducts(prev => ({
        ...prev,
        [product.id]: false
      }));
    }, 2000);

    // Call parent callback if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Calculate stats
  const avgPrice = Math.round(headphones.reduce((sum, p) => sum + p.price, 0) / headphones.length);
  const newProducts = headphones.filter(p => p.new).length;

  return (
    <>
      <Navigation />
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerText}>
            <h1 style={styles.title}>
              Premium Headphones
            </h1>
            <p style={styles.subtitle}>
              Immerse yourself in studio-quality sound with our flagship headphone collection
            </p>
            
            {/* Stats */}
            <div style={styles.stats}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{headphones.length}</div>
                <div style={styles.statLabel}>Models</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{formatPrice(avgPrice)}</div>
                <div style={styles.statLabel}>Avg Price</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{newProducts}</div>
                <div style={styles.statLabel}>New Arrivals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={styles.productsSection}>
        <div style={styles.productsGrid}>
          {headphones.map((product) => (
            <div 
              key={product.id} 
              style={styles.productCard}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Product Image */}
              <div style={styles.productImage}>
                <img 
                  src={getImageSrc(product)} 
                  alt={product.name}
                  style={styles.productImg}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = `
                      width: 100%;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                      color: #94a3b8;
                      font-size: 3rem;
                    `;
                    fallback.textContent = '🎧';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
                
                {/* New Badge */}
                {product.new && (
                  <div style={{...styles.badge, ...styles.newBadge}}>
                    NEW
                  </div>
                )}

                {/* Price Badge */}
                <div style={{...styles.badge, ...styles.priceBadge}}>
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Product Info */}
              <div style={styles.productInfo}>
                <div>
                  <h3 
                    style={styles.productName}
                    data-product-name
                  >
                    {product.name}
                  </h3>
                  <p style={styles.productDescription}>
                    {product.description}
                  </p>
                </div>

                {/* Price and Rating */}
                <div style={styles.priceRating}>
                  <div style={styles.price}>
                    {formatPrice(product.price)}
                  </div>
                  <div style={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        style={{
                          color: i < 4 ? '#fbbf24' : '#cbd5e1',
                          fill: i < 4 ? '#fbbf24' : 'none'
                        }}
                      />
                    ))}
                    <span style={styles.ratingText}>(4.5)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                  <button 
                    style={{
                      ...styles.addToCartButton,
                      ...(addedProducts[product.id] ? styles.addedButton : {})
                    }}
                    onClick={() => handleAddToCart(product)}
                    onMouseEnter={(e) => {
                      if (!addedProducts[product.id]) {
                        handleButtonHover(e, true, 'cart');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!addedProducts[product.id]) {
                        handleButtonHover(e, false, 'cart');
                      }
                    }}
                  >
                    <ShoppingCart size={18} />
                    <span>{addedProducts[product.id] ? 'Added!' : 'Add to Cart'}</span>
                  </button>
                  <button 
                    style={styles.viewButton}
                    onMouseEnter={(e) => handleButtonHover(e, true, 'view')}
                    onMouseLeave={(e) => handleButtonHover(e, false, 'view')}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerContent}>
          <h3 style={styles.footerTitle}>Experience Audio Perfection</h3>
          <p style={styles.footerText}>From entry-level to professional-grade, find your perfect headphones</p>
          <button 
            style={styles.footerButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#fb923c'}
          >
            Compare All Models
          </button>
        </div>
      </div>
     
    </div>
     <Footer />
     </>
  );
};

export default Headphones;