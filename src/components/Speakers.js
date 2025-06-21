import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, ArrowRight, Volume2 } from "lucide-react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Speakers = ({ onAddToCart }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [addedProducts, setAddedProducts] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Filter products to only include speakers
  const speakers = [
    {
      id: 5,
      slug: "zx7-speaker",
      name: "ZX7 Speaker",
      image: {
        mobile: "./assets/product-zx7-speaker/mobile/image-product.jpg",
        tablet: "./assets/product-zx7-speaker/tablet/image-product.jpg",
        desktop: "./assets/product-zx7-speaker/desktop/image-product.jpg",
      },
      category: "speakers",
      categoryImage: {
        mobile:
          "./assets/product-zx7-speaker/mobile/image-category-page-preview.jpg",
        tablet:
          "./assets/product-zx7-speaker/tablet/image-category-page-preview.jpg",
        desktop:
          "./assets/product-zx7-speaker/desktop/image-category-page-preview.jpg",
      },
      new: false,
      price: 3500,
      description:
        "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    },
    {
      id: 6,
      slug: "zx9-speaker",
      name: "ZX9 Speaker",
      image: {
        mobile: "./assets/product-zx9-speaker/mobile/image-product.jpg",
        tablet: "./assets/product-zx9-speaker/tablet/image-product.jpg",
        desktop: "./assets/product-zx9-speaker/desktop/image-product.jpg",
      },
      category: "speakers",
      categoryImage: {
        mobile:
          "./assets/product-zx9-speaker/mobile/image-category-page-preview.jpg",
        tablet:
          "./assets/product-zx9-speaker/tablet/image-category-page-preview.jpg",
        desktop:
          "./assets/product-zx9-speaker/desktop/image-category-page-preview.jpg",
      },
      new: true,
      price: 4500,
      description:
        "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getResponsiveImage = (product) => {
    if (isMobile) {
      return product.categoryImage.mobile;
    } else if (isTablet) {
      return product.categoryImage.tablet;
    } else {
      return product.categoryImage.desktop;
    }
  };

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const getStyles = () => {
    const baseStyles = {
      container: {
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      },
      header: {
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      },
      headerContent: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: isMobile
          ? "3rem 1rem"
          : isTablet
          ? "3rem 1.5rem"
          : "3rem 2rem",
      },
      headerText: {
        textAlign: "center",
      },
      title: {
        fontSize: isMobile ? "2.5rem" : isDesktop ? "3rem" : "2.75rem",
        fontWeight: "bold",
        color: "#0f172a",
        marginBottom: "0.5rem",
        letterSpacing: "-0.025em",
      },
      subtitle: {
        color: "#64748b",
        fontSize: isMobile ? "1.125rem" : "1.25rem",
        marginBottom: "1.5rem",
        maxWidth: "600px",
        margin: "0 auto",
      },
      stats: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "1.5rem" : "3rem",
        marginTop: "2rem",
      },
      stat: {
        textAlign: "center",
      },
      statNumber: {
        fontSize: isMobile ? "1.875rem" : "2.5rem",
        fontWeight: "bold",
        color: "#fb923c",
      },
      statLabel: {
        fontSize: "0.875rem",
        color: "#64748b",
        marginTop: "0.25rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
      featuresBar: {
        backgroundColor: "#f1f5f9",
        padding: isMobile ? "1rem 0" : "1.5rem 0",
        marginTop: "2rem",
        borderRadius: "1rem",
      },
      featuresContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: isMobile ? "1.5rem" : "3rem",
        flexWrap: "wrap",
      },
      feature: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "#475569",
        fontSize: "0.875rem",
        fontWeight: "500",
      },
      featureIcon: {
        color: "#fb923c",
      },
      productsSection: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: isMobile
          ? "3rem 1rem"
          : isTablet
          ? "3rem 1.5rem"
          : "3rem 2rem",
      },
      productsGrid: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: isMobile ? "2rem" : "3rem",
        maxWidth: "900px",
        margin: "0 auto",
      },
      productCard: {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
      },
      productImage: {
        position: "relative",
        aspectRatio: "4/3",
        backgroundColor: "#f8fafc",
        overflow: "hidden",
      },
      productImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.3s ease",
      },
      productImageFallback: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
        color: "#94a3b8",
      },
      productImageContent: {
        textAlign: "center",
        color: "#94a3b8",
      },
      productImageIcon: {
        width: "8rem",
        height: "8rem",
        margin: "0 auto 1rem",
        backgroundColor: "#cbd5e1",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
      },
      productImageText: {
        fontSize: "1rem",
        fontWeight: "600",
      },
      badge: {
        position: "absolute",
        top: "1.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "1.5rem",
        fontSize: "0.75rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        zIndex: 10,
      },
      newBadge: {
        left: "1.5rem",
        backgroundColor: "#fb923c",
        color: "#ffffff",
      },
      priceBadge: {
        right: "1.5rem",
        backgroundColor: "#0f172a",
        color: "#ffffff",
      },
      productInfo: {
        padding: isMobile ? "1.5rem" : "2rem",
      },
      productName: {
        fontSize: isMobile ? "1.25rem" : "1.5rem",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "0.75rem",
        transition: "color 0.2s ease",
      },
      productDescription: {
        color: "#64748b",
        fontSize: "0.875rem",
        lineHeight: "1.6",
        marginBottom: "1.5rem",
      },
      priceRating: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
      },
      price: {
        fontSize: isMobile ? "1.75rem" : "2rem",
        fontWeight: "bold",
        color: "#0f172a",
      },
      rating: {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
      },
      ratingText: {
        fontSize: "0.875rem",
        color: "#64748b",
        marginLeft: "0.25rem",
      },
      actionButtons: {
        display: "flex",
        gap: "1rem",
      },
      addToCartButton: {
        flex: 1,
        backgroundColor: "#fb923c",
        color: "#ffffff",
        fontWeight: "600",
        padding: "1rem 1.5rem",
        borderRadius: "0.75rem",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        fontSize: "0.875rem",
      },
      addedButton: {
        backgroundColor: "#16a34a",
        color: "#ffffff",
      },
      viewButton: {
        backgroundColor: "#f1f5f9",
        color: "#475569",
        fontWeight: "600",
        padding: "1rem",
        borderRadius: "0.75rem",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      footer: {
        backgroundColor: "#0f172a",
        color: "#ffffff",
        padding: "4rem 0",
      },
      footerContent: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: isMobile ? "0 1rem" : isTablet ? "0 1.5rem" : "0 2rem",
        textAlign: "center",
      },
      footerTitle: {
        fontSize: isMobile ? "1.75rem" : "2.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
      },
      footerText: {
        color: "#cbd5e1",
        marginBottom: "2rem",
        fontSize: "1.125rem",
      },
      footerButton: {
        backgroundColor: "#fb923c",
        color: "#ffffff",
        fontWeight: "600",
        padding: "1rem 2.5rem",
        borderRadius: "0.75rem",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        fontSize: "1rem",
      },
    };

    return baseStyles;
  };

  const styles = getStyles();

  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
      e.currentTarget.style.transform = "translateY(-4px)";
      const nameElement = e.currentTarget.querySelector("[data-product-name]");
      const imgElement = e.currentTarget.querySelector("[data-product-img]");
      if (nameElement) {
        nameElement.style.color = "#fb923c";
      }
      if (imgElement) {
        imgElement.style.transform = "scale(1.05)";
      }
    } else {
      e.currentTarget.style.boxShadow =
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
      e.currentTarget.style.transform = "translateY(0)";
      const nameElement = e.currentTarget.querySelector("[data-product-name]");
      const imgElement = e.currentTarget.querySelector("[data-product-img]");
      if (nameElement) {
        nameElement.style.color = "#0f172a";
      }
      if (imgElement) {
        imgElement.style.transform = "scale(1)";
      }
    }
  };

  const handleButtonHover = (e, isEntering, type) => {
    if (isEntering) {
      if (type === "cart") {
        e.target.style.backgroundColor = "#ea580c";
        e.target.style.transform = "scale(1.02)";
      } else {
        e.target.style.backgroundColor = "#e2e8f0";
      }
    } else {
      if (type === "cart") {
        e.target.style.backgroundColor = "#fb923c";
        e.target.style.transform = "scale(1)";
      } else {
        e.target.style.backgroundColor = "#f1f5f9";
      }
    }
  };

  const handleAddToCart = (product) => {
    // Add visual feedback
    setAddedProducts((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    // Remove feedback after 2 seconds
    setTimeout(() => {
      setAddedProducts((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }, 2000);

    // Call parent callback if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Calculate stats
  const avgPrice = Math.round(
    speakers.reduce((sum, p) => sum + p.price, 0) / speakers.length
  );
  const newProducts = speakers.filter((p) => p.new).length;

  return (
    <>
      <Navigation />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerText}>
              <h1 style={styles.title}>Premium Speakers</h1>
              <p style={styles.subtitle}>
                Transform your space with powerful, wireless speakers that
                deliver exceptional audio quality for home and studio use
              </p>

              {/* Stats */}
              <div style={styles.stats}>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>{speakers.length}</div>
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

              {/* Features Bar */}
              <div style={styles.featuresBar}>
                <div style={styles.featuresContent}>
                  <div style={styles.feature}>
                    <Volume2 size={16} style={styles.featureIcon} />
                    <span>Wireless Connectivity</span>
                  </div>
                  <div style={styles.feature}>
                    <Volume2 size={16} style={styles.featureIcon} />
                    <span>High-Fidelity Sound</span>
                  </div>
                  <div style={styles.feature}>
                    <Volume2 size={16} style={styles.featureIcon} />
                    <span>Audiophile Components</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div style={styles.productsSection}>
          <div style={styles.productsGrid}>
            {speakers.map((product) => (
              <div
                key={product.id}
                style={styles.productCard}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                {/* Product Image */}
                <div style={styles.productImage}>
                  {!imageErrors[product.id] ? (
                    <img
                      src={getResponsiveImage(product)}
                      alt={product.name}
                      style={styles.productImg}
                      data-product-img
                      onError={() => handleImageError(product.id)}
                    />
                  ) : (
                    <div style={styles.productImageFallback}>
                      <div style={styles.productImageContent}>
                        <div style={styles.productImageIcon}>
                          <span>🔊</span>
                        </div>
                        <p style={styles.productImageText}>{product.name}</p>
                      </div>
                    </div>
                  )}

                  {/* New Badge */}
                  {product.new && (
                    <div style={{ ...styles.badge, ...styles.newBadge }}>
                      NEW
                    </div>
                  )}

                  {/* Price Badge */}
                  <div style={{ ...styles.badge, ...styles.priceBadge }}>
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Product Info */}
                <div style={styles.productInfo}>
                  <div>
                    <h3 style={styles.productName} data-product-name>
                      {product.name}
                    </h3>
                    <p style={styles.productDescription}>
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Rating */}
                  <div style={styles.priceRating}>
                    <div style={styles.price}>{formatPrice(product.price)}</div>
                    <div style={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          style={{
                            color: i < 5 ? "#fbbf24" : "#cbd5e1",
                            fill: i < 5 ? "#fbbf24" : "none",
                          }}
                        />
                      ))}
                      <span style={styles.ratingText}>(5.0)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={styles.actionButtons}>
                    <button
                      style={{
                        ...styles.addToCartButton,
                        ...(addedProducts[product.id]
                          ? styles.addedButton
                          : {}),
                      }}
                      onClick={() => handleAddToCart(product)}
                      onMouseEnter={(e) => {
                        if (!addedProducts[product.id]) {
                          handleButtonHover(e, true, "cart");
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!addedProducts[product.id]) {
                          handleButtonHover(e, false, "cart");
                        }
                      }}
                    >
                      <ShoppingCart size={20} />
                      <span>
                        {addedProducts[product.id] ? "Added!" : "Add to Cart"}
                      </span>
                    </button>
                    <button
                      style={styles.viewButton}
                      onMouseEnter={(e) => handleButtonHover(e, true, "view")}
                      onMouseLeave={(e) => handleButtonHover(e, false, "view")}
                    >
                      <ArrowRight size={20} />
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
            <h3 style={styles.footerTitle}>Fill Your Space with Sound</h3>
            <p style={styles.footerText}>
              Professional-grade speakers for the ultimate audio experience
            </p>
            <button
              style={styles.footerButton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fb923c")}
            >
              Explore Audio Setup
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Speakers;
