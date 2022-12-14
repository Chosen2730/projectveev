import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Events from "../Pages/Events";
import Shop from "../Pages/Shop";
import Nav from "../Components/Shared/nav";
import Footer from "../Components/Shared/footer";
import Product from "../Pages/Product";
import Cart from "../Pages/Cart";
import { useSelector } from "react-redux";
import Admin from "../Pages/Admin";
import Checkout from "../Pages/Checkout";

const AppRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/events' element={<Events />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:productId/' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        {user.admin && <Route path='/admin' element={<Admin />} />}
        <Route path='*' element={<h1>Error page</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoute;
