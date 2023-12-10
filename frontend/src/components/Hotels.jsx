import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList } from "../store/actions/actionCreators";

export default function Hotels() {
  const { hotels } = useSelector((state) => state.hotelsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actHotelsList());
  }, []);

  function fnConLogHotels() {
    console.log('HOTES', hotels);
  }

  return (
    <>
      <div>Все гостиницы</div>
      <div>Hotels</div>
      <button onClick={fnConLogHotels}>Гостишки state</button>
    </>
  );
}
