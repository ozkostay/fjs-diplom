import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export default function HotelsView(props) {
  const { user } = useSelector((state) => state.crUser);
  const [isModal, setIsModal] = useState(false);
  const [urlForModal, setUrlForModal] = useState(null);
  const location = useLocation();

  if (!location.state) {
    return (
      <>
        <div>Страница доступна только со страницы просмотра гостиниц!!!</div>
      </>
    );
  }
  const { title, description, files } = location.state.item;
  const hotelsPics = JSON.parse(files);
  const backendUrl = `${process.env.REACT_APP_BACK_URL}`;

  function fnModalPics(url) {
    console.log("URL", url);
    setIsModal(!isModal);
    setUrlForModal(url);
  }

  function fnCloseModalPics() {
    console.log("URL CLOSE", urlForModal);
    setIsModal(false);
    setUrlForModal("");
  }

  return (
    <>
      <div className="mainpage">
        <div className="addhotel-preview">
          {hotelsPics.length > 0 &&
            hotelsPics.map((item, index) => (
              <img
                key={new Date() + Math.random()}
                alt="not found"
                className="addhotel-pics-preview"
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
        </div>
        {user && user.role === "admin" && (
          <div className="addhotel-btn">
            <button className="addhotel-btn red">Редактировать</button>
            <button className="addhotel-btn blue">Добавить номер</button>
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
