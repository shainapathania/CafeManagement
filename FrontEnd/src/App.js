// import logo from './logo.svg';
import "./App.css";
import AddFood from "./Components/Cafe/AddProduct";
import foodCard from "./Components/Cafe/foodCard";
import Login from "./Components/Home/login";
import NavbarAdmin from "./Components/Admin/NavbarAdmin";
import AdminRegister from "./Components/Admin/AdminRegister";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "./Components/Admin/Admin";
import HomeNavbar from "./Components/Home/HomeNavbar";


import AllCategories from "./Components/Admin/AllCategories";
import AboutUs from "./Components/AboutUs/AboutUs";

import CustomerNavbar from "./Components/customer/CustomerNavbar";
import MyCart from "./Components/customer/MyCart";
import MyOrder from "./Components/customer/MyOrder";
import CafeNavbar from "./Components/Cafe/CafeNavbar";
import CafeOrder from "./Components/Cafe/CafeOrder";
import AllCafe from "./Components/Admin/AllCafe";
import CustomerLogin from "./Components/Home/CustomerLogin";
import CafeLogin from "./Components/Home/CafeLogin";
import AdminLogin from "./Components/Home/AdminLogin";
import AddCategory from "./Components/Admin/AddCategory";
import ContactUs from "./Components/ContactUs/ContactUs";
import HomePage from "./Components/Home/HomePage/HomePage";
import ViewMyItems from "./Components/Cafe/viewMyItem";
import CafeLogout from "./Components/Home/CafeLogout";
import RegistrationForm from "./Components/Home/RegistrationForm";
import AddressForm from "./Components/Home/AddressForm";
import CustomerDashboard from "./Components/customer/CustomerDashboard";
import ProductDetails from "./Components/Cafe/ProductDetails";
import Payment from "./Components/customer/Payment";
import Protected from "./Components/login/protected";

function App() {
  return (
    

    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<Protected Component={AboutUs} />} />
       
        {/* <Route path="/aboutUs" element={<AboutUs />} /> */}
        <Route path="/contactUs" element={<ContactUs />} />

        <Route path="/registrationForm" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/product/details" element={< Protected Component={ProductDetails}/>} />
      </Routes>

      <Routes>
        <Route path="/customer/dashboard" element={< Protected Component={CustomerDashboard}/>} />
        <Route path="/myCart" element={<Protected Component={MyCart} />} />
        <Route path="/myOrder" element={<Protected Component={MyOrder} />} />
        <Route path="/AddressForm" element={<Protected Component={AddressForm} />} />
        <Route path="/customer/payment" element={<Protected Component={Payment}/>} />
        <Route path="/productdetails/:productId" element={<ProductDetails/>}/>

      </Routes>
      <Routes>
        <Route path="/cafe/dashboard" element={<Protected Component={CafeNavbar} />} />
        <Route path="/reastuarantOrder" element={<Protected Component={CafeOrder} />} />
        <Route path="/addFood" element={<Protected Component={AddFood} />} />
        <Route path="/viewMyItems" element={<Protected Component={ViewMyItems} />} />
      </Routes>
      <Routes>
        <Route path="/admin/dashboard" element={<Protected Component={NavbarAdmin} />} />
        <Route path="/addCategory" element={<Protected Component={AddCategory} />} />

        <Route path="/allCatrgories" element={<Protected Component={AllCategories} />} />
        <Route path="/allCafes" element={<Protected Component={AllCafe} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


