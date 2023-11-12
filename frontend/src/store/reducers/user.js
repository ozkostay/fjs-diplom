import { USER_TEST } from "../actions/actionTypes";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export default function reducerUser(state = initialState, action) {
  console.log('reducer USER');
  switch (action.type) {
    case USER_TEST:
      const { user } = action.payload;
      console.log('reducer USER case payload', action.payload);
      return { ...state, user, loading: true, error: null };
    default:
      console.log('reducer USER default');
      return state;
  }
}
