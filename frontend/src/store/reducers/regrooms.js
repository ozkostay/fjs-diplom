import {
  REG_LIST,
  REG_ADD,
  REG_DELETE,
  REG_LOCAL_CLEAR,
} from "../actions/actionTypes";

const reservationsLocalStorage = JSON.parse(
  localStorage.getItem("reservations")
);

const initialState = reservationsLocalStorage
  ? {
      regRooms: reservationsLocalStorage,
      loading: false,
      error: null,
    }
  : {
      regRooms: [],
      loading: false,
      error: null,
    };

export default function reducerRegRooms(state = initialState, action) {
  console.log("reducer REGROOMS", action);
  switch (action.type) {
    case REG_LIST:
      console.log("REDUCER REG LIST", action.payload);
      return {
        ...state,
        regRooms: action.payload,
        loading: false,
        error: null,
      };
    case REG_ADD:
      console.log("REDUCER REG ADD", action.payload);
      if (!action.payload) {
        break;
      }
      const tempState = [
        ...state.regRooms,
        action.payload ? action.payload : null,
      ];
      localStorage.setItem("reservations", JSON.stringify(tempState));
      return {
        ...state,
        regRooms: tempState,
        loading: false,
        error: null,
      };
    case REG_DELETE:
      const tempRegs = state.hotregRoomsels.filter(
        (i) => i._id !== action.payload
      );
      console.log("REDUCER REG DELETE", action.payload);
      return {
        ...state,
        regRooms: tempRegs,
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
