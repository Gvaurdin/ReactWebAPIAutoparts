import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router>
      <div className="container"> 
        <Header />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path='/product' element={<AddProduct/>} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
