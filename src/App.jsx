import React, { useState } from 'react';
import ProductList from './components/ProductList';
import './App.css';
import AboutUs from './components/AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleStartClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Greenery Meets Peace</p>
              <button className="get-started-btn" onClick={handleStartClick}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div className="product-list-container">
          <ProductList onBackToHome={() => setShowProductList(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
