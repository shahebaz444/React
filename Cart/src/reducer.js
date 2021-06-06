
const reducer = (state, action) =>{

    if(action.type === 'LOAD'){
        return {...state, loading:true}
    }
    else if(action.type === 'DISPLAY'){
        return {...state, cart: action.payload, loading:false};
    }
    else if(action.type === 'CLEAR_CART')
    {
        return {...state, cart:[]}
    }
    else if(action.type === 'REMOVE'){
        return {...state, cart:state.cart.filter((item) => item.id !== action.payload)}
    }
    else if(action.type === 'INC'){
        return {...state,
             cart: state.cart.map((item)=>{
                 if(item.id === action.payload){
                    return {...item, amount: item.amount+1} 
                 }
                 return item;
             })}
    }
    else if(action.type === 'DEC'){
        return {...state,
            cart: state.cart.map((item)=>{
                if(item.id === action.payload){
                    return {...item, amount: item.amount-1} 
                }
                return item;
            }).filter((item)=>item.amount>0)}
    }
    else if(action.type ==='GET_TOTAL'){
        let {total, amount} = state.cart.reduce((cartTotal, cartItem)=>{
            const {price, amount} = cartItem;
            cartTotal.total += price*amount;
            cartTotal.amount +=amount;
            return cartTotal;
        },{total: 0, amount: 0});
        total = parseFloat(total.toFixed(2));
        return {...state, total, amount};
    }
    throw new Error('no matching type');
}

export default reducer;