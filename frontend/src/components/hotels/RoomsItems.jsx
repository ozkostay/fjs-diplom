import React from "react";
import HotelView from "./HotelsView";
import { useNavigate } from "react-router-dom";

export default function RoomsItems({item, hotelState}) {
  const navigate = useNavigate();
  // const url = `${process.env.REACT_APP_BACK_URL}/${item.files.url[0]}`
  const pics = JSON.parse(item.images);

  // const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
  const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
  // console.log('=========================', aaa)
  const picStyle = {
    backgroundImage: picsUrl,
    backgroundColor: '#ccc',
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
  }

  function fnViewRoom() {
    // HotelView();
    const url = `/rooms/view/${item._id}`
    console.log('URL', url);
    navigate( url , { state: {item, hotelState} });

  }

  return (
    <>
      <div className="hotels-item-wrap">
        <div className="hotels-item-pic" style={picStyle}></div>
        <div className="hotels-item-conteiner">
          <h2>{item.title}</h2>
          <div className="hotels-item-description">{item.description}</div>
          <button className="hotels-item-btn" onClick={fnViewRoom}>Подробнее</button>
        </div>
      </div>
    </>
  );
}