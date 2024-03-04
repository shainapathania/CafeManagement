import React from 'react';
import './HomePage.css'; // Import a CSS file for styling

import SearchBar from './SearchBar';


import Footer from "../Footerr/Footerr/Footerr"
import HomeNavbar from '../HomeNavbar';
import ProductCard from './Cards/ProductCard';


const HomePage = () => {
  return (
    <>
    <HomeNavbar />
    <div className="homePageContainer">
      {/* Static content on the left side */}
      <div className="leftContent">
        <h1 className="enlargedBlueText">Take a cup and forget about everything for a few minutes.</h1>
        <p className="simple">Get Your Coffee Online Today..</p>
      </div>

      {/* Picture on the right side */}
      <div className="rightContent imgHome">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/coffee-shop-receiving-online-order-5507850-4608589.png?f=webp"
          alt="Sample"
          className="image"
        />
      </div>

      {/* Footer with a form and search button */}
      {/* <div className="footer"> */}
        </div>
        {/* <SearchBar/> */}
      {/* </div> */}
    
        {/* <ProductCard/> */}
        <SearchBar/>
        <Footer />
    </>
  );
};

export default HomePage;
