import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ManagerChatItem from "./ManagerChatItem";
import { getUsersFromRequests } from "../../store/api/chat/getUsersFromRequests";
import { findRequestById } from "../../store/api/chat/findRequestById";
import ManagerChatDialogItem from "./ManagerChatDialogsItem";

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const [seletedLi, setSeletedLi] = useState(null);
  const [chatsUsers, setChatsUsers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatOwner, setChatOwner] = useState(null);
  
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
  async function fnLiOnClick(e, chatId, user) {
    e.preventDefault();
    if (seletedLi) {
      seletedLi.style.backgroundColor = "white";
      seletedLi.firstChild.style.color = "black";
    }
    const currentLi = e.target.closest(".mchat-users-cell");
    setSeletedLi(currentLi);
    currentLi.style.backgroundColor = "#5181b8";
    currentLi.firstChild.style.color = "white";
    const dataRequest = await findRequestById(chatId);

    console.log("=== dataRequest ===", dataRequest);
    setChatOwner(user);
    setMessages(dataRequest.messages);
    console.log("=== dataRequest messages ===", dataRequest.messages);
  }

  //==================================
  function fnOnMouseOver(e) {
    e.preventDefault();
    const currentLi = e.target.closest(".mchat-users-cell");
    if (currentLi === seletedLi) {
      return;
    }
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
          <div className="mchat-dialog">
            {messages &&
              messages.map((i) => (
                <ManagerChatDialogItem
                  key={i._id}
                  item={i}
                  chatOwner={chatOwner}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
