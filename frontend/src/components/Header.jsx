import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { Link, useNavigate } from "react-router-dom";
// import headerLogo from "./img/header-logo.png";
// import { setFindString } from "../store/actions/actionCreators";
// import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const { user, loading, error } = useSelector((state) => state.crUser);

  function testUser() {
    console.log('redUSer: ', user);
  }

  return (
    <>
      <div className="header-container bb">
        <div className="logo bb">LOGO</div>
        <div className="header-main bb">
          <div>
            <Link className="nav-link" to="/">
              <span className="link-span bb">Главная</span>
            </Link>
            <Link className="nav-link" to="/redux">
              <span className="link-span bb">redux</span>
            </Link>
          </div>
          <button onClick={testUser}>redUser</button>
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
