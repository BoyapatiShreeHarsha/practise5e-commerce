import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemsByUserId, updateCart } from './cartAPI';


const initialState = {
    items: [],
    itemsTotal: 0,
    status: 'idle'
};

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (ItemsData) => {
        const response = await addToCart(ItemsData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async (userId) => {
        const response = await fetchItemsByUserId(userId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (ItemData) => {
        const response = await updateCart(ItemData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (ItemId) => {
        const response = await deleteItemFromCart(ItemId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
                state.itemsTotal = state.items.length;
            })
            .addCase(fetchItemsByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
                state.itemsTotal = action.payload.length;
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                let index = state.items.findIndex((item) => item.id === action.payload.id);
                state.items[index] = action.payload;
            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.itemsTotal = state.items.length;
            });
    },
});

export const selectCartItems = (state) => state.cart.items;

export const selectTotalCartItems = (state) => state.cart.itemsTotal;

export default cartSlice.reducer;