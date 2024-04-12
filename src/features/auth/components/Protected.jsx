import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserId } from '../authSlice';

export default function Protected({ children }) {

    const user = useSelector(selectLoggedInUserId);
    if (!user) {
        return <Navigate to='/login' replace={true}></Navigate>
    }

    return children;
}
