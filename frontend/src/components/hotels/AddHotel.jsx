import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddHotelPics from "./AddHotelPics";

export default function AddHotel() {
  // const { user } = useSelector((state) => state.crUser);
  const { hotelsPics } = useSelector((state) => state.hotelsList);
  const dispatch = useDispatch();

  async function handlerHotelsSave(e) {
    e.preventDefault();
    const url =
      process.env.REACT_APP_BACK_URL +
      process.env.REACT_APP_POSTFIX_HOTELS +
      "/uploadpics";
    const formData = new FormData();
    hotelsPics.forEach((item) => {
      formData.append("files", item);
    });
    formData.append("title", 'TITLEEEEEEEEE');
    formData.append("description", 'description description description description description');

    const options = {
      method: "POST",
      body: formData,
    };
    try {
      const res = await fetch(url, options);
      console.log("RES", res.text());
    } catch (e) {
      console.log("ERROR UPLOAD", e.massage);
    }
  }

  console.log("==== DDDDDDD +++++");

  return (
    <>
      <div className="mainpage">
        <AddHotelPics />
        <div>
          <span className="addhotel-span">Название отеля</span>
          <input className="addhotel-title" type="text" />
        </div>
        <div>
          <label>
            <span className="addhotel-span">Описание отеля</span>
            <textarea className="addhotel-desc" />
          </label>
        </div>
        <div className="addhoyel-btn">
          <button className="addhoyel-btn green" onClick={handlerHotelsSave}>
            Сохранить
          </button>
          <button className="addhoyel-btn red">Отменить</button>
          <button className="addhoyel-btn blue">Добавить номер</button>
        </div>
      </div>
    </>
  );
}
