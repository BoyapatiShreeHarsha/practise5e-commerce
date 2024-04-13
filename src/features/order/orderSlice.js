import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder } from './orderAPI';

const initialState = {
    orders: [],
    totalPages: 0,
    totalItems: 0,
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

export const fetchAllOrdersAsync = createAsyncThunk(
    'cart/fetchAllOrders',
    async (obj) => {
        const response = await fetchAllOrders(obj);
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);

export const updateOrderAsync = createAsyncThunk(
    'cart/updateOrder',
    async (obj) => {
        const response = await updateOrder(obj);
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
            })
            .addCase(fetchAllOrdersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(updateOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders = state.orders.map((order) => {
                    if (order.id === action.payload.id) {
                        order = action.payload;
                    }
                    return order;
                });
                state.currentOrder = action.payload;
            })
    },
});

// export const selectCartItems = (state) => state.cart.items;

export const CurrentOrder = (state) => state.order.currentOrder;

export const allOrders = (state) => state.order.orders;
export const orderTotalPages = (state) => state.order.totalPages;
export const orderTotalItems = (state) => state.order.totalItems;

export const { resetCurrOrder } = orderSlice.actions;

export default orderSlice.reducer;
