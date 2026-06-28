import React from "react";

const Guidance = () => {
  return (
    <div style={{
      backgroundColor: "#000",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Guidance Page</h1>
      <p style={{ fontSize: "18px", marginBottom: "40px" }}>
        <span role="img" aria-label="success">✅</span> Deployment test successful!
      </p>
      <p style={{ fontSize: "14px", color: "#888" }}>
        This page confirms your app is redeploying correctly.
      </p>
    </div>
  );
};

export default Guidance;
