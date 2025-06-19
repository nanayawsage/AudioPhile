import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/headphones', label: 'HEADPHONES' },
    { href: '/speakers', label: 'SPEAKERS' },
    { href: '/earphones', label: 'EARPHONES' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const getStyles = () => {
    const baseStyles = {
      navigation: {
        backgroundColor: '#000000',
        color: 'white',
        position: 'relative',
        zIndex: 1000
      },
      navContainer: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
      },
      navContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: isMobile ? '4rem' : isDesktop ? '5rem' : '4.5rem'
      },
      mobileMenuButton: {
        display: isMobile ? 'flex' : 'none',
        alignItems: 'center'
      },
      menuToggle: {
        color: 'white',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s ease, background-color 0.2s ease'
      },
      logoContainer: {
        flexShrink: 0,
        position: isMobile ? 'absolute' : 'static',
        left: isMobile ? '50%' : 'auto',
        transform: isMobile ? 'translateX(-50%)' : 'none'
      },
      logo: {
        color: 'white',
        fontSize: isMobile ? '1.25rem' : isDesktop ? '1.5rem' : '1.375rem',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        transition: 'font-size 0.2s ease'
      },
      desktopNav: {
        display: isMobile ? 'none' : 'block'
      },
      navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: isDesktop ? '3rem' : '2rem',
        margin: 0
      },
      navLink: {
        color: 'white',
        textDecoration: 'none',
        padding: '0.75rem 1rem',
        fontSize: isMobile ? '0.875rem' : isDesktop ? '1rem' : '0.9375rem',
        fontWeight: '500',
        letterSpacing: '0.05em',
        transition: 'color 0.2s ease, background-color 0.2s ease',
        borderRadius: '0.25rem',
        whiteSpace: 'nowrap'
      },
      cartContainer: {
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center'
      },
      cartButton: {
        color: 'white',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s ease, background-color 0.2s ease'
      },
      mobileMenuOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: isMobileMenuOpen && isMobile ? 'block' : 'none'
      },
      mobileMenu: {
        display: isMobileMenuOpen && isMobile ? 'block' : 'none',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        borderTop: '1px solid #374151',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 1001
      },
      mobileNavLinks: {
        padding: '1rem 0'
      },
      mobileNavLink: {
        color: 'white',
        textDecoration: 'none',
        display: 'block',
        padding: '1rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        letterSpacing: '0.05em',
        transition: 'color 0.2s ease, background-color 0.2s ease',
        borderBottom: '1px solid #1f2937'
      }
    };

    return baseStyles;
  };

  const styles = getStyles();

  const handleLinkHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#fb923c';
      e.target.style.backgroundColor = 'rgba(251, 146, 60, 0.1)';
    } else {
      e.target.style.color = 'white';
      e.target.style.backgroundColor = 'transparent';
    }
  };

  const handleButtonHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#fb923c';
      e.target.style.backgroundColor = 'rgba(251, 146, 60, 0.1)';
    } else {
      e.target.style.color = 'white';
      e.target.style.backgroundColor = 'transparent';
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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
        style={styles.mobileMenuOverlay}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <nav style={styles.navigation}>
        <div style={styles.navContainer}>
          <div style={styles.navContent}>
            {/* Mobile menu button */}
            <div style={styles.mobileMenuButton}>
              <button
                onClick={toggleMobileMenu}
                style={styles.menuToggle}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div style={styles.logoContainer}>
              <a href="/" style={styles.logo}>
                audiophile
              </a>
            </div>

            {/* Desktop navigation */}
            <div style={styles.desktopNav}>
              <div style={styles.navLinks}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={styles.navLink}
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Shopping cart */}
            <div style={styles.cartContainer}>
              <button 
                style={styles.cartButton}
                aria-label="Shopping cart"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                <ShoppingCart size={isMobile ? 20 : isDesktop ? 24 : 22} />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div style={styles.mobileMenu}>
            <div style={styles.mobileNavLinks}>
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    ...styles.mobileNavLink,
                    borderBottom: index === navLinks.length - 1 ? 'none' : '1px solid #1f2937'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
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