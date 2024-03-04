import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './ProductCard.css';
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
    const [products, setProducts] = useState([]);


    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8086/products/fetchAll');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = () => {
        // Add your logic for adding to cart here
        // window.location.href = '/login';
        navigate("/product/details")

    };
    
    return (
        <div className="d-flex flex-wrap justify-content-around">
            {products.map(product => (
                <Card key={product.productId} style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <img src={`data:image/jpeg;base64,${product.imageData}`} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                        <Card.Text>Category: {product.category.name}</Card.Text>
                        <Card.Text>Price: ₹ {product.price}</Card.Text>
                        <Button variant="primary" onClick={() => handleAddToCart(product.productId)} >Add to Cart</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ProductCard;
