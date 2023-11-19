import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionUserTest } from "../store/actions/actionCreators";
// import { Link, Outlet } from "react-router-dom";

export default function Redux() {
  const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);

  function consoleTest() {
    console.log('user: ', user);
    const newUser = {
      email: 'qwe@qwe.ru',
      name: 'Konst Oz',
    }
    // console.log('user: ', newUser);
    dispatch(actionUserTest(newUser));
  }

  return (
    <>
      <div>Redux {user?.name ? user.name : 'empty'}</div>
      <button onClick={consoleTest}>Test</button>
    </>
  );
}
