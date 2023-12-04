import { put, retry } from "redux-saga/effects";
import { actUsersList, actionUserTest } from "../../actions/actionCreators";
import { usersListSearch } from "../../api/usersListSearch";


export default function* WorkerUsersList(action) {
  console.log('SAGA WORKER UsersList', action);
  if (action.payload) {
    return;
  }
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      usersListSearch,
      action.payload
    );
    yield put(actUsersList(data));
  } catch (err) {
    alert('Ошибка запроса');
    yield put(actionUserTest(err.massage));
  }
}
