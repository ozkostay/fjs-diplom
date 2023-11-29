import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserView() {
  // const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  let { id } = useParams();

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);

  return (
    <>
      <div>Данные пользователя id:{id}</div>
      <div>UserView</div>
    </>
  );
}
