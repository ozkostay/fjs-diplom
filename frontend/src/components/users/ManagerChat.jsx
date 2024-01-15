import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManagerChatItem from "./ManagerChatItem";

const tempArr = [
  {
    _id: "1",
    user: { name: "Иванов" },
  },
  {
    _id: "2",
    user: { name: "Петров" },
  },
  {
    _id: "3",
    user: { name: "Сидоров" },
  },
  {
    _id: "4",
    user: { name: "Третьякова" },
  },
];

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const [seletedLi, setSeletedLi] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function fnLiOnClick(e) {
    e.preventDefault();
    if (seletedLi) {
      seletedLi.style.backgroundColor = "white";
      seletedLi.firstChild.style.color = "black";
    }
    const currentLi = e.target.closest(".mchat-users-cell");
    setSeletedLi(currentLi);
    currentLi.style.backgroundColor = "#5181b8";
    currentLi.firstChild.style.color = "white";
  }

  function fnOnMouseOver(e) {
    e.preventDefault();
    const currentLi = e.target.closest(".mchat-users-cell");
    if (currentLi === seletedLi) {
      return;
    }
    // console.log("OVER", e.target.closest(".mchat-users-cell"));
    currentLi.style.backgroundColor = "#cfd2da";
    currentLi.firstChild.style.color = "black";
  }

  function fnOnMouseLeave(e) {
    e.preventDefault();
    const currentLi = e.target.closest(".mchat-users-cell");
    if (currentLi === seletedLi) {
      return;
    }
    // console.log("LEAVE  ", currentLi);
    currentLi.style.backgroundColor = "white";
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
                {/* <li
                  className="mchat-users-cell"
                  onClick={(e) => fnLiOnClick(e)}
                  onMouseOver={(e) => fnOnMouseOver(e)}
                  onMouseLeave={(e) => fnOnMouseLeave(e)}
                >
                  <span className="mchat-name">Иванов</span>
                  <div className="mchat-signal"> </div>
                </li> */}
                {tempArr.map((i) => (
                  <ManagerChatItem
                    key={i._id}
                    item={i}
                    fnLiOnClick={fnLiOnClick}
                    fnOnMouseOver={fnOnMouseOver}
                    fnOnMouseLeave={fnOnMouseLeave}
                  />
                ))}
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
