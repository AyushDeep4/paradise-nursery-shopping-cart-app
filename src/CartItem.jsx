import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
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
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '20px' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: '40px 0' }}>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid #ccc', padding: '15px 0'
          }}>
            <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '6px' }} />
            <div style={{ flex: '1', marginLeft: '20px' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
              <p style={{ margin: '2px 0', color: '#555' }}>Unit Price: {item.cost}</p>
              <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Subtotal: ${calculateTotalCost(item)}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => handleDecrement(item)} style={{ padding: '5px 12px', fontSize: '1rem', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} style={{ padding: '5px 12px', fontSize: '1rem', cursor: 'pointer' }}>+</button>
              <button onClick={() => handleRemove(item)} style={{
                backgroundColor: '#d32f2f', color: 'white', border: 'none',
                padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginLeft: '15px'
              }}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button onClick={onContinueShopping} style={{
          backgroundColor: '#2e7d32', color: 'white', border: 'none',
          padding: '12px 24px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
        }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckoutShopping} style={{
          backgroundColor: '#ff9800', color: 'white', border: 'none',
          padding: '12px 24px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
        }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
