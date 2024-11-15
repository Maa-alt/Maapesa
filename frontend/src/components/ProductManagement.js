// src/components/ProductManagement.js
import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';

const ProductManagement = ({ setProducts }) => {
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLocalProducts(data);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error fetching products');
    }
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct
        ? `http://localhost:5000/api/products/${editingProduct.id}`
        : 'http://localhost:5000/api/products';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (editingProduct) {
        setEditingProduct(null);
      }

      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', quantity: '' });
      setError('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSellProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product, quantity: updatedQuantity }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        fetchProducts();
      } catch (err) {
        console.error('Error selling product:', err);
        setError('Error selling product');
      }
    } else {
      setError('Product is out of stock');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  return (
    <div className="product-management">
      <header className="header">
        <h2>Product Management</h2>
      </header>

      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3>Product List</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price (M)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{`M ${parseFloat(product.price).toFixed(2)}`}</td>
              <td>{product.quantity}</td>
              <td>
                <button className="action-button" onClick={() => handleEditProduct(product)}>Edit</button>
                <button className="action-button" onClick={() => handleSellProduct(product.id)}>Sell</button>
                <button className="action-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;