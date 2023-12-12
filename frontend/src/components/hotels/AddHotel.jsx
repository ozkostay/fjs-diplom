import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddHotelPics from "./AddHotelPics";

export default function AddHotel() {
  // const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);

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
          <button className="addhoyel-btn green">Сохранить</button>
          <button className="addhoyel-btn red">Отменить</button>
          <button className="addhoyel-btn blue">Добавить номер</button>
        </div>
      </div>
    </>
  );
}
