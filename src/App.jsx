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
import Protected from './features/auth/components/Protected';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/cart' element={<Protected><CartPage /></Protected>} />
        <Route path='/checkout' element={<Protected><Checkout /></Protected>} />
        <Route path='/product-details/:id' element={<Protected><ProductDetailsPage /></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
