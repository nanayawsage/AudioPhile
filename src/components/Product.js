import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";

// Separated styles module
const useProductStyles = (isMobile, isTablet, isDesktop) => {
  return {
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
        ? "2rem 1rem"
        : isTablet
        ? "2rem 1.5rem"
        : "2rem 2rem",
    },
    headerText: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: isMobile ? "2rem" : isDesktop ? "2.5rem" : "2.25rem",
      fontWeight: "bold",
      color: "#0f172a",
      marginBottom: "0.5rem",
      letterSpacing: "-0.025em",
    },
    subtitle: {
      color: "#64748b",
      fontSize: isMobile ? "1rem" : "1.125rem",
    },
    categoryFilter: {
      display: "flex",
      justifyContent: "center",
    },
    categoryContainer: {
      display: "flex",
      backgroundColor: "#f1f5f9",
      borderRadius: "2rem",
      padding: "0.25rem",
      gap: "0.25rem",
      flexWrap: isMobile ? "wrap" : "nowrap",
    },
    categoryButton: {
      padding: isMobile ? "0.5rem 1rem" : "0.75rem 1.5rem",
      borderRadius: "1.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textTransform: "capitalize",
      whiteSpace: "nowrap",
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
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)",
      gap: isMobile ? "1.5rem" : "2rem",
    },
    productCard: {
      backgroundColor: "#ffffff",
      borderRadius: "1rem",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    productImage: {
      position: "relative",
      aspectRatio: "1",
      backgroundColor: "#f8fafc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      overflow: "hidden",
    },
    productImageContent: {
      textAlign: "center",
      color: "#94a3b8",
    },
    productImageIcon: {
      width: "6rem",
      height: "6rem",
      margin: "0 auto 0.75rem",
      backgroundColor: "#cbd5e1",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
    },
    productImageText: {
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    badge: {
      position: "absolute",
      top: "1rem",
      padding: "0.25rem 0.75rem",
      borderRadius: "1rem",
      fontSize: "0.75rem",
      fontWeight: "bold",
      zIndex: 1,
    },
    newBadge: {
      left: "1rem",
      backgroundColor: "#fb923c",
      color: "#ffffff",
    },
    categoryBadge: {
      right: "1rem",
      backgroundColor: "#0f172a",
      color: "#ffffff",
      textTransform: "capitalize",
    },
    productInfo: {
      padding: isMobile ? "1.25rem" : "1.5rem",
    },
    productName: {
      fontSize: isMobile ? "1.125rem" : "1.25rem",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "0.5rem",
      transition: "color 0.2s ease",
    },
    productDescription: {
      color: "#64748b",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      marginBottom: "1rem",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    priceRating: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem",
    },
    price: {
      fontSize: isMobile ? "1.5rem" : "1.75rem",
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
      gap: "0.75rem",
    },
    addToCartButton: {
      flex: 1,
      backgroundColor: "#fb923c",
      color: "#ffffff",
      fontWeight: "500",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      position: "relative",
    },
    addedButton: {
      backgroundColor: "#16a34a",
      color: "#ffffff",
    },
    viewButton: {
      backgroundColor: "#f1f5f9",
      color: "#475569",
      fontWeight: "500",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 0",
    },
    emptyStateIcon: {
      width: "6rem",
      height: "6rem",
      margin: "0 auto 1rem",
      backgroundColor: "#e2e8f0",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      color: "#94a3b8",
    },
    emptyStateTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "0.5rem",
    },
    emptyStateText: {
      color: "#64748b",
    },
    footer: {
      backgroundColor: "#0f172a",
      color: "#ffffff",
      padding: "3rem 0",
    },
    footerContent: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile ? "0 1rem" : isTablet ? "0 1.5rem" : "0 2rem",
      textAlign: "center",
    },
    footerTitle: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    footerText: {
      color: "#cbd5e1",
      marginBottom: "1.5rem",
    },
    footerButton: {
      backgroundColor: "#fb923c",
      color: "#ffffff",
      fontWeight: "500",
      padding: "0.75rem 2rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
  };
};

