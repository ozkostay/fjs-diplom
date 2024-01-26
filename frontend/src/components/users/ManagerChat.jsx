import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ManagerChatItem from "./ManagerChatItem";
import { getUsersFromRequests } from "../../store/api/chat/getUsersFromRequests";
import { findRequestById } from "../../store/api/chat/findRequestById";
import ManagerChatDialogItem from "./ManagerChatDialogsItem";
import io from "socket.io-client";

const socket2 = io.connect(process.env.REACT_APP_BACK_URL);

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const [seletedLi, setSeletedLi] = useState(null);
  const [chatsUsers, setChatsUsers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatOwner, setChatOwner] = useState(null);
  const [mgrMessage, setMgrMessage] = useState('')
  const dialog = useRef();

  //getUsersFromRequests
  useEffect(() => {
    // console.log('== 10 ==');
    const sendFetch = async () => {
      try {
        const response = await getUsersFromRequests();
        const data = await response;
        data.forEach((item) => {
          item.newMessage = false;
        });
        // console.log("DATA 00000000000000000000000000000000000000", data);
        setChatsUsers(await data);
      } catch (err) {
        console.log("Ошибка в ManagerChat 24", err.massage);
      }
    };
    sendFetch();
  }, []);

  useEffect(() => {
    goToEndDialog();
  }, [messages]);

  // ==== Слушаем сообщение сервера ========
  useEffect(() => {
    // console.log("== 20 ==", chatOwner);
    const eventName = `serverToManager`;
    // console.log("333 Слушаем сообщение сервера!!!", eventName);
    socket2.on(eventName, (data) => {
      // console.log('YESSSS 111', chatsUsers);
      const newChatsUsers = [...chatsUsers];
      newChatsUsers.forEach((item) => {
        if (item.user._id === data.clientId) {
          item.newMessage = true;
          if (chatOwner && item.user._id === chatOwner.user._id) {
            fetchUserRequest(chatOwner.chatId);
          }
        }
      });
      setChatsUsers(newChatsUsers);
      // console.log("on serverToManager!!! YESSSS 222", newChatsUsers);
    });

    return () => {
      // console.log("== 20-2 ==");
      socket2.off(eventName);
    };
  }, [chatsUsers]);

  //==================================
  async function fnLiOnClick(e, chatId, user) {
    e.preventDefault();
    // console.log('== 30 ==');
    // console.log("========== == 0 == user", user);
    setChatOwner({ chatId, user });
    // Меняем стили
    if (seletedLi) {
      seletedLi.style.backgroundColor = "white";
      seletedLi.firstChild.style.color = "black";
    }
    const currentLi = e.target.closest(".mchat-users-cell");
    setSeletedLi(currentLi);
    currentLi.style.backgroundColor = "#5181b8";
    currentLi.firstChild.style.color = "white";
    // запрос чата выбранного клиента
    // console.log('== 30 == 1');
    fetchUserRequest(chatId);
    // console.log('== 30 == 2');
    const newChatsUsers = [...chatsUsers];
    newChatsUsers.forEach((item) => {
      if (item.user._id === user._id) {
        item.newMessage = false;
      }
    });
    setChatsUsers(newChatsUsers);
  }

  //====================================
  function goToEndDialog() {
    if (dialog.current) {
      dialog.current.scrollTop = 99999;
    }
  }

  //====================================
  async function fetchUserRequest(chatId) {
    const dataRequest = await findRequestById(chatId);
    // console.log("=== dataRequest ===", dataRequest);
    setMessages(dataRequest.messages);
  }
  // WS come
  // по ID находм user

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

  function fnSendMessage() {
    console.log('SEND', mgrMessage);
    const bodyToSocket = { clientId: chatOwner.user._id };
    socket2.emit("managerToClient", bodyToSocket);
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

          <div className="mchat-dialog-wrap">
            <div ref={dialog} className="mchat-dialog">
              {messages &&
                messages.map((i) => (
                  <ManagerChatDialogItem
                    key={i._id}
                    item={i}
                    chatOwner={chatOwner.user}
                  />
                ))}
            </div>
            <div className="mchat-dialog-send">
              <input type="text" value={mgrMessage} onChange={(e) => setMgrMessage(e.target.value)}/>
              <button className="mchat-dialog-btn" onClick={fnSendMessage}>&gt;&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
