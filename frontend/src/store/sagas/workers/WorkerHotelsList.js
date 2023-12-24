import { put, retry } from "redux-saga/effects";
import { actHotelsList, actionUserTest } from "../../actions/actionCreators";
import { hotelsListSearch } from "../../api/hotels/hotelsListSearch";


export default function* WorkerHotelsList(action) {
  // console.log('SAGA WORKER HotelsList', action);
  if (action.payload) {
    // console.log('============== Прерываем WORKER HotelsList');
    return;
  }
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      hotelsListSearch,
      action.payload
    );
    // console.log('Worker HotelLIST 222', data);
    yield put(actHotelsList(data));
  } catch (err) {
    alert('Ошибка запроса hotelsList');
    yield put(actionUserTest(err.massage));
  }
}
