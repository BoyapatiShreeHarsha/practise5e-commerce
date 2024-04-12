import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserData, fetchUserOrdersById, updateUser } from './userAPI';

const initialState = {
    userInfo: null,
    userOrders: [],
    status: 'idle',
};


export const fetchUserOrdersByIdAsync = createAsyncThunk(
    'user/fetchUserOrdersById',
    async (userData) => {
        const response = await fetchUserOrdersById(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchUserDataAsync = createAsyncThunk(
    'user/fetchUserData',
    async (userId) => {
        const response = await fetchUserData(userId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (userData) => {
        const response = await updateUser(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
)


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
            })
            .addCase(fetchUserDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            })
    },
});


export const selectUserOrders = (state) => state.user.userOrders;

export const selectCurrUser = (state) => state.user.userInfo;


export default userSlice.reducer;