import React from "react";

const Header: React.FC = () => {
  return (
    <header style={{background:"#2e7d32",color:"white",padding:"15px"}}>
      <h1>🌾 Farmer Website</h1>
      <nav>
        <a href="#">Home</a> | 
        <a href="#">Services</a> | 
        <a href="#">Products</a> | 
        <a href="#">Contact</a>
      </nav>
    </header>
  );
};

export default Header;