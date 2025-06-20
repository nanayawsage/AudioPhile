import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Headphones from './components/Headphones';
import Speakers from './components/Speakers';
import Earphones from './components/Earphones';
import Cart from './components/Cart';


function App() {
  return (
    <>

    
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Headphones" element={<Headphones />} />
        <Route path="/Speakers" element={<Speakers />} />
        <Route path="/Earphones" element={<Earphones />} />
        <Route path="Cart" element={<Cart />} />

      </Routes>
  
    

    </>
   
  
  )
}

export default App;
