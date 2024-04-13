import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUserId, signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom'

export default function Logout() {
    const userId = useSelector(selectLoggedInUserId);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(signOutAsync(userId));

    }, [])


    return (
        <>
            {!userId && <Navigate to="/login" replace={true}></Navigate>}
        </>
    )
}
