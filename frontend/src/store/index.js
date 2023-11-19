import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";
// import productsReducer from "./reducers/products";
// import categoriesReducer from "./reducers/categories";
// import hitsReducer from "./reducers/hits";
// import cartReducer from './reducers/cart';
import reducerUser from "./reducers/user";

const reducer = combineReducers({
  // products: productsReducer,
  // categories: categoriesReducer,
  // hits: hitsReducer,
  // cart: cartReducer,
  crUser: reducerUser,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

export default store;
