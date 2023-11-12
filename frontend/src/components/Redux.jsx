import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionUserTest } from "../store/actions/actionCreators";
// import { Link, Outlet } from "react-router-dom";

export default function Redux() {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function consoleTest() {
    const newUser = {
      email: 'qwe@qwe.ru',
      name: 'Konst Oz',
    }
    console.log('user: ', newUser);
    dispatch(actionUserTest(newUser));
  }

  return (
    <>
      <div>Redux {user? user.name : 'empty'}</div>
      <button onClick={consoleTest}>Test</button>
    </>
  );
}
