import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SearchBar.css"
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8086/products/fetchAll')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      axios.get('http://localhost:8086/products/fetchAll')
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching all products:', error);
        });
      return;
    }

    axios.get(`http://localhost:8086/products/byCategory/${searchQuery}`)
      .then((response) => {
        setProducts(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching products by category:', error);
      });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="search">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Search here ....."
              value={searchQuery}
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-around">
      {products.map(product => (
                <Card key={product.productId} style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                        <Card.Title>{product?.name}</Card.Title>
                        <img src={`data:image/jpeg;base64,${product.imageData}`} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                        <Card.Text>Category: {product.category.name}</Card.Text>
                        <Card.Text>Price: ₹ {product.price}</Card.Text>
                        <Link to={`/productdetails/${product.productId}`}>
                            <Button variant="primary">Add to Cart</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}

            
        </div>
        
    </div>
  );
};

export default SearchBar;


