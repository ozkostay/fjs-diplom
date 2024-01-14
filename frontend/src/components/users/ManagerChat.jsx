import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let prevLi = useRef(null);

  function fnUserLiHendler(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="mainpage">
        <div className="mchat-wrap">
          <div className="mchat-users">
            <div className="mchat-header">
              <h2>Чаты клиентов</h2>
            </div>

            <div className="">
              <ul className="">
                <li
                  className="mchat-users-cell"
                  onClick={(e) => fnUserLiHendler(e)}
                >
                  <div className="mchat-name">Иванов</div>
                  <div className="mchat-signal">.</div>
                </li>
                <li
                  className="mchat-users-cell"
                  onClick={(e) => fnUserLiHendler(e)}
                >
                  <div className="mchat-name">Петров</div>
                  <div className="mchat-signal">.</div>
                </li>
                <li
                  className="mchat-users-cell"
                  onClick={(e) => fnUserLiHendler(e)}
                >
                  <div className="mchat-name">Сидоров</div>
                  <div className="mchat-signal">.</div>
                </li>
                <li
                  className="mchat-users-cell"
                  onClick={(e) => fnUserLiHendler(e)}
                >
                  <div className="mchat-name">Третьякова</div>
                  <div className="mchat-signal">.</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mchat-dialog">asdf asdf asdf asdf</div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
