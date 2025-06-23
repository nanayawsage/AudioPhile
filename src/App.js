import './App.css';
import { Routes, Route } from "react-router-dom";
import { CartProvider } from './components/CartContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Headphones from './components/Headphones';
import Speakers from './components/Speakers';
import Earphones from './components/Earphones';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Headphones" element={<Headphones />} />
        <Route path="/Speakers" element={<Speakers />} />
        <Route path="/Earphones" element={<Earphones />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;