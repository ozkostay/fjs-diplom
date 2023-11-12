import { takeLatest, put, spawn, debounce, retry } from "redux-saga/effects";

import {
  listProductsSuccess,
  listProductsError,
  categoriesSuccess,
  categoriesError,
  hitsSuccess,
  hitsError,
  productSuccess,
  productError,
} from "../actions/actionCreators";

import {
  HITS_REQUEST,
  CATEGORIES_REQUEST,
  LIST_CATALOG_REQUEST,
  PRODUCT_REQUEST,
} from "../actions/actionTypes";

import { searchProducts } from "../api/searchProducts";
import { searchCategories } from "../api/searchCategories";
import { searchHits } from "../api/searchHits";

// worker;
function* handleSearchProductsSaga(action) {
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchProducts,
      action.payload.param
    );
    yield put(listProductsSuccess(data));
  } catch (e) {
    yield put(listProductsError(e.massage));
  }
}

function* handleSearchCategoriesSaga(action) {
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchCategories,
      action.payload.param
    );
    yield put(categoriesSuccess(data));
  } catch (e) {
    yield put(categoriesError(e.massage));
  }
}

function* handleSearchHitsSaga(action) {
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchHits,
      action.payload.param
    );
    yield put(hitsSuccess(data));
  } catch (e) {
    yield put(hitsError(e.massage));
  }
}

function* handleSearchProductSaga(action) {
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchProducts,
      action.payload.param
    );
    // console.log('SAGA DATA', data);
    yield put(productSuccess(data));
  } catch (e) {
    yield put(productError(e.massage));
  }
}

// watcher
function* watchListProductsSaga() {
  yield takeLatest(LIST_CATALOG_REQUEST, handleSearchProductsSaga);
}

function* watchCategoriesSaga() {
  yield takeLatest(CATEGORIES_REQUEST, handleSearchCategoriesSaga);
}

function* watchHitsSaga() {
  yield takeLatest(HITS_REQUEST, handleSearchHitsSaga);
}

function* watchProductSaga() {
  yield takeLatest(PRODUCT_REQUEST, handleSearchProductSaga);
}

export default function* saga() {
  yield spawn(watchListProductsSaga);
  yield spawn(watchCategoriesSaga);
  yield spawn(watchHitsSaga);
  yield spawn(watchProductSaga);
}
