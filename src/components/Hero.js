import React, { useState } from "react";
import { ArrowRight, Play, Volume2 } from "lucide-react";
import "../Styles/Hero.css";

const Hero = ({ 
  heroImage, 
  altText = "XX99 Mark II Headphones",
  title = "XX99 Mark II Headphones",
  description = "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
  buttonText = "See Product",
  onButtonClick,
  showNewBadge = true,
  showPlayButton = false,
  productPrice = "$2,999"
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      // Default action - scroll to products or navigate
      const productsSection = document.querySelector('.product-container');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Split title into words for animation
  const titleWords = title.split(' ');

  return (
    <div 
      className="hero-container"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {showNewBadge && (
          <div className="new-product">
            <Volume2 size={16} style={{ marginRight: '8px', display: 'inline' }} />
            New Product
          </div>
        )}
        
        <h1 className="hero-title">
          {titleWords.map((word, index) => (
            <span 
              key={index}
              style={{ 
                animationDelay: `${0.3 + index * 0.1}s`,
                display: 'inline-block',
                marginRight: index < titleWords.length - 1 ? '0.3em' : '0'
              }}
            >
              {word}
              {index === titleWords.length - 2 && <br />}
            </span>
          ))}
        </h1>
        
        <p className="hero-description">
          {description}
        </p>

        {/* Price Display */}
        <div className="price-display" style={{
          color: '#D87D4A',
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          animation: 'fadeInUp 0.8s ease-out 0.6s both'
        }}>
          {productPrice}
        </div>

        {/* Action Buttons */}
        <div className="hero-actions" style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            className="hero-button"
            onClick={handleButtonClick}
          >
            {buttonText}
            <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>

          {showPlayButton && (
            <button
              className="play-button"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                animation: 'fadeInUp 0.8s ease-out 0.8s both'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(216, 125, 74, 0.2)';
                e.target.style.borderColor = '#D87D4A';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Play size={24} fill="currentColor" />
            </button>
          )}
        </div>

        {/* Features List */}
        <div className="features-list" style={{
          marginTop: '3rem',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          animation: 'fadeInUp 0.8s ease-out 1s both'
        }}>
          {[
            'Premium Build Quality',
            'Wireless Freedom', 
            'Studio Sound'
          ].map((feature, index) => (
            <div 
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#cbd5e1',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#D87D4A',
                marginRight: '8px'
              }} />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="image-container">
        {/* Background Glows */}
        <div className="glow-effect"></div>
        <div className="secondary-glow"></div>
        
        {/* Product Image */}
        {heroImage ? (
          <img 
            src={heroImage} 
            alt={altText} 
            className="hero-image"
          />
        ) : (
          <div className="image-placeholder">
            <div>
              <Volume2 size={48} style={{ marginBottom: '1rem', opacity: 0.6 }} />
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                Premium Audio Product
              </p>
              <p style={{ 
                fontSize: '0.8rem', 
                margin: 0, 
                opacity: 0.7,
                maxWidth: '200px'
              }}>
                Import your hero image to showcase the product
              </p>
            </div>
          </div>
        )}

        {/* Interactive Hotspots */}
        <div 
          className="hotspot"
          style={{
            position: 'absolute',
            top: '30%',
            right: '20%',
            width: '12px',
            height: '12px',
            background: '#D87D4A',
            borderRadius: '50%',
            cursor: 'pointer',
            animation: 'pulse 2s infinite',
            boxShadow: '0 0 0 0 rgba(216, 125, 74, 0.7)'
          }}
          title="Premium drivers for exceptional sound quality"
        />
        
        <div 
          className="hotspot"
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '25%',
            width: '12px',
            height: '12px',
            background: '#D87D4A',
            borderRadius: '50%',
            cursor: 'pointer',
            animation: 'pulse 2s infinite 1s',
            boxShadow: '0 0 0 0 rgba(216, 125, 74, 0.7)'
          }}
          title="Comfortable premium padding"
        />
      </div>

      {/* Decorative Pattern */}
      <div className="decorative-pattern">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="pattern-dot"
            style={{
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div 
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          animation: 'fadeIn 1s ease-out 2s both'
        }}
      >
        <span style={{ marginBottom: '0.5rem' }}>Scroll</span>
        <div style={{
          width: '2px',
          height: '30px',
          background: 'linear-gradient(to bottom, #D87D4A, transparent)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
      </div>

      {/* Additional CSS for hotspot pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(216, 125, 74, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(216, 125, 74, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(216, 125, 74, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;