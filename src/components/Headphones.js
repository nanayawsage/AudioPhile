import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import '../Styles/Headphones.css';

const Headphones = ({ onAddToCart }) => {
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

  // Filter products to only include headphones
  const headphones = [
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
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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

  const handleImageError = (e) => {
    // Fallback if image fails to load
    e.target.style.display = "none";
    const fallback = document.createElement("div");
    fallback.className = "headphones-image-fallback";
    fallback.textContent = "🎧";
    e.target.parentNode.appendChild(fallback);
  };

  // Calculate stats
  const avgPrice = Math.round(
    headphones.reduce((sum, p) => sum + p.price, 0) / headphones.length
  );
  const newProducts = headphones.filter((p) => p.new).length;

  return (
    <>
      <div className="headphones-container">
        {/* Header */}
        <div className="headphones-header">
          <div className="headphones-header-content">
            <div className="headphones-header-text">
              <h1 className="headphones-title">Premium Headphones</h1>
              <p className="headphones-subtitle">
                Immerse yourself in studio-quality sound with our flagship
                headphone collection
              </p>

              {/* Stats */}
              <div className="headphones-stats">
                <div className="headphones-stat">
                  <div className="headphones-stat-number">{headphones.length}</div>
                  <div className="headphones-stat-label">Models</div>
                </div>
                <div className="headphones-stat">
                  <div className="headphones-stat-number">{formatPrice(avgPrice)}</div>
                  <div className="headphones-stat-label">Avg Price</div>
                </div>
                <div className="headphones-stat">
                  <div className="headphones-stat-number">{newProducts}</div>
                  <div className="headphones-stat-label">New Arrivals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="headphones-products-section">
          <div className="headphones-products-grid">
            {headphones.map((product) => (
              <div key={product.id} className="headphones-product-card">
                {/* Product Image */}
                <div className="headphones-product-image">
                  <img
                    src={getImageSrc(product)}
                    alt={product.name}
                    className="headphones-product-img"
                    onError={handleImageError}
                  />

                  {/* New Badge */}
                  {product.new && (
                    <div className="headphones-badge headphones-new-badge">
                      NEW
                    </div>
                  )}

                  {/* Price Badge */}
                  <div className="headphones-badge headphones-price-badge">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Product Info */}
                <div className="headphones-product-info">
                  <div>
                    <h3 className="headphones-product-name">
                      {product.name}
                    </h3>
                    <p className="headphones-product-description">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Rating */}
                  <div className="headphones-price-rating">
                    <div className="headphones-price">{formatPrice(product.price)}</div>
                    <div className="headphones-rating">
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
                      <span className="headphones-rating-text">(4.5)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="headphones-action-buttons">
                    <button
                      className={`headphones-add-to-cart-button ${
                        addedProducts[product.id] ? "headphones-added-button" : ""
                      }`}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={18} />
                      <span>
                        {addedProducts[product.id] ? "Added!" : "Add to Cart"}
                      </span>
                    </button>
                    <button className="headphones-view-button">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="headphones-footer">
          <div className="headphones-footer-content">
            <h3 className="headphones-footer-title">Experience Audio Perfection</h3>
            <p className="headphones-footer-text">
              From entry-level to professional-grade, find your perfect
              headphones
            </p>
            <button className="headphones-footer-button">
              Compare All Models
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headphones;