import { takeLatest, spawn } from "redux-saga/effects";
import {
  USER_LOGIN,
  USER_SIGNUP,
  USERS_LIST,
  USERS_DELETE,
  USERS_UPDATE,
  HOTELS_LIST,
  HOTELS_ADD,
  HOTELS_DELETE,
  ROOMS_ADD,
  ROOMS_LIST,
  REG_ADD,
  
} from "../actions/actionTypes";
// workers;
import WorkerUserLoginSearch from "./workers/WorkerUserLoginSearch";
import WorkerUserSignup from "./workers/WorkerUserSignup";
import WorkerUsersList from "./workers/WorkerUsersList";
import WorkerUsersDelete from "./workers/WorkerUsersDelete";
import WorkerHotelsList from "./workers/WorkerHotelsList";
import WorkerHotelsDelete from "./workers/WorkerHotelsDelete";
import WorkerUsersUpdate from "./workers/WorkerUsersUpdate";
import WorkerHotelsAdd from "./workers/WorkerHotelAdd";
import WorkerRoomsAdd from "./workers/WorkerRoomsAdd";
import WorkerRoomsList from "./workers/WorkerRoomsList";
import WorkerRegRoomsAdd from "./workers/WorkerRegRoomAdd";


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
function* watchUsersDelete() {
  yield takeLatest(USERS_DELETE, WorkerUsersDelete);
}
function* watchUsersUpdate() {
  yield takeLatest(USERS_UPDATE, WorkerUsersUpdate);
}
function* watchHotelsList() {
  // console.log('SAGA Watcher HOTELS LIST');
  yield takeLatest(HOTELS_LIST, WorkerHotelsList);
}
function* watchHotelsDelete() {
  yield takeLatest(HOTELS_DELETE, WorkerHotelsDelete);
}
function* watchHotelsAdd() {
  yield takeLatest(HOTELS_ADD, WorkerHotelsAdd);
}
function* watchRoomsAdd() {
  yield takeLatest(ROOMS_ADD, WorkerRoomsAdd);
}
function* watchRoomsList() {
  console.log('SAGA Watcher ROOMSS LIST');
  yield takeLatest(ROOMS_LIST, WorkerRoomsList);
}

function* watchRegRoomsAdd() {
  console.log('SAGA Watcher REG_ROOMSS_ADD');
  yield takeLatest(REG_ADD, WorkerRegRoomsAdd);
}

export default function* saga() {
  yield spawn(watchUserLogin);
  yield spawn(watchUserSignup);
  yield spawn(watchUsersList);
  yield spawn(watchUsersDelete);
  yield spawn(watchUsersUpdate);
  yield spawn(watchHotelsList);
  yield spawn(watchHotelsDelete);
  yield spawn(watchHotelsAdd);
  yield spawn(watchRoomsAdd);
  yield spawn(watchRoomsList);
  yield spawn(watchRegRoomsAdd);
}
