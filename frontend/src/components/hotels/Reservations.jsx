import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList, actRegRoomsDelete } from "../../store/actions/actionCreators";
import HotelsItems from "./HotelsItems";
import ReservationsItems from "./ReservationsItems";

export default function Reservations() {
  const { regRooms } = useSelector((state) => state.regrooms);
  const dispatch = useDispatch();

  function fnDeleteResRoom(id) {
    console.log('Delete id=', id);
    dispatch(actRegRoomsDelete(id));
  }

  return (
    <>
      <div className="hotels-header"><h1>Забронировые номера:</h1></div>
      {regRooms &&
        regRooms.map((i) => <ReservationsItems key={i._id} item={i} deleteItem={fnDeleteResRoom} />)}
    </>
  );
}