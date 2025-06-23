import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import Footer from "./Footer";
import { getEarphonesStyles } from "./EarphonesStyles";

const Earphones = ({ onAddToCart }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [addedProducts, setAddedProducts] = useState({});

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

  const products = [
    {
      id: 1,
      slug: "yx1-earphones",
      name: "YX1 Wireless Earphones",
      image: {
        mobile: "/assets/product-yx1-earphones/mobile/image-product.jpg",
        tablet: "/assets/product-yx1-earphones/tablet/image-product.jpg",
        desktop: "/assets/product-yx1-earphones/desktop/image-product.jpg",
      },
      category: "earphones",
      categoryImage: {
        mobile:
          "/assets/product-yx1-earphones/mobile/image-category-page-preview.jpg",
        tablet:
          "/assets/product-yx1-earphones/tablet/image-category-page-preview.jpg",
        desktop:
          "/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg",
      },
      new: true,
      price: 599,
      description:
        "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    },
  ];

  // Filter only earphones
  const earphones = products.filter(
    (product) => product.category === "earphones"
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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

  const styles = getEarphonesStyles(isMobile, isTablet, isDesktop);

  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.boxShadow =
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
      e.currentTarget.style.transform = "translateY(-2px)";
      const nameElement = e.currentTarget.querySelector("[data-product-name]");
      if (nameElement) {
        nameElement.style.color = "#fb923c";
      }
    } else {
      e.currentTarget.style.boxShadow =
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
      e.currentTarget.style.transform = "translateY(0)";
      const nameElement = e.currentTarget.querySelector("[data-product-name]");
      if (nameElement) {
        nameElement.style.color = "#0f172a";
      }
    }
  };

  const handleButtonHover = (e, isEntering, type) => {
    if (isEntering) {
      if (type === "cart") {
        e.target.style.backgroundColor = "#ea580c";
      } else {
        e.target.style.backgroundColor = "#e2e8f0";
      }
    } else {
      if (type === "cart") {
        e.target.style.backgroundColor = "#fb923c";
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

  return (
    <>

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerText}>
              <h1 style={styles.title}>Premium Earphones</h1>
              <p style={styles.subtitle}>
                Experience wireless freedom with crystal-clear sound
              </p>
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
                      e.target.style.display = "none";
                      e.target.parentNode.style.background =
                        "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
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
                    <div style={{ ...styles.badge, ...styles.newBadge }}>
                      NEW
                    </div>
                  )}

                  {/* Category Badge */}
                  <div style={{ ...styles.badge, ...styles.categoryBadgeCard }}>
                    {product.category}
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
                          size={16}
                          style={{
                            color: i < 4 ? "#fbbf24" : "#cbd5e1",
                            fill: i < 4 ? "#fbbf24" : "none",
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
                      <ShoppingCart size={18} />
                      <span>
                        {addedProducts[product.id] ? "Added!" : "Add to Cart"}
                      </span>
                    </button>
                    <button
                      style={styles.viewButton}
                      onMouseEnter={(e) => handleButtonHover(e, true, "view")}
                      onMouseLeave={(e) => handleButtonHover(e, false, "view")}
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
              <p style={styles.emptyStateText}>
                Check back soon for new arrivals
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Earphones;