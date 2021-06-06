import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer( reducer,initialState);

  useEffect(() => {
    fetchData();
    return () => {
    }
  }, []);

  useEffect(() => {
    dispatch({type: 'GET_TOTAL'});
    return () => {
    }
  }, [state.cart])

  const clearCart = () =>{
    dispatch({type: 'CLEAR_CART'});
  }

  const remove = (id) =>{
    dispatch({type:'REMOVE', payload:id})
  }

  const increase = (id) =>{
    dispatch({type:'INC', payload:id});
  }

  const decrease= (id) =>{
    dispatch({type:'DEC', payload:id})
  }

  const fetchData = async () =>{
    dispatch({type: 'LOAD'});
    const cart = await fetch(url).then((data)=>data.json());
    console.table(cart);
    dispatch({type:'DISPLAY', payload: cart});
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
