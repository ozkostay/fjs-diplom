import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actRegRoomsClear, actRegRoomsDelete, actUserLogout } from "../store/actions/actionCreators";
import logo from "../pics/logo.png";
// import headerLogo from "./img/header-logo.png";

export default function Header() {
  const { user } = useSelector((state) => state.crUser);
  const { regRooms } = useSelector((state) => state.regrooms);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function testUser() {
    console.log("reduserUSER: ", user);
  }

  function fnLogout(event) {
    event.preventDefault();
    console.log("Yes LOGOUT");
    dispatch(actUserLogout());
    dispatch(actRegRoomsClear());
    navigate("/");
  }

  function fnRegRooms() {
    console.log('RegRooms', regRooms);
  }

  return (
    <>
      <div className="header-container">
        <Link className="logo-link" to="/">
          <div className="logo-img">
            {/* <img className="logo-img" src={logo} /> */}
          </div>
        </Link>

        <div className="header-main">
          <div>
            <button onClick={fnRegRooms}>books</button><h2>{regRooms.length}</h2>
          </div>
          {user ? (
            <div className="header-user-wrap">
              <span className="header-user">{user.name}</span>
              <span className="header-nav-link" onClick={fnLogout}>
                Выйти
              </span>
            </div>
          ) : (
            <div className="header-user-wrap">
              <Link className="header-nav-link" to="/signup">
                <span>Регистрация</span>
              </Link>
              {/* <Link className="nav-link header-login" to="/signin"> */}
              <Link className="header-nav-link" to="/signin">
                <span>Войти</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
