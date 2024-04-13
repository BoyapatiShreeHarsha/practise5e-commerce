import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';


const initialState = {
    loggedInUserId: null,
    status: 'idle',
    error: null
};

export const createUserAsync = createAsyncThunk(
    'auth/createUser',
    async (userData) => {
        const response = await createUser(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const checkUserAsync = createAsyncThunk(
    'auth/checkUser',
    async (userData) => {
        const response = await checkUser(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const signOutAsync = createAsyncThunk(
    'auth/signOut',
    async (userId) => {
        const response = await signOut(userId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserId = action.payload;
            })
            .addCase(checkUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserId = action.payload;
            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error;
            })
            .addCase(signOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserId = null;
            });

    },
});


export const selectLoggedInUserId = (state) => state.auth.loggedInUserId;
export const selectLogInError = (state) => state.auth.error;

export default authSlice.reducer;