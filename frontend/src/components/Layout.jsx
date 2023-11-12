import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from './Footer';
// import Banner from './Banner';
// import Error from './Error';

export default function Layout() {
  return (
    <>
      <div className="app-container bb">
        <Header />
        <main className="main-container bb">
          <div className="left-nav bb">
            <ul>
              <li>
                <Link className="nav-link" to="#">
                  <span className="link-span">Все гостиницы</span>
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="#">
                  <span className="link-span">Поиск номера</span>
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="#">
                  <span className="link-span">Добавить гостиницу</span>
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="#">
                  <span className="link-span">Пользователи</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="outlet-container">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
