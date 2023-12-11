import { takeLatest, spawn } from "redux-saga/effects";
import {
  USER_LOGIN,
  USER_SIGNUP,
  USERS_LIST,
  USERS_DELETE,
  HOTELS_LIST,
  HOTELS_DELETE,
  USERS_UPDATE,
} from "../actions/actionTypes";
// workers;
import WorkerUserLoginSearch from "./workers/WorkerUserLoginSearch";
import WorkerUserSignup from "./workers/WorkerUserSignup";
import WorkerUsersList from "./workers/WorkerUsersList";
import WorkerUsersDelete from "./workers/WorkerUsersDelete";
import WorkerHotelsList from "./workers/WorkerHotelsList";
import WorkerHotelsDelete from "./workers/WorkerHotelsDelete";
import WorkerUsersUpdate from "./workers/WorkerUsersUpdate";


// watchers
function* watchUserLogin() {
  yield takeLatest(USER_LOGIN, WorkerUserLoginSearch);
}
function* watchUserSignup() {
  yield takeLatest(USER_SIGNUP, WorkerUserSignup);
}
function* watchUsersList() {
  console.log('SAGA WATCHER');
  yield takeLatest(USERS_LIST, WorkerUsersList);
  console.log('SAGA WATCHER 2');
}
function* watchUsersDelete() {
  console.log('SAGA Watcher DELETE');
  yield takeLatest(USERS_DELETE, WorkerUsersDelete);
}
function* watchUsersUpdate() {
  console.log('SAGA Watcher USER UPDATE');
  yield takeLatest(USERS_UPDATE, WorkerUsersUpdate);
}
function* watchHotelsList() {
  console.log('SAGA WATCHER HOTELS LIST');
  yield takeLatest(HOTELS_LIST, WorkerHotelsList);
  console.log('SAGA WATCHER 2');
}
function* watchHotelsDelete() {
  console.log('SAGA Watcher HOTELS DELETE');
  yield takeLatest(HOTELS_DELETE, WorkerHotelsDelete);
}

export default function* saga() {
  yield spawn(watchUserLogin);
  yield spawn(watchUserSignup);
  yield spawn(watchUsersList);
  yield spawn(watchUsersDelete);
  yield spawn(watchUsersUpdate);
  yield spawn(watchHotelsList);
  yield spawn(watchHotelsDelete);
}
