import { HOTELS_LIST, HOTELS_DELETE, HOTELS_PICS } from "../actions/actionTypes";

const initialState = {
  hotels: [],
  loading: false,
  error: null,
  hotelsPics: [],
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
      break;
    case HOTELS_DELETE:
      const tempHOTELS = state.hotels.filter((i) => i._id !== action.payload);
      console.log('action.payload', action.payload);
      return {
        ...state,
        hotels: tempHOTELS,
        loading: false,
        error: null,
      };
      break;
      case HOTELS_PICS:
      //const tempHOTELS = state.hotels.filter((i) => i._id !== action.payload);
      console.log('HOTES-PICS action.payload', action.payload);
      return {
        ...state,
        hotelsPics: action.payload,
        loading: false,
        error: null,
      };
      break;
    default:
      console.log("reducer HOTELS default");
      return state;
  }
}
