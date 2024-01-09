import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationsItems({ item, deleteItem }) {
  const navigate = useNavigate();

  const pics = JSON.parse(item.roomId.images);
  // const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
  const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
  // console.log('=========================', aaa)
  const picStyle = {
    backgroundImage: picsUrl,
    backgroundColor: "#ccc",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  function fnViewRoom() {
    // HotelView();
    const url = `/rooms/view/${item._id}`;
    console.log("URL", url);
    navigate(url, { state: { item: item.roomId, hotelState: item.hotelId } });
  }

  return (
    <>
      <div>
        {/* === {item._id} */}
        <div className="hotels-item-wrap">
          <div className="hotels-item-pic" style={picStyle}></div>
          <div className="hotels-item-conteiner">
            <h2 style={{ marginBottom: "10px", color: "blue" }}>
              {item.hotelId.title}
            </h2>
            <h2>{item.roomId.title}</h2>
            <div className="hotels-item-description">
              {item.roomId.description}
            </div>
            <div className="hotels-item-buttons">
              <button className="addhotel-btn blue" onClick={fnViewRoom}>
                Подробнее
              </button>
              <button className="addhotel-btn red" onClick={() => deleteItem(item._id)}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
