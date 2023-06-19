import { createContext, useReducer } from 'react';
import { USER_SIGNIN, USER_SIGNOUT } from './action';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
        
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'REMOVE_FROM_CART': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CLEAR_CART' :{
      return {...state, cart: {...state.cart, cartItems :[]} }
    }

    case 'SAVE_SHIPPING_ADDRESS' : {
      return {...state, cart: {...state.cart, shippingAdress: action.payload} }
    }
    case 'SAVE_PAYMENT_METHOD': {
      return{...state, cart:{...state.cart, paymentMethod: action.payload} };
    }
    
    case 'REORDER_CART_ITEMS': {
      if (!action.payload.destination) {
        return state;
      }
      const { source, destination } = action.payload;
      const newCartItems = Array.from(state.cart.cartItems);
      const [reorderedItem] = newCartItems.splice(source.index, 1);
      newCartItems.splice(destination.index, 0, reorderedItem);
      return {
        ...state,
        cart: { ...state.cart, cartItems: newCartItems },
      };
    }

    case 'USER_SIGNUP':{
      return{...state,  }
    }
    case USER_SIGNIN:{
      return {...state, userInfo: action.payload}
    }
    case USER_SIGNOUT:{
      return {...state, userInfo : null, cart : {cartItems: [] , shippingAddress: {}, paymentMethod:''}}
    }
    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
