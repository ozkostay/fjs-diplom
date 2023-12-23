import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actUserLogout } from "../store/actions/actionCreators";
import logo from "../pics/logo.png";
// import headerLogo from "./img/header-logo.png";

export default function Header() {
  const { user } = useSelector((state) => state.crUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function testUser() {
    console.log("reduserUSER: ", user);
  }

  function fnLogout(event) {
    event.preventDefault();
    console.log("Yes LOGOUT");
    dispatch(actUserLogout());
    navigate("/");
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
          <div></div>
          {user ? (
            <div>
              <span className="link-span header-user">{user.name}</span>
              <span className="link-span" onClick={fnLogout}>
                Выйти
              </span>
            </div>
          ) : (
            <div>
              <Link className="nav-link" to="/signup">
                <span className="link-span">Регистрация</span>
              </Link>
              <Link className="nav-link" to="/signin">
                <span className="link-span">Войти</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
