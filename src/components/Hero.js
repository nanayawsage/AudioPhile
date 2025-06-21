import React from 'react';


const Hero = ({ heroImage, altText = "Hero Image" }) => {
  const styles = {
    hero: {
      backgroundColor: '#000000',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '0.5px solid rgba(255, 255, 255, 0.2)',
    },
    
    content: {
      flex: '1',
      maxWidth: '500px',
      color: '#ffffff',
      zIndex: 10,
    },
    
    newProduct: {
      color: '#D87D4A',
      fontSize: '0.875rem',
      fontWeight: '500',
      letterSpacing: '0.5em',
      marginBottom: '1rem',
      opacity: 0.7,
      textTransform: 'uppercase',
    },
    
    title: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      lineHeight: '1.1',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
    },
    
    description: {
      color: '#9CA3AF',
      fontSize: '1.125rem',
      lineHeight: '1.6',
      marginBottom: '2.5rem',
      maxWidth: '400px',
    },
    
    button: {
      backgroundColor: '#D87D4A',
      color: '#ffffff',
      padding: '1rem 2rem',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    
    buttonHover: {
      backgroundColor: '#B86A3A',
      transform: 'scale(1.05)',
    },
    
    imageContainer: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      maxWidth: '500px',
      height: '300px',
    },
    
    heroImageStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      position: 'relative',
      zIndex: 2,
    },
    
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px dashed rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '1rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
    },
    
    glowEffect: {
      position: 'absolute',
      width: '320px',
      height: '320px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(75, 85, 104, 0.2) 0%, transparent 70%)',
      filter: 'blur(30px)',
      zIndex: 1,
    },
    
    decorativePattern: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.5rem',
      opacity: 0.2,
      zIndex: 1,
    },
    
    dot: {
      width: '12px',
      height: '12px',
      backgroundColor: '#D87D4A',
      borderRadius: '50%',
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.hero} className="hero-container">
      {/* Content Section */}
      <div style={styles.content} className="content-section">
        <p style={styles.newProduct}>New Product</p>
        <h1 style={styles.title} className="hero-title">
          XX99 Mark II<br />
          Headphones
        </h1>
        <p style={styles.description} className="hero-description">
          Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
        </p>
        <button
          style={{
            ...styles.button,
            ...(isHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          See Product
        </button>
      </div>

      {/* Hero Image Section */}
      <div style={styles.imageContainer} className="image-container">
        <div style={styles.glowEffect} className="glow-effect"></div>
        {heroImage ? (
          <img 
            src={heroImage} 
            alt={altText}
            style={styles.heroImageStyle}
          />
        ) : (
          <div style={styles.imagePlaceholder}>
            <div>
              <p>Import your hero image here</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Pass heroImage prop to display your image
              </p>
            </div>
          </div>
        )}
      </div>


      {/* Decorative Pattern */}
      <div style={styles.decorativePattern} className="decorative-pattern">
        {[...Array(9)].map((_, i) => (
          <div key={i} style={styles.dot} className="pattern-dot"></div>
        ))}
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .hero-container {
            flex-direction: column !important;
            text-align: center !important;
            padding: 2rem !important;
            min-height: 50vh !important;
          }
          
          .content-section {
            margin-bottom: 2rem !important;
          }
          
          .hero-title {
            font-size: 2.5rem !important;
          }
          
          .image-container {
            height: 250px !important;
          }
          
          .glow-effect {
            width: 270px !important;
            height: 270px !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-container {
            padding: 1.5rem 1rem !important;
            min-height: 45vh !important;
          }
          
          .hero-title {
            font-size: 2rem !important;
          }
          
          .hero-description {
            font-size: 1rem !important;
          }
          
          .image-container {
            height: 200px !important;
          }
          
          .glow-effect {
            width: 220px !important;
            height: 220px !important;
          }
          
          .decorative-pattern {
            top: 1rem !important;
            right: 1rem !important;
          }
          
          .pattern-dot {
            width: 8px !important;
            height: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;