// Separated interaction handlers
const useProductInteractions = () => {
  const handleCategoryButtonHover = (e, isEntering, isActive) => {
    if (isEntering) {
      if (isActive) {
        e.target.style.backgroundColor = "#ea580c";
      } else {
        e.target.style.backgroundColor = "#ffffff";
        e.target.style.color = "#0f172a";
      }
    } else {
      if (isActive) {
        e.target.style.backgroundColor = "#fb923c";
        e.target.style.color = "#ffffff";
      } else {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "#64748b";
      }
    }
  };

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

  return {
    handleCategoryButtonHover,
    handleCardHover,
    handleButtonHover,
  };
};

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [addedProducts, setAddedProducts] = useState({});

  const { addToCart } = useCart();

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

  const styles = useProductStyles(isMobile, isTablet, isDesktop);
  const { handleCategoryButtonHover, handleCardHover, handleButtonHover } = useProductInteractions();

  const products = [
    {
      id: 1,
      slug: "yx1-earphones",
      name: "YX1 Wireless Earphones",
      image: {
        mobile: "./assets/home/mobile/image-earphones-yx1.jpg",
        tablet: "./assets/home/tablet/image-earphones-yx1.jpg",
        desktop: "./assets/home/desktop/image-earphones-yx1.jpg",
      },
      category: "earphones",
      categoryImage: {
        mobile:
          "./assets/product-yx1-earphones/mobile/image-category-page-preview.jpg",
        tablet:
          "./assets/product-yx1-earphones/tablet/image-category-page-preview.jpg",
        desktop:
          "./assets/product-yx1-earphones/desktop/image-category-page-preview.jpg",
      },
      new: true,
      price: 599,
      description:
        "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    },
    {
      id: 2,
      slug: "xx59-headphones",
      name: "XX59 Headphones",
      image: {
        mobile: "./assets/product-xx59-headphones/mobile/image-product.jpg",
        tablet: "./assets/product-xx59-headphones/tablet/image-product.jpg",
        desktop: "./assets/product-xx59-headphones/desktop/image-product.jpg",
      },
      category: "headphones",
      categoryImage: {
        mobile:
          "./assets/product-xx59-headphones/mobile/image-category-page-preview.jpg",
        tablet:
          "./assets/product-xx59-headphones/tablet/image-category-page-preview.jpg",
        desktop:
          "./assets/product-xx59-headphones/desktop/image-category-page-preview.jpg",
      },
      new: false,
      price: 899,
      description:
        "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    },
    {
      id: 3,
      slug: "xx99-mark-one-headphones",
      name: "XX99 Mark I Headphones",
      image: {
        mobile:
          "./assets/product-xx99-mark-one-headphones/mobile/image-product.jpg",
        tablet:
          "./assets/product-xx99-mark-one-headphones/tablet/image-product.jpg",
        desktop:
          "./assets/product-xx99-mark-one-headphones/desktop/image-product.jpg",
      },
      category: "headphones",
      categoryImage: {
        mobile:
          "./assets/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg",
        tablet:
          "./assets/product-xx99-mark-one-headphones/tablet/image-category-page-preview.jpg",
        desktop:
          "./assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg",
      },
      new: false,
      price: 1750,
      description:
        "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    },
    {
      id: 4,
      slug: "xx99-mark-two-headphones",
      name: "XX99 Mark II Headphones",
      image: {
        mobile:
          "./assets/product-xx99-mark-two-headphones/mobile/image-product.jpg",
        tablet:
          "./assets/product-xx99-mark-two-headphones/tablet/image-product.jpg",
        desktop:
          "./assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
      },
      category: "headphones",
      categoryImage: {
        mobile:
          "./assets/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg",
        tablet:
          "./assets/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg",
        desktop:
          "./assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg",
      },
      new: true,
      price: 2999,
      description:
        "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    },
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

  const categories = ["all", "headphones", "earphones", "speakers"];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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

    // Add to cart using context
    addToCart(product);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerText}>
            <h1 style={styles.title}>Premium Audio Collection</h1>
            <p style={styles.subtitle}>Experience sound like never before</p>
          </div>

          {/* Category Filter */}
          <div style={styles.categoryFilter}>
            <div style={styles.categoryContainer}>
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      ...styles.categoryButton,
                      backgroundColor: isActive ? "#fb923c" : "transparent",
                      color: isActive ? "#ffffff" : "#64748b",
                    }}
                    onMouseEnter={(e) =>
                      handleCategoryButtonHover(e, true, isActive)
                    }
                    onMouseLeave={(e) =>
                      handleCategoryButtonHover(e, false, isActive)
                    }
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={styles.productsSection}>
        <div style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={styles.productCard}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Product Image */}
              <div style={styles.productImage}>
                <img
                  src={
                    isMobile
                      ? product.categoryImage.mobile
                      : isTablet
                      ? product.categoryImage.tablet
                      : product.categoryImage.desktop
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* New Badge */}
                {product.new && (
                  <div style={{ ...styles.badge, ...styles.newBadge }}>NEW</div>
                )}

                {/* Category Badge */}
                <div style={{ ...styles.badge, ...styles.categoryBadge }}>
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div style={styles.productInfo}>
                <div>
                  <h3 style={styles.productName} data-product-name>
                    {product.name}
                  </h3>
                  <p style={styles.productDescription}>{product.description}</p>
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
                    <span style={styles.ratingText}>(4.2)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                  <button
                    style={{
                      ...styles.addToCartButton,
                      ...(addedProducts[product.id] ? styles.addedButton : {}),
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
        {filteredProducts.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>
              <span>🔍</span>
            </div>
            <h3 style={styles.emptyStateTitle}>No products found</h3>
            <p style={styles.emptyStateText}>
              Try selecting a different category
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerContent}>
          <h3 style={styles.footerTitle}>
            Ready to upgrade your audio experience?
          </h3>
          <p style={styles.footerText}>
            Discover our full range of premium audio equipment
          </p>
          <button
            style={styles.footerButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#fb923c")}
          >
            Explore More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;