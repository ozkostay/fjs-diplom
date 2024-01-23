import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList } from "../../store/actions/actionCreators";
import HotelsItems from "./HotelsItems";

export default function Hotels() {
  const { hotels } = useSelector((state) => state.hotelsList);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fnFilterHotels();
  }, []);

  function fnConLogHotels() {
    console.log("HOTES", hotels);
  }

  function fnFilterHotels() {
    
    const preOffset = offset;
    const params = {
      offset: preOffset,
      limit,
      search,
    };
    // console.log("FILTER HOTES", params);
    dispatch(actHotelsList(params));
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
     
            {/* <button className="findrooms-btn blue" onClick={fnFilterHotels}> */}
            <button className="hotels-item-btn" onClick={fnFilterHotels}>
              Найти
            </button>
          </div>
        </div>

        {(hotels.length > 0) && hotels.map((i) => <HotelsItems key={i._id} item={i} />)}
      </div>
    </>
  );
}
