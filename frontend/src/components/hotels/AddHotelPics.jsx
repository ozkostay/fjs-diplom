import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AddHotelPics() {
  // const { user } = useSelector((state) => state.crUser);
  const [picsArray, setPicsArray] = useState([]);
  const [startFile, setStartFile] = useState(null);
  // const [startFile, setStartFile] = useState(null);
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  function fnPics2Arr(e) {
    const preArray = [...picsArray];
    const inputArray = Array.from(e.target.files);
    console.log("EVENT FILE 111", inputArray);
    inputArray.forEach((i) => preArray.push(i));
    console.log("EVENT FILE 222", preArray);
    setPicsArray(preArray);
  }

  function fnClickPlus() {
    inputFile.current.click();
  }

  function fnOnDragStart(e, item, index) {
    console.log(item, index);
    // setStartFile(item);
  }

  function fnOnDragLeave(e) {
    e.target.style.border = '3px solid white';
  }

  function fnOnDragEnd(e) {
    // e.target.style.border = 'none';
  }

  function fnOnDragOver(e) {
    e.preventDefault();
    e.target.style.border = '3px solid red';
  }

  function fnOnDrop(e, item) {
    e.preventDefault();
    console.log(item);
    e.target.style.border = '3px solid white';
    // const tempArray = [...picsArray];
    // const imageFrom = tempArray.splice();
  }

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
          {picsArray.length > 0 &&
            picsArray.map((item, index) => (
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
                onDrop={(e) => fnOnDrop(e, item)}
              />
            ))}

          <button className="addhotel-pics-btn" onClick={fnClickPlus}>
            +
          </button>
        </div>
      </div>
    </>
  );
}
