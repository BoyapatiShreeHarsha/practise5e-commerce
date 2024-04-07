import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from "../features/cart/cartSlice";
import orderReducer from '../features/order/orderSlice';

const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer
    },
});

export default store;
