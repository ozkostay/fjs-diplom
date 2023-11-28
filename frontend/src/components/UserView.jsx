import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function UserView() {
  // const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);

  return (
    <>
      <div>Добавить гостиницу</div>
      <div>AddHotel</div>
    </>
  );
}
