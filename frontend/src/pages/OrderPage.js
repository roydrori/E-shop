import { useContext, useEffect, useReducer } from "react";
import { Loading, MessageBox, Store, axios, useNavigate, useParams } from "../Imports";
import { Action } from "@remix-run/router";

const reducer = (state, {type, payload}) => {
switch(type){
    case 'GET_REQUEST': {
        return {...state, loading: true, error: ''}
    }
    case 'GET_SUCCESS': {
        return {...state, loading: false, error: '', order: payload}
    }
    case 'GET_FAIL': {
        return {...state, loading:false, error: payload}
    }
    default:
        return state;
}
}

function OrderPage() {

    const {state: {userInfo}} = useContext(Store)
    const params = useParams();
    const{id: orderId} = params;
    const [{loading, error, order}, dispatch] = useReducer(reducer, {loading: true, error: '', order: {}});  
    const navigate = useNavigate();


    useEffect(() => {
        // const getOrder = async() => {
        //     try{
        //         const data = await axios.get(`/api/v1/orders/${orderId}`, {headers: });
                
        //     }
        //     catch(err){

        //     }
        // }

        if(!userInfo){
            navigate('/login')
        }
        if(!order._id || (order._id && orderId !== params)){
            // getOrder();
        }
    },[navigate, userInfo])

    return loading? (<Loading/>):error ? (<MessageBox variant='danger'>{error}</MessageBox>) :(
        <div>
            <title>Order</title>
        </div>
    )
}
export default OrderPage;