import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AddHotelPics() {
  // const { user } = useSelector((state) => state.crUser);
  const [pics, setPics] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);
  function fnPics2Arr(e) {
    console.log('EVENT FILE', e.target);
  }

  return (
    <>
      <div className="addhotel-preview">
        <input type="file" onChange={fnPics2Arr}/>
        {/* <div className="addhotel-pics-preview">1</div>
        <div className="addhotel-pics-preview">2</div>
        <div className="addhotel-pics-preview">1</div> */}
        
        <button className="addhotel-pics-btn">+</button>
      </div>
    </>
  );
}