import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
// import Footer from './Footer';
// import Banner from './Banner';
// import Error from './Error';

export default function Layout() {
  const { user } = useSelector((state) => state.crUser);

  return (
    <>
      <div className="app-container">
        <Header />
        <main className="main-container">
          
            <div className="left-nav">
              <ul>
                <li>
                  <Link  className="nav-link" to="/hotels">
                    Все гостиницы
                  </Link>
                </li>
                {/* <li>
                <Link className="nav-link" to="/room">
                  <span className="link-span">Поиск номера</span>
                </Link>
              </li> */}
                {user?.role === "admin" ? (
                  <>
                    <li>
                      <Link className="nav-link" to="addhotel">
                        Добавить гостиницу
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/users">
                        Пользователи                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
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
