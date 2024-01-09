import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList } from "../../store/actions/actionCreators";
import HotelsItems from "./HotelsItems";
import ReservationsItems from "./ReservationsItems";

export default function Reservations() {
  const { regRooms } = useSelector((state) => state.regrooms);
  // const [limit, setLimit] = useState(3);
  // const [offset, setOffset] = useState(0);
  // const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  console.log('===================== Рендер брони');

  return (
    <>
      <div>Бронирования</div>
      <button onClick={() => console.log("RegRooms", regRooms)}>
        RRRRRRRRRr={regRooms.length}
      </button>
      {regRooms &&
        // <h1>asdfasdfadsf</h1>
        regRooms.map((i) => <ReservationsItems key={i._id} item={i}/>)}
    </>
  );
}
