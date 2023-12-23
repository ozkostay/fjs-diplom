import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList } from "../../store/actions/actionCreators";
import HotelsItems from "./HotelsItems";

export default function Hotels() {
  const { hotels } = useSelector((state) => state.hotelsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actHotelsList());
  }, []);

  function fnConLogHotels() {
    console.log("HOTES", hotels);
  }

  return (
    <>
      <div className="hotels-main">
        <h1 className="hotels-header">Поиск гостиницы</h1>
        {hotels && hotels.map((i) => <HotelsItems key={i._id} item={i} />)}
      </div>
    </>
  );
}
