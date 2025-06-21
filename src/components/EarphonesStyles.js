// EarphonesStyles.js
export const getEarphonesStyles = (isMobile, isTablet, isDesktop) => {
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
      marginBottom: "1rem",
    },
    categoryBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: "#fb923c",
      color: "#ffffff",
      padding: "0.5rem 1rem",
      borderRadius: "2rem",
      fontSize: "0.875rem",
      fontWeight: "500",
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
      overflow: "hidden",
    },
    productImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    badge: {
      position: "absolute",
      top: "1rem",
      padding: "0.25rem 0.75rem",
      borderRadius: "1rem",
      fontSize: "0.75rem",
      fontWeight: "bold",
      zIndex: 10,
    },
    newBadge: {
      left: "1rem",
      backgroundColor: "#16a34a",
      color: "#ffffff",
    },
    categoryBadgeCard: {
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
  };
};