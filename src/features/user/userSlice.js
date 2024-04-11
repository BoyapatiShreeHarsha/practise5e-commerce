import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrdersById } from './userAPI';

const initialState = {
    userOrders: [],
    status: 'idle',
};


export const fetchUserOrdersByIdAsync = createAsyncThunk(
    'auth/fetchUserOrdersById',
    async (userData) => {
        const response = await fetchUserOrdersById(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrdersByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserOrdersByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userOrders = action.payload;
            });
    },
});


export const selectUserOrders = (state) => state.user.userOrders;


export default userSlice.reducer;