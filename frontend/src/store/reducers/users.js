import { USERS_LIST } from "../actions/actionTypes";

const initialState = {
      users: [],
      loading: false,
      error: null,
    };

export default function reducerUser(state = initialState, action) {
  console.log('reducer USERS', action);
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    default:
      console.log("reducer USERS default");
      return state;
  }
}
