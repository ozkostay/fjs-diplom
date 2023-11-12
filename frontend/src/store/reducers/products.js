import {
  LIST_CATALOG_REQUEST,
  LIST_CATALOG_SUCCESS,
  LIST_CATALOG_ERROR,
  SET_OFFSET,
  SET_FINDSTRING,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  offset: 0,
  findString: "",
};

export default function productsReducer(state = initialState, action) {
  // console.log('reduser ',action.type);
  switch (action.type) {
    case LIST_CATALOG_REQUEST:
      return { ...state, loading: true, error: null };
    case LIST_CATALOG_SUCCESS:
      const { products } = action.payload;
      return { ...state, products, product: {}, loading: false, error: null };
    case LIST_CATALOG_ERROR:
      return { ...state, loading: false, error: true };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FINDSTRING:
      return { ...state, findString: action.payload };
    case PRODUCT_REQUEST:
      // console.log('reduser QUERY');
      return { ...state, loading: true, error: null };
    case PRODUCT_SUCCESS:
      const { product } = action.payload;
      return { ...state, product, loading: false, error: null };
    case PRODUCT_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
