import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
import "../Styles/Navigation.css";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/Headphones", label: "HEADPHONES" },
    { href: "/Speakers", label: "SPEAKERS" },
    { href: "/Earphones", label: "EARPHONES" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Helper function to get responsive class names
  const getResponsiveClass = (baseClass) => {
    let className = baseClass;
    if (isTablet) className += " tablet";
    if (isDesktop) className += " desktop";
    return className;
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <>
      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${
          isMobileMenuOpen && isMobile ? "visible" : ""
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <nav className="navigation">
        <div className={getResponsiveClass("nav-container")}>
          <div className={getResponsiveClass("nav-content")}>
            {/* Mobile menu button */}
            <div
              className={`mobile-menu-button ${isMobile ? "" : "hidden"}`}
            >
              <button
                onClick={toggleMobileMenu}
                className="menu-toggle"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className={getResponsiveClass("logo-container")}>
              <a href="/" className={getResponsiveClass("logo")}>
                audiophile
              </a>
            </div>

            {/* Desktop navigation */}
            <div className={`desktop-nav ${isMobile ? "" : "visible"}`}>
              <div className={getResponsiveClass("nav-links")}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={getResponsiveClass("nav-link")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Shopping cart */}
            <div className="cart-container">
              <button
                className="cart-button"
                aria-label="Shopping cart"
                onClick={() => window.location.href = '/Cart'}
              >
                <ShoppingCart size={isMobile ? 20 : isDesktop ? 24 : 22} />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`mobile-menu ${
              isMobileMenuOpen && isMobile ? "visible" : ""
            }`}
          >
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;