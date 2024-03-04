// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Button } from "react-bootstrap";

// const ProductDetails = () => {
//   const [quantity, setQuantity] = useState(1);
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [productDetails, setProductDetails] = useState({
    
//     cartfoodId: "",
//     category: "",
//     foodName: "",
//     price: "",
//     quantity: "",
//   });

//   const storedUserId = localStorage.getItem("userID");
//   const [userId, setUserId] = useState(null); // State to store userId

//   useEffect(() => {
//     // Fetch userId from localStorage
//     const storedUserId = localStorage.getItem("userID");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8086/products/product/fetchByProductId/${productId}`
//         );
//         console.log(response.data);
//         setProduct(response.data);
//         setProductDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const incrementQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prevQuantity) => prevQuantity - 1);
//     }
//   };

//   const handleClick = (productId) => {
//     if (!storedUserId) {
//       console.error("User is not logged in."); // Handle this case appropriately
//       return;
//     }

//     axios
//       .post(`http://localhost:8086/carts/addTOCart/${storedUserId}`, productDetails)
//       .then((response) => {
//         console.log("Product added to cart:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//       });
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center h-full p-20 w-full bg-slate-100">
//         <div
//           className="flex items-start mt-6 border-2 pr-6"
//           key={product.productId}
//         >
//           {product.map((product) => (
//             <div className="flex flex-col pt-2" key={product.productId}>
//               <div>
//                 <h1 className="font-semibold text-2xl text-gray-700 tracking-wider">
//                   {product.name}
//                 </h1>
//                 <p className="font-medium text-base text-gray-500">
//                   {product.category.name}
//                 </p>
//               </div>

//               <div className="flex flex-wrap justify-between font-normal text-base text-gray-600 mt-2">
//                 <h2>Cafe Name</h2>
//                 <p>Cafe@contact.com</p>
//               </div>

//               <div className="flex justify-between my-6">
//                 <div className="flex justify-between gap-3 px-3  border-2 ">
//                   <button
//                     onClick={decrementQuantity}
//                     className="text-xl border-r-2 pr-3"
//                   >
//                     -
//                   </button>
//                   <span className="text-lg border-r-2 pr-3">{quantity}</span>
//                   <button onClick={incrementQuantity} className="text-xl">
//                     +
//                   </button>
//                 </div>
//                 <h2 className="text-lg font-normal">
//                   Price: ₹ {product.price}
//                 </h2>
//               </div>

//               <div className="mt-16">
//                 <Button
//                   variant="primary"
//                   onClick={() => handleClick(product.productId)}
//                 >
//                   Add to cart
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CustomerNavbar from "../customer/CustomerNavbar";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

    const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/products/product/fetchByProductId/${productId}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleClick = () => {
    const userId = localStorage.getItem('userID');
    if (!userId) {
      console.error('User ID is not available.'); 
      return;
    }
    const selectedProduct = product[0]; // Assuming you're only selecting the first product in the array
    const cartItem = {
      foodName: selectedProduct.name,
      cafeName: selectedProduct.cafeName, // Assuming this property exists in the product object
      category: selectedProduct.category.name, // Assuming this property exists in the product object
      price: selectedProduct.price,
      quantity: quantity,
    };
    axios.post(`http://localhost:8086/carts/addTOCart/${userId}`, cartItem)
      .then((response) => {
        console.log('Product added to cart:', response.data);
        navigate("/myCart");
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  if (!product.length) {
    return <div>Loading...</div>;
  }

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  }
  
  const decrementQuantity = () => { 
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  }

  return (
    <>
    <CustomerNavbar/>
      <div className='flex items-center justify-center h-full p-20 w-full bg-slate-100'>
        <div className='flex items-start mt-6 border-2 pr-6'>
          {product.map((selectedProduct, index) => (
            <div className='flex flex-col pt-2' key={index}>

              <div>
                <h1 className='font-semibold text-2xl text-gray-700 tracking-wider'>{selectedProduct.name}</h1>
                <p className='font-medium text-base text-gray-500'>{selectedProduct.category.name}</p>
              </div>

              <div className='flex justify-between my-6'>
                <div className='flex justify-between gap-3 px-3  border-2 '>
                  <button onClick={decrementQuantity} className='text-xl border-r-2 pr-3'>-</button>
                  <span className='text-lg border-r-2 pr-3'>{quantity}</span>
                  <button onClick={incrementQuantity} className='text-xl'>+</button>
                </div>
                <h2 className='text-lg font-normal'>Price: ₹ {selectedProduct.price}</h2>
              </div>

              <div className='mt-16'>
                <Button variant="primary" onClick={handleClick}>Add to cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;