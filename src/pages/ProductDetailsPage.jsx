import React from 'react'
import ProductDetails from '../features/product/components/ProductDetails'
import { useSelector } from 'react-redux';
import { selectCurrUser } from '../features/user/userSlice';
import AdminProductDetails from '../features/admin/components/AdminProductDetails';


export default function ProductDetailsPage() {
    const userData = useSelector(selectCurrUser);
    return (
        <>
            {userData.role === 'user' && <ProductDetails />}
            {userData.role === 'admin' && <AdminProductDetails />}
        </>
    )
}
