import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
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

  const socialLinks = [
    { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
    { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
    { href: 'https://instagram.com', label: 'Instagram', icon: Instagram }
  ];

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const getStyles = () => {
    const baseStyles = {
      footer: {
        backgroundColor: '#000000',
        color: 'white',
        position: 'relative'
      },
      footerContainer: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '3rem 1rem 2rem' : isTablet ? '4rem 1.5rem 2.5rem' : '4rem 2rem 3rem'
      },
      footerContent: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '2rem' : '3rem'
      },
      leftSection: {
        flex: isMobile ? 'none' : '1',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '1.5rem' : '2rem'
      },
      logo: {
        color: 'white',
        fontSize: isMobile ? '1.5rem' : isDesktop ? '1.75rem' : '1.625rem',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        transition: 'color 0.2s ease'
      },
      description: {
        color: '#9ca3af',
        fontSize: isMobile ? '0.875rem' : '0.9375rem',
        lineHeight: '1.6',
        maxWidth: isMobile ? 'none' : '400px'
      },
      rightSection: {
        flex: isMobile ? 'none' : '1',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'flex-start' : 'flex-end',
        gap: isMobile ? '2rem' : isDesktop ? '4rem' : '3rem'
      },
      navSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '1rem' : '1.25rem'
      },
      sectionTitle: {
        color: 'white',
        fontSize: isMobile ? '0.875rem' : '0.9375rem',
        fontWeight: '600',
        letterSpacing: '0.05em',
        marginBottom: '0.5rem'
      },
      navLinks: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : isTablet ? 'column' : 'row',
        gap: isMobile ? '0.75rem' : isDesktop ? '2rem' : '1.5rem'
      },
      navLink: {
        color: '#9ca3af',
        textDecoration: 'none',
        fontSize: isMobile ? '0.875rem' : '0.9375rem',
        fontWeight: '400',
        letterSpacing: '0.025em',
        transition: 'color 0.2s ease',
        padding: '0.25rem 0'
      },
      socialSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: isMobile ? 'flex-start' : 'flex-end'
      },
      socialLinks: {
        display: 'flex',
        gap: '1rem'
      },
      socialLink: {
        color: '#9ca3af',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        transition: 'color 0.2s ease, background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      footerBottom: {
        borderTop: '1px solid #1f2937',
        marginTop: isMobile ? '2rem' : '3rem',
        paddingTop: isMobile ? '1.5rem' : '2rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '1rem' : '0'
      },
      copyright: {
        color: '#6b7280',
        fontSize: isMobile ? '0.75rem' : '0.875rem'
      },
      bottomLinks: {
        display: 'flex',
        gap: isMobile ? '1rem' : '2rem'
      },
      bottomLink: {
        color: '#6b7280',
        textDecoration: 'none',
        fontSize: isMobile ? '0.75rem' : '0.875rem',
        transition: 'color 0.2s ease'
      }
    };

    return baseStyles;
  };

  const styles = getStyles();

  const handleLinkHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#fb923c';
    } else {
      e.target.style.color = '#9ca3af';
    }
  };

  const handleSocialHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#fb923c';
      e.target.style.backgroundColor = 'rgba(251, 146, 60, 0.1)';
    } else {
      e.target.style.color = '#9ca3af';
      e.target.style.backgroundColor = 'transparent';
    }
  };

  const handleLogoHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#fb923c';
    } else {
      e.target.style.color = 'white';
    }
  };

  const handleBottomLinkHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#fb923c';
    } else {
      e.target.style.color = '#6b7280';
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerContent}>
          {/* Left Section */}
          <div style={styles.leftSection}>
            <a 
              href="/" 
              style={styles.logo}
              onMouseEnter={(e) => handleLogoHover(e, true)}
              onMouseLeave={(e) => handleLogoHover(e, false)}
            >
              audiophile
            </a>
            <p style={styles.description}>
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
              and sound specialists who are devoted to helping you get the most out of personal audio. 
              Come and visit our demo facility - we're open 7 days a week.
            </p>
          </div>

          {/* Right Section */}
          <div style={styles.rightSection}>
            {/* Navigation Links */}
            <div style={styles.navSection}>
              {!isMobile && (
                <h3 style={styles.sectionTitle}>QUICK LINKS</h3>
              )}
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

            {/* Social Media Links */}
            <div style={styles.socialSection}>
              <h3 style={styles.sectionTitle}>FOLLOW US</h3>
              <div style={styles.socialLinks}>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      style={styles.socialLink}
                      aria-label={social.label}
                      onMouseEnter={(e) => handleSocialHover(e, true)}
                      onMouseLeave={(e) => handleSocialHover(e, false)}
                    >
                      <IconComponent size={isMobile ? 20 : 24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <div style={styles.copyright}>
            Copyright © 2025 audiophile. All Rights Reserved
          </div>
          <div style={styles.bottomLinks}>
            <a 
              href="/privacy" 
              style={styles.bottomLink}
              onMouseEnter={(e) => handleBottomLinkHover(e, true)}
              onMouseLeave={(e) => handleBottomLinkHover(e, false)}
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              style={styles.bottomLink}
              onMouseEnter={(e) => handleBottomLinkHover(e, true)}
              onMouseLeave={(e) => handleBottomLinkHover(e, false)}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;