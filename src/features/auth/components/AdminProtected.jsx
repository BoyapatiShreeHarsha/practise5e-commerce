import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserId } from '../authSlice';
import { selectCurrUser } from '../../user/userSlice';

export default function Protected({ children }) {

    const user = useSelector(selectLoggedInUserId);
    const userData = useSelector(selectCurrUser);

    if (!user) {
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if (userData.role !== 'admin') {
        return <Navigate to='/' replace={true}></Navigate>
    }

    return children;
}
