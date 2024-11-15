// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import ProductBarChart from './ProductBarChart';
import '../App.css';

// Import images
import kImage from '../image/k.jpeg';
import lImage from '../image/l.jpeg';
import sImage from '../image/s.jpeg';
import RImage from '../image/R.jpeg';
import mImage from '../image/m.jpeg';
import uImage from '../image/u.jpeg';
import image from '../image/image.jpg';

const images = [kImage, lImage, sImage, RImage, mImage, uImage, image];

const Dashboard = ({ products }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : `M ${numericPrice.toFixed(2)}`; // Updated to LSL
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
      </header>

      <section style={{ marginTop: '20px' }}>
        <h3>Products Added</h3>
        {products.length === 0 ? (
          <p>No products have been added yet.</p>
        ) : (
          <div>
            <ProductBarChart products={products} />
            <table className="table"> {/* Apply the CSS class here */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{formatPrice(product.price)}</td> {/* Price now shows LSL */}
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="product-images" style={{ marginTop: '20px' }}>
        <h3>Featured Products</h3>
        <div className="image-gallery">
          <img 
            src={images[currentImageIndex]} 
            alt={`Featured product ${currentImageIndex + 1}`} 
            className="product-image" 
            style={{ width: '100%', height: 'auto' }} // Ensure responsiveness
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;