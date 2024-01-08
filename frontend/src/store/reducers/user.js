import { USER_LOGIN, USER_TEST, USER_LOGOUT, USER_SIGNUP } from "../actions/actionTypes";

const userLocalStorage = JSON.parse(localStorage.getItem("user"));

const initialState = userLocalStorage
  ? {
      user: userLocalStorage,
      loading: false,
      error: null,
    }
  : {
      user: null,
      loading: false,
      error: null,
    };

export default function reducerUser(state = initialState, action) {
  // console.log('reducer USER');
  switch (action.type) {
    case USER_TEST:
      // const { user } = action.payload;
      // console.log('reducer USER case payload', action.payload);
      return { ...state };
    case USER_LOGIN:
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case USER_LOGOUT:
      //
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("reservations");
      return {...state, user: null};
    case USER_SIGNUP:
      if (action.payload.access_token) {
        alert('Усешная регистрация пользователя');
      }
      return state;
    default:
      // console.log("reducer USER default");
      return state;
  }
}
