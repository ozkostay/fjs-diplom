import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function FindRooms() {
  // const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);

  return (
    <>
      <div>Поиск номера</div>
      <div>room</div>
    </>
  );
}
