import { takeLatest, spawn } from "redux-saga/effects";
import {
  USER_LOGIN,
  USER_SIGNUP,
  USERS_LIST,
  USERS_DELETE,
} from "../actions/actionTypes";
// workers;
import WorkerUserLoginSearch from "./workers/WorkerUserLoginSearch";
import WorkerUserSignup from "./workers/WorkerUserSignup";
import WorkerUsersList from "./workers/WorkerUsersList";
import WorkerUsersDelete from "./workers/WorkerUsersDelete";

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

export default function* saga() {
  yield spawn(watchUserLogin);
  yield spawn(watchUserSignup);
  yield spawn(watchUsersList);
  yield spawn(watchUsersDelete);
}
