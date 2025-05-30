import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Header from "./FRONTEND/ADMIN/Header";

import Home from "./FRONTEND/ADMIN/Home";
import Loginpage from "./FRONTEND/ADMIN/Loginpage";
import PrivateRoute from "../BACKEND/PrivateRoute";
import CustomerList from "./FRONTEND/ADMIN/CustomerList";
import ComplainList from "./FRONTEND/ADMIN/ComplainList";
import FeedbackList from "./FRONTEND/ADMIN/FeedbackList";
import ServiceroviderList from "./FRONTEND/ADMIN/ServiceproviderList";
import Admindashboard from "./FRONTEND/ADMIN/Admindashboard";
import CategoryList from "./FRONTEND/ADMIN/CategoryList";
import SubcategoryList from "./FRONTEND/ADMIN/SubcategoryList";
import ServiceProviderList from "./FRONTEND/ADMIN/ServiceproviderList";
// servvice provider path
import Header1 from "./FRONTEND/SERVICEPROVIDER/Header1";
import Home1 from "./FRONTEND/SERVICEPROVIDER/Home1";
import Footer from "./FRONTEND/SERVICEPROVIDER/Footer";
import Layout from "./FRONTEND/SERVICEPROVIDER/Layout";
import ServiceProvider from "./FRONTEND/SERVICEPROVIDER/Serviceprovider";
import Customer from "./FRONTEND/SERVICEPROVIDER/Customer";
import Catagory from "./FRONTEND/SERVICEPROVIDER/Catagory";
import LoginPage1 from "./FRONTEND/SERVICEPROVIDER/LoginPage1";
import RegistrationPage from "./FRONTEND/SERVICEPROVIDER/RegistrationPage";
import ForgotPassword from "./FRONTEND/SERVICEPROVIDER/ForgotPassword";
import Subcatagory from "./FRONTEND/SERVICEPROVIDER/Subcatagory";
import Complain from "./FRONTEND/SERVICEPROVIDER/Complain";
import Feedback from "./FRONTEND/SERVICEPROVIDER/Feedback";
import ProductOrder from "./FRONTEND/SERVICEPROVIDER/ProductOrder";
import ServiceRequest from "./FRONTEND/SERVICEPROVIDER/ServiceRequest";

// user paths

import CusHeader from "./FRONTEND/USER/CusHeader";
import CusHome from "./FRONTEND/USER/CusHome";
import CusFooter from "./FRONTEND/USER/CusFooter";
import CusLayout from "./FRONTEND/USER/CusLayout";
import WashingM from "./FRONTEND/USER/WashingM";
import AirCon from "./FRONTEND/USER/AirCon";
import Fridge from "./FRONTEND/USER/Frigde";
import Telivision from "./FRONTEND/USER/Telivision";
import CartPage from "./FRONTEND/USER/CartPage";
import CheckOut from "./FRONTEND/USER/CheckOut";
import CusLogin from "./FRONTEND/USER/CusLogin";
import UserRegistrationPage from "./FRONTEND/USER/Userregestrationpage";
import NotFound from "./FRONTEND/USER/NotFound";
import Orders from "./FRONTEND/USER/OrderPage";
import Serviceproviderlogin from "./FRONTEND/SERVICEPROVIDER/LoginPage1";
import ProductDetails from "./FRONTEND/SERVICEPROVIDER/Product_details";
import SerComplain from "./FRONTEND/SERVICEPROVIDER/Sercomplain";
import SerFeedback from "./FRONTEND/SERVICEPROVIDER/Serfeedback";
import Mainorders from "./FRONTEND/SERVICEPROVIDER/ProductOrder";
import Cusfeedback from "./FRONTEND/USER/cusfeedback";
import Cuscomplain from "./FRONTEND/USER/cuscomplain";
import CustomerFeedbackList from "./FRONTEND/USER/FeedbackList";
import CustomercompalainList from "./FRONTEND/USER/CompainList";
import CustomerComplaintList from "./FRONTEND/USER/CompainList";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Header /> */}

      <Routes>
        {/* <Route path="/AdminDashboard" element={<Admindashboard />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="Adminpenal" element={<Loginpage />} />
        {/* private route for authentication  */}
        <Route
          path="/AdminDashboard"
          element={<PrivateRoute element={<Admindashboard />} />}
        />

        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/serviceproviderlist" element={<ServiceProviderList />} />

        <Route path="/categorylist" element={<CategoryList />} />
        <Route path="/subcategorylist" element={<SubcategoryList />} />
        <Route path="/complainlist" element={<ComplainList />} />
        <Route path="/feedbacklist" element={<FeedbackList />} />
        {/* private route for authentication  */}
        <Route
          path="/serviceproviderdash"
          element={<PrivateRoute element={<Layout />} />}
        />

        <Route path="serviceproviderdash" element={<Home1 />} />
        {/* <Route path="serviceprovider" element={<ServiceProvider />} /> */}
        <Route path="customer" element={<Customer />} />
        <Route path="catagory" element={<Catagory />} />
        <Route path="productdetails" element={<ProductDetails />} />
        <Route path="productorder" element={<ProductOrder />} />
        <Route path="servicerequest" element={<ServiceRequest />} />
        <Route path="loginpage" element={<LoginPage1 />} />
        <Route path="registrationpage" element={<RegistrationPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="subcatagory" element={<Subcatagory />} />
        <Route path="complain" element={<Complain />} />
        <Route path="serviceprovidercomplain" element={<SerComplain />} />
        <Route path="customerorders" element={<Mainorders />} />
        <Route path="serviceproviderfeedback" element={<SerFeedback />} />

        
        {/* user path */}

        <Route path="cusheader" element={<CusHeader />} />
        <Route path="cushome" element={<CusHome />} />
        <Route path="cusfooter" element={<CusFooter />} />
        <Route path="/" element={<CusLayout />} />

        <Route path="washing" element={<WashingM />} />
        <Route path="aircon" element={<AirCon />} />
        <Route path="fridge" element={<Fridge />} />

        <Route path="telivision" element={<Telivision />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="cuslogin" element={<CusLogin />} />
        <Route path="userregister" element={<UserRegistrationPage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="cusfeedback" element={<Cusfeedback />} />
        <Route path="cuscomplain" element={<Cuscomplain />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="customerfeedbacklist" element={<CustomerFeedbackList />} />

        <Route path="customercompaints" element={<CustomerComplaintList />} />
      </Routes>
      <toast/>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </>
  );
}

export default App;
