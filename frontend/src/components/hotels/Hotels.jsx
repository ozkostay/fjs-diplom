import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList } from "../../store/actions/actionCreators";
import HotelsItems from "./HotelsItems";

export default function Hotels() {
  const { hotels } = useSelector((state) => state.hotelsList);
  const [hotelName, setHotelName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actHotelsList());
  }, []);

  function fnConLogHotels() {
    console.log("HOTES", hotels);
  }

  function fnFilterHotels() {
    console.log("FILTER HOTES", hotelName);
  }

  return (
    <>
      <div className="hotels-main">
        <div className="hotels-header">
          <h1>Поиск гостиницы</h1>
          <div className="hotels-filter">
            <input
              type="text"
              className="findrooms hotels"
              placeholder="введите слова для поиска"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
            <button className="findrooms-btn blue" onClick={fnFilterHotels}>
              Найти
            </button>
          </div>
        </div>

        {hotels && hotels.map((i) => <HotelsItems key={i._id} item={i} />)}
      </div>
    </>
  );
}
