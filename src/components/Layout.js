import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


const Layout = () => {
  return (
    <>
 <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
      {/* ✅ This will render child routes */}
    
      </main>
        <Footer />
     
    </>
  );
};

export default Layout; 
