import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';
import CartItem from './CartItem';

function ProductList({ onBackToHome }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  
  // Select items from global store to calculate total count dynamically
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Plant Array containing 3 unique categories and 6 items total
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://unsplash.com", cost: "$15", description: "Cleans indoor air very effectively." },
        { name: "Spider Plant", image: "https://unsplash.com", cost: "$12", description: "Easy to grow and safe for pets." }
      ]
    },
    {
      category: "Aromatic Houseplants",
      plants: [
        { name: "Lavender", image: "https://unsplash.com", cost: "$18", description: "Calming scent helps reduce anxiety." },
        { name: "Mint Plant", image: "https://unsplash.com", cost: "$10", description: "Fragrant leaves perfect for teas." }
      ]
    },
    {
      category: "Low Maintenance Succulents",
      plants: [
        { name: "Aloe Vera", image: "https://unsplash.com", cost: "$14", description: "Healing gel great for soothing burns." },
        { name: "Jade Plant", image: "https://unsplash.com", cost: "$16", description: "Symbol of good luck and prosperity." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isItemInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Top Navbar Header common across list and cart states */}
      <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', background: '#2c3e50', color: 'white', alignItems: 'center' }}>
        <div className="nav-logo" onClick={onBackToHome} style={{ cursor: 'pointer', fontWeight: 'bold' }}>🏠 Paradise Nursery</div>
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }} style={{ color: 'white', textDecoration: 'none' }}>Plants Listing</a>
          <div className="cart-icon-container" onClick={() => setShowCart(true)} style={{ position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontSize: '1.5rem' }}>🛒</span>
            {totalCartCount > 0 && (
              <span className="cart-badge" style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#e74c3c', borderRadius: '50%', padding: '2px 7px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {totalCartCount}
              </span>
            )}
          </div>
        </nav>
      </header>

      {/* Conditional rendering between Product Grid and Shopping Cart view details */}
      {!showCart ? (
        <div className="product-grid-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          {plantsArray.map((cat, idx) => (
            <div key={idx} className="category-section" style={{ marginBottom: '40px' }}>
              <h2 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '10px', color: '#2c3e50' }}>{cat.category}</h2>
              <div className="plant-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="plant-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h3 style={{ margin: '15px 0 5px' }}>{plant.name}</h3>
                    <p style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.2rem' }}>{plant.cost}</p>
                    <p style={{ fontSize: '0.9rem', color: '#7f8c8d', minHeight: '40px' }}>{plant.description}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isItemInCart(plant.name)}
                      style={{ width: '100%', padding: '10px', background: isItemInCart(plant.name) ? '#bdc3c7' : '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: isItemInCart(plant.name) ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '10px' }}
                    >
                      {isItemInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
