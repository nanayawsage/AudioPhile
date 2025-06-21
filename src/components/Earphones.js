import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';




const Earphones = ({ onAddToCart }) => {
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
  
  const products = [
    {
      "id": 1,
      "slug": "yx1-earphones",
      "name": "YX1 Wireless Earphones",
      "image": {
        "mobile": "/assets/product-yx1-earphones/mobile/image-product.jpg",
        "tablet": "/assets/product-yx1-earphones/tablet/image-product.jpg",
        "desktop": "/assets/product-yx1-earphones/desktop/image-product.jpg"
      },
      "category": "earphones",
      "categoryImage": {
        "mobile": "/assets/product-yx1-earphones/mobile/image-category-page-preview.jpg",
        "tablet": "/assets/product-yx1-earphones/tablet/image-category-page-preview.jpg",
        "desktop": "/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg"
      },
      "new": true,
      "price": 599,
      "description": "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature."
    }
  ];

  // Filter only earphones
  const earphones = products.filter(product => product.category === 'earphones');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get the appropriate image based on screen size
  const getProductImage = (product) => {
    if (isMobile) return product.categoryImage.mobile;
    if (isTablet) return product.categoryImage.tablet;
    return product.categoryImage.desktop;
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
      categoryBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#fb923c',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        borderRadius: '2rem',
        fontSize: '0.875rem',
        fontWeight: '500'
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
        backgroundColor: '#16a34a',
        color: '#ffffff'
      },
      categoryBadgeCard: {
        right: '1rem',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        textTransform: 'capitalize'
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
      emptyState: {
        textAlign: 'center',
        padding: '4rem 0'
      },
      emptyStateIcon: {
        width: '6rem',
        height: '6rem',
        margin: '0 auto 1rem',
        backgroundColor: '#e2e8f0',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        color: '#94a3b8'
      },
      emptyStateTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '0.5rem'
      },
      emptyStateText: {
        color: '#64748b'
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

  return (
    <>
      <Navigation />
  
    <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerText}>
              <h1 style={styles.title}>
                Premium Earphones
              </h1>
              <p style={styles.subtitle}>Experience wireless freedom with crystal-clear sound</p>
              <div style={styles.categoryBadge}>
                <span>🎧</span>
                <span>Earphones Collection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div style={styles.productsSection}>
          <div style={styles.productsGrid}>
            {earphones.map((product) => (
              <div 
                key={product.id} 
                style={styles.productCard}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                {/* Product Image */}
                <div style={styles.productImage}>
                  <img 
                    src={getProductImage(product)}
                    alt={product.name}
                    style={styles.productImg}
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                      e.target.parentNode.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #94a3b8;">
                          <div style="width: 6rem; height: 6rem; background-color: #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 0.75rem;">
                            🎧
                          </div>
                          <p style="font-size: 0.875rem; font-weight: 500;">${product.name}</p>
                        </div>
                      `;
                    }}
                  />
                  
                  {/* New Badge */}
                  {product.new && (
                    <div style={{...styles.badge, ...styles.newBadge}}>
                      NEW
                    </div>
                  )}

                  {/* Category Badge */}
                  <div style={{...styles.badge, ...styles.categoryBadgeCard}}>
                    {product.category}
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

          {/* Empty State */}
          {earphones.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>
                <span>🎧</span>
              </div>
              <h3 style={styles.emptyStateTitle}>No earphones available</h3>
              <p style={styles.emptyStateText}>Check back soon for new arrivals</p>
            </div>
          )}
        </div>

        

        <Footer />
      </div>
        </>
  );
};

export default Earphones;