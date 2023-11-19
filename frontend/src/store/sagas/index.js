import { takeLatest, spawn } from "redux-saga/effects";
import { USER_LOGIN, USER_SIGNUP, USERS_LIST } from "../actions/actionTypes";
// workers;
import WorkerUserLoginSearch from "./workers/WorkerUserLoginSearch";
import WorkerUserSignup from "./workers/WorkerUserSignup";
import WorkerUsersList from "./workers/WorkerUsersList";

// watchers
function* watchUserLogin() {
  yield takeLatest(USER_LOGIN, WorkerUserLoginSearch);
}
function* watchUserSignup() {
  yield takeLatest(USER_SIGNUP, WorkerUserSignup);
}
function* watchUsersList() {
  yield takeLatest(USERS_LIST, WorkerUsersList);
}

export default function* saga() {
  yield spawn(watchUserLogin);
  yield spawn(watchUserSignup);
  yield spawn(watchUsersList);
}
