import React, { useContext, useEffect, useReducer, useState } from 'react'
import OrderHistory from '../components/OrderHistory';
import {Loading, MessageBox} from '../Imports';

import { Store, axios, getError, toast, Helmet } from '../Imports';


const reducer = (state, { type, payload }) => {
    switch (type) {
        case "CREATE_REQUEST":
            return { ...state, loading: true, error: '', allOrders: [] };
        case "CREATE_SUCCEEDED":
            return { ...state, loading: false, error: '', allOrders: payload };
        case "CREATE_FAILED":
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};

const HistoryOrderPage = () => {
    const [{ loading, allOrders, error }, dispatch] = useReducer(reducer, {
        loading: true,
        allOrders: null,
        error: ''
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: "CREATE_REQUEST" })
                const { data } = await axios.get(`api/v1/orders/history/${userInfo._id}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: "CREATE_SUCCEEDED", payload: data })
            } catch (error) {
                dispatch({ type: "CREATE_FAILED", payload: error })
                // toast.error(getError(error));
            }
        };

        fetchOrders();
    }, [userInfo]);

    return (
        loading ? (
            <Loading />
        ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
            <div>
                <Helmet>
                    <title>Order History</title>
                </Helmet>
                <h1>All Orders</h1>
                {allOrders.map((order) => (
                    <div key={order._id}>
                        <OrderHistory order={order} />
                    </div>
                ))}
            </div>
        )
    );
}

export default HistoryOrderPage