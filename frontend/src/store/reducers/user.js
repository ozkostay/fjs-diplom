import {
  USER_LOGIN,
  USER_TEST,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_ERROR,
} from "../actions/actionTypes";

const userLocalStorage = JSON.parse(localStorage.getItem("user"));

const initialState = userLocalStorage
  ? {
      user: userLocalStorage,
      userLoading: false,
      userError: null,
    }
  : {
      user: null,
      userLoading: false,
      userError: null,
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
        userLoading: false,
        userError: null,
      };

    case USER_LOGOUT:
      //
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("reservations");
      return { ...state, user: null };

    case USER_SIGNUP:
      if (action.payload.access_token) {
        alert("Усешная регистрация пользователя");
      }
      return state;

    case USER_ERROR:
      console.log("reducer USER_ERROR action.payload", action.payload);
      let userError = {
        type: action.payload.statusCode > 399 ? 'err' : 'mess',
        text: `ERROR: ${action.payload.statusCode}. ${action.payload.message}`,
      };
      
      if (!action.payload.message.trim()) {
        console.log('77777', userError);
        userError = null;
      }

      return {
        ...state,
        user: null,
        userLoading: false,
        userError,
      };
    default:
      // console.log("reducer USER default");
      return state;
  }
}
