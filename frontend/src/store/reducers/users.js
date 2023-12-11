import { USERS_LIST, USERS_DELETE } from "../actions/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
  isDelete: null,
};

export default function reducerUsersList(state = initialState, action) {
  console.log("reducer USERS", action);
  switch (action.type) {
    case USERS_LIST:
      console.log('REDUCER USER LIST', action.payload);
      if(action.payload.limit) {
        return state;
      }
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case USERS_DELETE:
      // const tempUsers = state.users.filter((i) => i._id !== action.payload);
      console.log('USERS DELETE action.payload', action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        isDelete: action.payload
      };
    default:
      console.log("reducer USERS default");
      return state;
  }
}
