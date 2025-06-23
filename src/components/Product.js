import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";
import "../Styles/Product.css";

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

  const getResponsiveClass = (baseClass) => {
    let className = baseClass;
    if (isMobile) className += " mobile";
    else if (isTablet) className += " tablet";
    else className += " desktop";
    return className;
  };

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
    <div className="product-container">
      {/* Header */}
      <div className="product-header">
        <div className={getResponsiveClass("product-header-content")}>
          <div className="product-header-text">
            <h1 className={getResponsiveClass("product-title")}>Premium Audio Collection</h1>
            <p className={getResponsiveClass("product-subtitle")}>Experience sound like never before</p>
          </div>

          {/* Category Filter */}
          <div className="product-category-filter">
            <div className={getResponsiveClass("product-category-container")}>
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${getResponsiveClass("product-category-button")} ${
                      isActive ? "active" : ""
                    }`}
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
      <div className={getResponsiveClass("product-products-section")}>
        <div className={getResponsiveClass("product-products-grid")}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-product-card"
            >
              {/* Product Image */}
              <div className="product-product-image">
                <img
                  src={
                    isMobile
                      ? product.categoryImage.mobile
                      : isTablet
                      ? product.categoryImage.tablet
                      : product.categoryImage.desktop
                  }
                  alt={product.name}
                  className="product-product-img"
                />

                {/* New Badge */}
                {product.new && (
                  <div className="product-badge product-new-badge">NEW</div>
                )}

                {/* Category Badge */}
                <div className="product-badge product-category-badge">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className={getResponsiveClass("product-product-info")}>
                <div>
                  <h3 className={getResponsiveClass("product-product-name")} data-product-name>
                    {product.name}
                  </h3>
                  <p className="product-product-description">{product.description}</p>
                </div>

                {/* Price and Rating */}
                <div className="product-price-rating">
                  <div className={getResponsiveClass("product-price")}>{formatPrice(product.price)}</div>
                  <div className="product-rating">
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
                    <span className="product-rating-text">(4.2)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="product-action-buttons">
                  <button
                    className={`product-add-to-cart-button ${
                      addedProducts[product.id] ? "added" : ""
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={18} />
                    <span>
                      {addedProducts[product.id] ? "Added!" : "Add to Cart"}
                    </span>
                  </button>
                  <button className="product-view-button">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="product-empty-state">
            <div className="product-empty-state-icon">
              <span>🔍</span>
            </div>
            <h3 className="product-empty-state-title">No products found</h3>
            <p className="product-empty-state-text">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="product-footer">
        <div className={getResponsiveClass("product-footer-content")}>
          <h3 className={getResponsiveClass("product-footer-title")}>
            Ready to upgrade your audio experience?
          </h3>
          <p className="product-footer-text">
            Discover our full range of premium audio equipment
          </p>
          <button className="product-footer-button">
            Explore More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;