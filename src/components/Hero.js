import React from 'react';
import heroImg from '../assets/home/desktop/image-hero.jpg';

const Hero = () => {
  const styles = {
    heroSection: {
      backgroundColor: '#1a1a1a',
      color: 'white',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.1,
      background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 24px',
      position: 'relative',
      zIndex: 10
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '48px',
      alignItems: 'center',
      minHeight: '80vh'
    },
    contentSection: {
      textAlign: 'center',
      order: 1
    },
    newProductLabel: {
      color: '#fb923c',
      fontSize: '12px',
      fontWeight: 'normal',
      letterSpacing: '6px',
      textTransform: 'uppercase',
      opacity: 0.6,
      marginBottom: '32px'
    },
    mainHeading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      lineHeight: 1,
      letterSpacing: '0.05em',
      marginBottom: '32px'
    },
    description: {
      color: '#d1d5db',
      fontSize: '14px',
      lineHeight: 1.6,
      maxWidth: '384px',
      margin: '0 auto 32px auto',
      opacity: 0.75
    },
    buttonContainer: {
      paddingTop: '16px'
    },
    ctaButton: {
      backgroundColor: '#ea580c',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '12px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      padding: '16px 32px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#dc2626',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
      }
    },
    imageSection: {
      display: 'flex',
      justifyContent: 'center',
      order: 2
    },
    imageContainer: {
      position: 'relative'
    }
  };

  // Handle button hover
  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = '#dc2626';
    e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#ea580c';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section style={styles.heroSection}>
      {/* Background pattern/texture */}
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.container}>
        <div style={styles.gridContainer} className="responsive-grid">
          {/* Left Side - Content */}
          <div style={styles.contentSection} className="responsive-content">
            <p style={styles.newProductLabel}>
              NEW PRODUCT
            </p>
            
            <h1 style={styles.mainHeading} className="responsive-heading">
              XX99 MARK II<br />
              HEADPHONES
            </h1>
            
            <p style={styles.description} className="responsive-description">
              Experience natural, lifelike audio and exceptional<br className="hidden-mobile" />
              build quality made for the passionate music<br className="hidden-mobile" />
              enthusiast.
            </p>
            
            <div style={styles.buttonContainer}>
              <button 
                style={styles.ctaButton}
                className="responsive-button"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                SEE PRODUCT
              </button>
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div style={styles.imageSection} className="responsive-image">
            <div style={styles.imageContainer}>
              <img 
                src={heroImg}
                alt="XX99 Mark II Headphones" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .responsive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          min-height: 80vh;
        }
        
        .responsive-content {
          text-align: center;
          order: 1;
        }
        
        .responsive-image {
          display: flex;
          justify-content: center;
          order: 2;
        }
        
        .hidden-mobile {
          display: none;
        }
        
        .hero-image {
          width: 288px;
          height: 288px;
          object-fit: contain;
        }
        
        .responsive-heading {
          font-size: 2.5rem;
        }
        
        .responsive-description {
          font-size: 14px;
        }
        
        .responsive-button {
          font-size: 12px;
        }
        
        /* Tablet styles */
        @media (min-width: 768px) {
          .responsive-heading {
            font-size: 3rem;
          }
          
          .responsive-description {
            font-size: 16px;
          }
          
          .responsive-button {
            font-size: 14px;
          }
          
          .hero-image {
            width: 384px;
            height: 384px;
          }
        }
        
        /* Desktop styles - Image on right */
        @media (min-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
          }
          
          .responsive-content {
            text-align: left;
            order: 1; /* Content stays on left */
          }
          
          .responsive-image {
            justify-content: flex-end;
            order: 2; /* Image goes to right */
          }
          
          .responsive-heading {
            font-size: 3.75rem;
          }
          
          .responsive-description {
            font-size: 18px;
            margin: 0 0 32px 0;
          }
          
          .hidden-mobile {
            display: inline;
          }
          
          .hero-image {
            width: 450px;
            height: 450px;
          }
        }
        
        /* Large desktop */
        @media (min-width: 1280px) {
          .responsive-heading {
            font-size: 4.5rem;
          }
          
          .hero-image {
            width: 500px;
            height: 500px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;