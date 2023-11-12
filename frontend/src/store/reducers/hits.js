import { HITS_REQUEST, HITS_SUCCESS, HITS_ERROR } from "../actions/actionTypes";

const initialState = {
  hits: [],
  loading: false,
  error: null,
};

export default function hitsReducer(state = initialState, action) {
  switch (action.type) {
    case HITS_REQUEST:
      return { ...state, loading: true, error: null };
    case HITS_SUCCESS:
      const { hits } = action.payload;
      return { ...state, hits, loading: false, error: null };
    case HITS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
