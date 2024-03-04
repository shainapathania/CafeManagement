import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import happy from '../../media/happy.jpeg';


const ThankYou = ({ totalCartPrice }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-4 mb-4">Thank You for Your Order!</h1>
          <img src={happy} alt="Thank You" className="img-fluid mb-4" style={{ width: '200px', height: '200px', marginLeft: '100px' }} />
          <p className="lead">Your payment of ₹{totalCartPrice} has been received.</p>
          <p className="lead">Your order will be processed shortly.</p>
          <Link to="/customer/dashboard" className="btn btn-primary mt-3">
            <i className="fas fa-home me-2"></i> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
