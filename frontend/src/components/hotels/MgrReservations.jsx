import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  actRegRoomsDelete,
  actRegRoomsList,
} from "../../store/actions/actionCreators";
import ReservationsItems from "./ReservationsItems";
import { useEffect } from "react";


export default function MgrReservations() {
  let { id } = useParams();
  const location = useLocation();
  const { name, email } = location.state.item;
  const { regRooms } = useSelector((state) => state.regrooms);
  const dispatch = useDispatch();


  // Получаем брони пользователя
  //===================================
  useEffect(() => {
    dispatch(actRegRoomsList(id));
  }, [regRooms]);

  //===================================
  function fnDeleteResRoom(id) {
    console.log("Delete id=", id);
    dispatch(actRegRoomsDelete(id));
  }


  //===================================
  return (
    <>
      <div className="hotels-header">
        <h1>Забронировые номера:</h1>

        <h3 style={{ marginTop: "10px" }}>
          Пользователь:<strong style={{ color: "green" }}>{name}</strong>
        </h3>
        <h3 style={{ marginTop: "10px" }}>
          E-mail: <strong style={{ color: "green" }}>{email}</strong>
        </h3>
      </div>

      {regRooms.length < 1 && <div style={{color: 'red', fontSize: '20px'}}>У данного пользователя номера на забронированны</div>}

      {regRooms &&
        regRooms.map((i) => (
          <ReservationsItems
            key={i._id}
            item={i}
            deleteItem={fnDeleteResRoom}
          />
        ))}
    </>
  );
}
