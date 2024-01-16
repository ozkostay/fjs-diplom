import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManagerChatItem from "./ManagerChatItem";
import { findUserRequest } from "../../store/api/chat/findUserRequest";
import { getUsersFromRequests } from "../../store/api/chat/getUsersFromRequests";
import { findRequestById } from "../../store/api/chat/findRequestById";

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const [seletedLi, setSeletedLi] = useState(null);
  const [chatsUsers, setChatsUsers] = useState(null);
  const [messages, setMessages] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //getUsersFromRequests
  useEffect(() => {
    const sendFetch = async () => {
      const response = await getUsersFromRequests();
      const data = await response;
      console.log("DATA", data);
      setChatsUsers(await data);
    };
    sendFetch();
  }, []);

  //==================================
  async function fnLiOnClick(e, id) {
    e.preventDefault();
    if (seletedLi) {
      seletedLi.style.backgroundColor = "white";
      seletedLi.firstChild.style.color = "black";
    }
    const currentLi = e.target.closest(".mchat-users-cell");
    setSeletedLi(currentLi);
    currentLi.style.backgroundColor = "#5181b8";
    currentLi.firstChild.style.color = "white";
    // const dataRequest = await findUserRequest(id);
    const dataRequest = await findRequestById(id);
    setMessages(dataRequest.messages);
    console.log("=== dataRequest ===", dataRequest);
  }

  //==================================
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

  //==================================
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
                {chatsUsers &&
                  chatsUsers.map((i) => (
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
          {/* <div className="mchat-dialog">{messages && messages[0].text }</div> */}
          <div className="mchat-dialog">
            <div className="message-wrap">
              <div className="message-client">
                {" "}
                Какоето сообщение от клиента. Вопрос очень важный
              </div>
            </div>
            <div
              className="message-wrap"
              style={{ justifyContent: "flex-end" }}
            >
              <div className="message-manager">
                {" "}
                Какоето сообщение от менеджера. Ответ не менее важны , чем у
                клиента
              </div>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
