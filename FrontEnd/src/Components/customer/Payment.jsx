import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThankYou from './ThankYou';
import CustomerNavbar from './CustomerNavbar';



const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [error, setError] = useState({});

  const userId = localStorage.getItem('userID');

  useEffect(() => {
    axios.get(`http://localhost:8086/carts/user/${userId}`)
      .then((response) => {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      })
      .catch((error) => {
        setError({ message: error.message });
      });
  }, []);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalCartPrice(total);
  };

  const handlePayment = async () => {
    try {
      const res = await axios.get('http://localhost:8086/orders/createTransaction/' + totalCartPrice); // Assuming the total amount is 500
      const { orderId, amount } = res.data;

      const razorpay = new window.Razorpay({
        key: 'rzp_test_BsCL4MHT2UPLIw',
        amount: totalCartPrice * 100, // Amount in paise
        currency: 'INR',
        name: 'Cafetto',
        description: 'Payment for your order',
        image: 'https://example.com/your_logo.png',
        order_id: orderId,
        handler: function (response) {
          setPaymentSuccess(true);
          alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'name',
          email: 'cafetto@cafe.com',
          contact: '9898656532',

        },
        notes: {
          address: 'Mumbai',
        },
        theme: {
          color: '#F37254',
        },
      });
      razorpay.open();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <CustomerNavbar/>
    <div className='py-4'>
      <div className='container'>
        <div className='row'>
          <div>
            {paymentSuccess ? (
              <ThankYou totalCartPrice={totalCartPrice}/>
            ) : (
              <div className='col-md-5'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error.message ? (
                      <tr>
                        <td colSpan="4">Error loading data: {error.message}</td>
                      </tr>
                    ) : (
                      cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.foodName}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price * item.quantity}</td>
                        </tr>
                      ))
                    )}
                    <tr>
                      <td colSpan="2" className='text-end fw-bold'>Grand Total</td>
                      <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <button type='button' className='btn btn-primary mx-1' onClick={handlePayment}>Place Order</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    </>
    
  );
};

export default Payment;
