import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Hotels() {
  // const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);

  return (
    <>
      <div>Все гостиницы</div>
      <div>Hotels</div>
    </>
  );
}
