import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improves air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and purifies air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity and purifies indoor surroundings.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/24/rubber-tree-4850659_1280.jpg", description: "Easy-care plant with large air-filtering leaves.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/02/aloe-vera-3284620_1280.jpg", description: "Purifies air and offers soothing gel benefits.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/07/22/19/21/lavender-1535569_1280.jpg", description: "Calming aroma that relaxes minds and reduces stress.", cost: "$16" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/05/16/18/16/jasmine-3406628_1280.jpg", description: "Sweet floral scent that brightens indoor spaces.", cost: "$19" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herb fragrance used in cooking and decor.", cost: "$11" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2017/06/23/18/39/mint-2435532_1280.jpg", description: "Refreshing scent and easy-to-grow herb.", cost: "$8" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2020/10/19/12/37/eucalyptus-5667633_1280.jpg", description: "Distinctive clean scent known for respiratory soothing.", cost: "$22" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2016/06/05/20/43/lemon-balm-1438183_1280.jpg", description: "Citrusy fragrance that uplifts mood naturally.", cost: "$13" }
      ]
    },
    {
      category: "Succulents & Cacti",
      plants: [
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2020/03/10/05/25/jade-plant-4917897_1280.jpg", description: "Symbol of good luck with thick, glossy leaves.", cost: "$14" },
        { name: "Zebra Cactus", image: "https://cdn.pixabay.com/photo/2019/09/25/12/03/cactus-4503463_1280.jpg", description: "Striking white striped succulent requiring low water.", cost: "$10" },
        { name: "Echeveria", image: "https://cdn.pixabay.com/photo/2017/08/07/19/10/succulent-2606822_1280.jpg", description: "Beautiful rose-shaped low-maintenance succulent.", cost: "$9" },
        { name: "String of Pearls", image: "https://cdn.pixabay.com/photo/2021/01/29/14/40/string-of-pearls-5961234_1280.jpg", description: "Unique cascading bead-like green foliage.", cost: "$17" },
        { name: "Christmas Cactus", image: "https://cdn.pixabay.com/photo/2020/12/06/16/09/christmas-cactus-5809223_1280.jpg", description: "Produces vibrant seasonal indoor blooms.", cost: "$15" },
        { name: "Pincushion Cactus", image: "https://cdn.pixabay.com/photo/2016/11/21/16/06/cactus-1846147_1280.jpg", description: "Compact desert plant with fine decorative spines.", cost: "$12" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>Paradise Nursery</div>
        <div className="navbar-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)} className="cart-icon-container">
            🛒 Cart <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '30px' }}>
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', color: '#2e7d32', margin: '20px 0' }}>
                {categoryObj.category}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' }}>
                {categoryObj.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{
                    border: '1px solid #ddd', borderRadius: '8px', width: '260px', padding: '15px',
                    textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }} />
                    <h3 style={{ margin: '10px 0 5px 0' }}>{plant.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', height: '40px' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '10px 0', color: '#2e7d32' }}>{plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                      style={{
                        backgroundColor: isAddedToCart(plant.name) ? '#cccccc' : '#4CAF50',
                        color: 'white', border: 'none', padding: '10px 18px', borderRadius: '4px',
                        cursor: isAddedToCart(plant.name) ? 'not-allowed' : 'pointer', width: '100%'
                      }}
                    >
                      {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
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
