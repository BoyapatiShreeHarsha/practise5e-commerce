import './App.css'
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProductDetailsPage from './pages/ProductDetailsPage'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Protected from './features/auth/components/Protected';
import { selectLoggedInUserId } from './features/auth/authSlice';
import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/PageNotFound';
import OrderSuccess from './pages/OrderSuccess';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchUserDataAsync } from './features/user/userSlice';

function App() {

  const user = useSelector(selectLoggedInUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user));
      dispatch(fetchUserDataAsync(user));
    }
  }, [dispatch, user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/cart' element={<Protected><CartPage /></Protected>} />
        <Route path='/checkout' element={<Protected><Checkout /></Protected>} />
        <Route path='/product-details/:id' element={<Protected><ProductDetailsPage /></Protected>} />
        <Route path='/order-succes/:id' element={<Protected><OrderSuccess /></Protected>} />
        <Route path='/user-orders' element={<Protected><UserOrdersPage /></Protected>} />
        <Route path='/user-profile' element={<Protected><UserProfilePage /></Protected>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
