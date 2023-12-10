import { HOTELS_LIST, HOTELS_DELETE } from "../actions/actionTypes";

const initialState = {
  hotels: [],
  loading: false,
  error: null,
};

export default function reducerHotelsList(state = initialState, action) {
  console.log("reducer HOTELS", action);
  switch (action.type) {
    case HOTELS_LIST:
      console.log('REDUCER USER LIST', action.payload);
      return {
        ...state,
        hotels: action.payload,
        loading: false,
        error: null,
      };
    case HOTELS_DELETE:
      const tempHOTELS = state.hotels.filter((i) => i._id !== action.payload);
      console.log('action.payload', action.payload);
      return {
        ...state,
        hotels: tempHOTELS,
        loading: false,
        error: null,
      };
    default:
      console.log("reducer HOTELS default");
      return state;
  }
}
