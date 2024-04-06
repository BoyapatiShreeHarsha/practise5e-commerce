import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories, fetchAllProducts, fetchProduct, fetchProductsByFilters } from './productAPI';

const initialState = {
    products: [],
    categories: [],
    brands: [],
    status: 'idle',
    totalItems: 0,
    product: {},
};

export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
        const response = await fetchAllProducts();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({ filterState, sortState, pageState }) => {
        const response = await fetchProductsByFilters(filterState, sortState, pageState);
        return response.data;
    }
)

export const fetchAllCategoriesAsync = createAsyncThunk(
    'product/fetchAllCategories',
    async () => {
        const response = await fetchAllCategories();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchAllBrandsAsync = createAsyncThunk(
    'product/fetchAllBrands',
    async () => {
        const response = await fetchAllBrands();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchProductAsync = createAsyncThunk(
    'product/fetchProduct',
    async ({ id }) => {
        const response = await fetchProduct(id);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload.products;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(fetchAllCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories = action.payload;
            })
            .addCase(fetchAllBrandsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands = action.payload;
            })
            .addCase(fetchProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.product = action.payload;
            });
    },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProduct = (state) => state.product.product;

export default productSlice.reducer;
