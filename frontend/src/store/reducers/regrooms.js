import {
  REG_LIST,
  REG_ADD,
  REG_DELETE,
  REG_LOCAL_CLEAR,
} from "../actions/actionTypes";

// const tempReservationLocalStorage = localStorage.getItem("reservations");
// const reservationsLocalStorage = tempReservationLocalStorage ? JSON.parse(
//   tempReservationLocalStorage) : tempReservationLocalStorage;

// const initialState = reservationsLocalStorage
//   ? {
//       regRooms: reservationsLocalStorage,
//       addRegRooms: false,
//       loading: false,
//       error: null,
//     }
//   : {
//       regRooms: null,
//       addRegRooms: false,
//       loading: false,
//       error: null,
//     };
const initialState = {
  regRooms: null,
  addRegRooms: false,
  loading: false,
  error: null,
};

export default function reducerRegRooms(state = initialState, action) {
  // console.log("reducer REGROOMS", action);
  switch (action.type) {
    case REG_LIST:
      // console.log("REDUCER REG LIST", action.payload);
      if (typeof action.payload === "string") {
        return {
          ...state,
          loading: false,
          error: null,
        };
      }
      localStorage.setItem("reservations", JSON.stringify(action.payload));
      return {
        ...state,
        regRooms: action.payload,
        addRegRooms: false,
        loading: false,
        error: null,
      };
    case REG_ADD:
      console.log("REDUCER REG ADD", action.payload);
      if (!action.payload) {
        break;
      }
      return {
        ...state,
        addRegRooms: true,
        loading: false,
        error: null,
      };
    case REG_DELETE:
      console.log("REDUCER REGROOMS DELETE", action.payload);
      return {
        ...state,
        addRegRooms: true,
        loading: false,
        error: null,
      };
    case REG_LOCAL_CLEAR:
      console.log("REDUCER REG CLEAR");
      return {
        ...state,
        regRooms: [],
        loading: false,
        error: null,
      };
    default:
      // console.log("reducer HOTELS default");
      return state;
  }
}
