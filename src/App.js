import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Headphones from './components/Headphones';


function App() {
  return (
    <div>
      
   
    
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="Headphones" element={<Headphones />} />





        



      </Routes>
  
    

    </div>
   
  
  )
}

export default App;
