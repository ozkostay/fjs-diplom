import React from "react";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import headerLogo from "./img/header-logo.png";
// import { setFindString } from "../store/actions/actionCreators";
// import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  return (
    <>
      <div className="header-container bb">
        <div className="logo bb">LOGO</div>
        <div className="header-main bb">
          <div>
            <Link className="nav-link" to="/">
              <span className="link-span bb">Главная</span>
            </Link>
          </div>
          <div>
            <Link className="nav-link bb" to="/signup">
              <span className="link-span">Регистрация</span>
            </Link>
            <Link className="nav-link bb" to="/signin">
              <span className="link-span">Войти</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
