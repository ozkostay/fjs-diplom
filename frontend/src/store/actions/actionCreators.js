import {
  USER_TEST,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
  USERS_LIST,
  USERS_DELETE,
  HOTELS_LIST,
  HOTELS_DELETE,
} from "./actionTypes";

export function actionUserTest(user) {
  console.log('actionCreater param', user)
  return { type: USER_TEST, payload: { user } };
}
export function actUserLogin(payload) {
  console.log('actionCreater payoad', payload)
  return { type: USER_LOGIN, payload: payload };
}
export function actUserLogout() {
  // console.log('actionCreater payoad', payload)
  return { type: USER_LOGOUT, payload: {}} ;
}
export function actUserSignup(payload) {
  // console.log('actionCreater SIGNUP payoad', payload)
  return { type: USER_SIGNUP, payload: payload} ;
}
export function actUsersList(payload) {
  console.log('actionCreater USERSLIST payoad', payload)
  return { type: USERS_LIST, payload: payload} ;
}
export function actUsersDelete(id) {
  console.log('actionCreater USERSDELETE id', id)
  return { type: USERS_DELETE, payload: id} ;
}
export function actHotelsList(payload) {
  console.log('actionCreater HOTELSLIST payoad', payload)
  return { type: HOTELS_LIST, payload: payload} ;
}
export function actHotelsDelete(id) {
  console.log('actionCreater HOTELSDELETE id', id)
  return { type: HOTELS_DELETE, payload: id} ;
}

// ===========================
// export function hitsRequest(param) {
//   return { type: HITS_REQUEST, payload: { param } };
// }
// export function hitsSuccess(hits) {
//   return { type: HITS_SUCCESS, payload: { hits } };
// }
// export function hitsError() {
//   return { type: HITS_ERROR, payload: {} };
// }
// export function categoriesRequest(param) {
//   return { type: CATEGORIES_REQUEST, payload: { param } };
// }
// export function categoriesSuccess(categories) {
//   return { type: CATEGORIES_SUCCESS, payload: { categories } };
// }
// export function categoriesError() {
//   return { type: CATEGORIES_ERROR, payload: {} };
// }
// export function changCurrentCategory(id) {
//   return { type: CHANGE_CURRENT_CATEGORY, payload: id };
// }
// export function listProductsRequest(param) {
//   return { type: LIST_CATALOG_REQUEST, payload: { param } };
// }
// export function listProductsSuccess(products) {
//   return { type: LIST_CATALOG_SUCCESS, payload: { products } };
// }
// export function listProductsError() {
//   return { type: LIST_CATALOG_ERROR, payload: {} };
// }
// export function setOffset(num) {
//   return { type: SET_OFFSET, payload: num };
// }
// export function setFindString(findString) {
//   return { type: SET_FINDSTRING, payload: findString };
// }
// export function productRequest(param) {
//   // console.log("action REQUEST param", param);
//   return { type: PRODUCT_REQUEST, payload: { param } };
// }
// export function productSuccess(product) {
//   // console.log("action SUCCESS param", product);
//   return { type: PRODUCT_SUCCESS, payload: { product } };
// }
// export function productError() {
//   // console.log("action ERROR param");
//   return { type: PRODUCT_ERROR, payload: {} };
// }

// export function addCartSuccess(cart) {
//   // console.log("ACTION ADD CART", cart);
//   return { type: ADD_CART_SUCCESS, payload: cart };
// }
// export function deleteCartSuccess(id) {
//   //console.log("ACTION DELETE CART", id);
//   return { type: DELETE_CART_SUCCESS, payload: { id } };
// }
// export function cartTotal(sum) {
//   //console.log("CART_TOTALCOST", sum);
//   return { type: CART_TOTALCOST, payload: { sum } };
// }
// export function cartOrder(order) {
//   // console.log("CART_ORDER", order);
//   return { type: CART_ORDER, payload: order };
// }

// export function orderRequest(order) {
//   // console.log("action REQUEST param", param);
//   return { type: ORDER_REQUEST, payload: { order } };
// }
// export function orderSuccess(ok) {
//   // console.log("action SUCCESS param", product);
//   return { type: ORDER_SUCCESS, payload: { ok } };
// }
// export function orderError() {
//   // console.log("action ERROR param");
//   return { type: ORDER_ERROR, payload: {} };
// }
