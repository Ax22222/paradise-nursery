import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', ''));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (parseCost(item.cost) * item.quantity), 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>Your cart is empty.</p>
          <button onClick={onContinueShopping} style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Continue Shopping</button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#27ae60' }}>Total Cart Amount: ${calculateTotalAmount()}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', alignItems: 'center', background: '#fff', gap: '20px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>Unit Price: {item.cost}</p>
                  <p style={{ color: '#27ae60', fontWeight: 'bold' }}>Subtotal: ${calculateTotalCost(item)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px' }}>+</button>
                </div>
                <button onClick={() => handleRemove(item.name)} style={{ padding: '5px 10px', background: '#7f8c8d', color: 'white', border: 'none' }}>Delete</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button onClick={onContinueShopping} style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', cursor: 'pointer' }}>Continue Shopping</button>
            <button onClick={() => alert("Checkout coming soon!")} style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' }}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
