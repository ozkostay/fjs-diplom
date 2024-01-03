import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddRoom from "./AddRoom";
import { actRoomsList } from "../../store/actions/actionCreators";
import RoomsItems from "./RoomsItems";

export default function RoomsView(props) {
  const { user } = useSelector((state) => state.crUser);
  // const { rooms } = useSelector((state) => state.rooms);
  const [isModal, setIsModal] = useState(false);
  const [urlForModal, setUrlForModal] = useState(null);
  // const [isAddRoom, setIsAddRoom] = useState(false);
  // const [limit, setLimit] = useState(10);
  // const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // if (!location.state) {
  //   return (
  //     <>
  //       <div>Страница доступна только со страницы просмотра гостиниц!!!</div>
  //     </>
  //   );
  // }

  const { _id, title, description, images } = location.state.item;
  const hotelState = location.state.hotelState;
  const hotelsPics = JSON.parse(images);
  const backendUrl = `${process.env.REACT_APP_BACK_URL}`;

  function fnModalPics(url) {
    setIsModal(!isModal);
    setUrlForModal(url);
  }

  function fnCloseModalPics() {
    setIsModal(false);
    setUrlForModal("");
  }

  function fnReturn() {
    const url = `/hotels/view/${hotelState._id}`
    navigate(url,  { state: {item: hotelState} });
  }

  return (
    <>
      <div className="hotels-header" onClick={fnReturn}>
        {" "}
        ... Назад к <span style={{color: 'blue'}}>{hotelState.title}</span>
      </div>
      <div className="mainpage">
        <div className="addhotel-preview">
          {hotelsPics.length > 0 &&
            hotelsPics.map((item, index) => (
              <img
                key={item.url}
                alt="not found"
                className="view-pics-preview"
                src={backendUrl + item.url}
                onClick={() => fnModalPics(backendUrl + item.url)}
              />
            ))}
        </div>
        <div className="mb20">
          <h1 style={{ color: "black" }}>{title}</h1>
        </div>
        <div className="mb20">
          <span style={{ color: "#8a92a6" }}>{description}</span>
          <span style={{ color: "#8a92a6" }}>id: {_id}</span>
        </div>
        {user && user.role === "admin" && (
          <div className="addhotel-btn">
            <button className="addhotel-btn red">Редактировать</button>
          </div>
        )}
      </div>
      {isModal && (
        <div className="modal-wrap">
          <div
            className="pics-modal"
            style={{ backgroundImage: `url(${urlForModal})` }}
          >
            <div className="close-modal" onClick={fnCloseModalPics}>
              &times;
            </div>
          </div>
        </div>
      )}
    </>
  );
}
