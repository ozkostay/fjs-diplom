import {
  CART_TOTALCOST,
  CART_ORDER,
  ADD_CART_SUCCESS,
  DELETE_CART_SUCCESS,
} from "../actions/actionTypes";

const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
// console.log('cartLocalStorage', cartLocalStorage);

const initialState = cartLocalStorage
  ? cartLocalStorage
  : {
      cart: [],
      totalCost: 0,
      order: null,
    };

// console.log('initialState', initialState);

export default function cartReducer(state = initialState, action) {
  // console.log("CART reduser ", action.type);
  switch (action.type) {
    case ADD_CART_SUCCESS:
      // console.log("REDUSER ADD CART", action.payload);
      const cart = action.payload;
      return { ...state, cart, loading: false, error: null };
    case DELETE_CART_SUCCESS:
      // console.log("del cart", action.payload.id);
      return {
        ...state,
        cart: cart.filter((item) => item.id !== action.payload.id),
      };
    case CART_TOTALCOST:
      // console.log('CART_TOTALCOST', action.payload.sum);
      return { ...state, totalCost: action.payload.sum };
    case CART_ORDER:
      // console.log("RED CART_ORDER", action.payload);
      const order = action.payload;
      return { ...state, order };
    default:
      // console.log("CART reduser DEFAULT", state);
      return state;
  }
}

// order = {
//   Product: product,
//   size: activeSize[0].size,
//   quantity: quantity,
//   price: product.price
// }
