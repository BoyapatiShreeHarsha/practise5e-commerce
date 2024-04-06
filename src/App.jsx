import './App.css'
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProductDetailsPage from './pages/ProductDetailsPage'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/product-details' element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
