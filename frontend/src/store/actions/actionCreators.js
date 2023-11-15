import {
  USER_TEST,

  // HITS_REQUEST,
  // HITS_SUCCESS,
  // HITS_ERROR,
  // CATEGORIES_REQUEST,
  // CATEGORIES_SUCCESS,
  // CATEGORIES_ERROR,
  // CHANGE_CURRENT_CATEGORY,
  // LIST_CATALOG_REQUEST,
  // LIST_CATALOG_SUCCESS,
  // LIST_CATALOG_ERROR,
  // SET_OFFSET,
  // SET_FINDSTRING,
  // PRODUCT_REQUEST,
  // PRODUCT_SUCCESS,
  // PRODUCT_ERROR,
  // CART_TOTALCOST,
  // CART_ORDER,
  // // ADD_CART_REQUEST,
  // ADD_CART_SUCCESS,
  // // ADD_CART_ERROR,
  // // DELETE_CART_REQUEST,
  // DELETE_CART_SUCCESS,
  // // DELETE_CART_ERROR,
  // ORDER_REQUEST,
  // ORDER_SUCCESS,
  // ORDER_ERROR,
} from "./actionTypes";

export function actionUserTest(user) {
  console.log('actionCreater param', user)
  return { type: USER_TEST, payload: { user } };
}
// ===========================
export function hitsRequest(param) {
  return { type: HITS_REQUEST, payload: { param } };
}
export function hitsSuccess(hits) {
  return { type: HITS_SUCCESS, payload: { hits } };
}
export function hitsError() {
  return { type: HITS_ERROR, payload: {} };
}
export function categoriesRequest(param) {
  return { type: CATEGORIES_REQUEST, payload: { param } };
}
export function categoriesSuccess(categories) {
  return { type: CATEGORIES_SUCCESS, payload: { categories } };
}
export function categoriesError() {
  return { type: CATEGORIES_ERROR, payload: {} };
}
export function changCurrentCategory(id) {
  return { type: CHANGE_CURRENT_CATEGORY, payload: id };
}
export function listProductsRequest(param) {
  return { type: LIST_CATALOG_REQUEST, payload: { param } };
}
export function listProductsSuccess(products) {
  return { type: LIST_CATALOG_SUCCESS, payload: { products } };
}
export function listProductsError() {
  return { type: LIST_CATALOG_ERROR, payload: {} };
}
export function setOffset(num) {
  return { type: SET_OFFSET, payload: num };
}
export function setFindString(findString) {
  return { type: SET_FINDSTRING, payload: findString };
}
export function productRequest(param) {
  // console.log("action REQUEST param", param);
  return { type: PRODUCT_REQUEST, payload: { param } };
}
export function productSuccess(product) {
  // console.log("action SUCCESS param", product);
  return { type: PRODUCT_SUCCESS, payload: { product } };
}
export function productError() {
  // console.log("action ERROR param");
  return { type: PRODUCT_ERROR, payload: {} };
}

export function addCartSuccess(cart) {
  // console.log("ACTION ADD CART", cart);
  return { type: ADD_CART_SUCCESS, payload: cart };
}
export function deleteCartSuccess(id) {
  //console.log("ACTION DELETE CART", id);
  return { type: DELETE_CART_SUCCESS, payload: { id } };
}
export function cartTotal(sum) {
  //console.log("CART_TOTALCOST", sum);
  return { type: CART_TOTALCOST, payload: { sum } };
}
export function cartOrder(order) {
  // console.log("CART_ORDER", order);
  return { type: CART_ORDER, payload: order };
}

export function orderRequest(order) {
  // console.log("action REQUEST param", param);
  return { type: ORDER_REQUEST, payload: { order } };
}
export function orderSuccess(ok) {
  // console.log("action SUCCESS param", product);
  return { type: ORDER_SUCCESS, payload: { ok } };
}
export function orderError() {
  // console.log("action ERROR param");
  return { type: ORDER_ERROR, payload: {} };
}
