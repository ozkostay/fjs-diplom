import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function HotelsView(props) {
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

        <div className="addhoyel-btn">
          {/* <button className="addhoyel-btn green" onClick={handlerHotelsSave}>
            Сохранить
          </button> */}
          <button className="addhoyel-btn red">Редактировать</button>
          <button className="addhoyel-btn blue">Добавить номер</button>
        </div>
      </div>
      {isModal && (
        <div className="modal-wrap bb">
          <div
            className="pics-modal bb"
            style={{ backgroundImage: `url(${urlForModal})` }}
          >SSS
            <div className="close-modal bb" onClick={fnCloseModalPics}>
              &times;
            </div>
          </div>
        </div>
      )}
    </>
  );
}
