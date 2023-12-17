import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsPics } from "../../store/actions/actionCreators";

export default function AddHotelPics() {
  const { hotelsPics } = useSelector((state) => state.hotelsList);
  let idxFrom = null;
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  function fnPics2Arr(e) {
    const preArray = [...hotelsPics];
    const inputArray = Array.from(e.target.files);
    inputArray.forEach((i) => preArray.push(i));
    console.log("preArray length", preArray.length);

    if (preArray.length > 10) {
      alert("Не более картинок 10!!!");
      return;
    }
    dispatch(actHotelsPics(preArray));
  }

  function fnClickPlus() {
    inputFile.current.click();
  }

  function fnOnDragStart(e, item, index) {
    idxFrom = index;
  }

  function fnOnDragLeave(e) {
    e.preventDefault();
    e.target.style.border = "3px solid white";
  }

  function fnOnDragEnd(e) {
    // e.target.style.border = 'none';
  }

  function fnOnDragOver(e) {
    e.preventDefault();
    e.target.style.border = "3px solid red";
  }

  function fnOnDrop(e, item, idxTo) {
    e.preventDefault();
    e.target.style.border = "3px solid white";
    const tempArray = [...hotelsPics];
    tempArray.splice(idxTo, 0, tempArray.splice(idxFrom, 1)[0]);
    dispatch(actHotelsPics(tempArray));
  }

  console.log("=!++++++++++++++++++++++++++++++++++");
  return (
    <>
      <div>
        <input
          ref={inputFile}
          type="file"
          className="addhotel-input-file"
          multiple
          onChange={fnPics2Arr}
        />
        <div className="addhotel-preview">
          {hotelsPics.length > 0 &&
            hotelsPics.map((item, index) => (
              <img
                key={new Date() + Math.random()}
                alt="not found"
                className="addhotel-pics-preview"
                src={URL.createObjectURL(item)}
                draggable={true}
                onDragStart={(e) => fnOnDragStart(e, item, index)}
                onDragLeave={(e) => fnOnDragLeave(e)}
                onDragEnd={(e) => fnOnDragEnd(e)}
                onDragOver={(e) => fnOnDragOver(e)}
                onDrop={(e) => fnOnDrop(e, item, index)}
              />
            ))}
          {hotelsPics.length !== 10 && (
            <button className="addhotel-pics-btn" onClick={fnClickPlus}>
              <span>+</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
