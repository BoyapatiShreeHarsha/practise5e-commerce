import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
    orders: [],
    status: 'idle',
    currentOrder: null,
};


export const createOrderAsync = createAsyncThunk(
    'cart/createOrder',
    async (OrderData) => {
        const response = await createOrder(OrderData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        resetCurrOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders.push(action.payload);
                state.currentOrder = action.payload;
            });
    },
});

// export const selectCartItems = (state) => state.cart.items;

export const CurrentOrder = (state) => state.order.currentOrder;

export const { resetCurrOrder } = orderSlice.actions;

export default orderSlice.reducer;
