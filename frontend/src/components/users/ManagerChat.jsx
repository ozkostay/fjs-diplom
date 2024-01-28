import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ManagerChatItem from "./ManagerChatItem";
import { getUsersFromRequests } from "../../store/api/chat/getUsersFromRequests";
import { findRequestById } from "../../store/api/chat/findRequestById";
import ManagerChatDialogItem from "./ManagerChatDialogsItem";
import io from "socket.io-client";
import { sendClientMessage } from "../../store/api/chat/sendClientMessage";

const socket = io.connect(process.env.REACT_APP_BACK_URL);

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const [seletedLi, setSeletedLi] = useState(null);
  const [chatsUsers, setChatsUsers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatOwner, setChatOwner] = useState(null);
  const [mgrMessage, setMgrMessage] = useState("");
  const [socetData, setSocetData] = useState(null);
  const [mgrSend, setMgrSend] = useState(false);
  const dialog = useRef();

  //getUsersFromRequests
  useEffect(() => {
    // console.log('== 10 ==');
    // fetchChatsUsers();
  }, []);

  useEffect(() => {
    goToEndDialog();
  }, [messages]);

  // ==== Слушаем сообщение сервера ========
  useEffect(() => {
    // console.log("== 20 ==", chatOwner);
    const eventName = `serverToManager`;
    socket.on(eventName, (data) => {
      // console.log("YESSSS 111", mgrSend);
      fetchChatsUsers(data);
    });

    return () => {
      // console.log("== 20-2 ==");
      socket.off(eventName);
    };
  }, [chatsUsers]);

  //=======================================
  useEffect(() => {
    // console.log("YESSSS 222", chatsUsers);
    // console.log("YESSSS 333", chatsUsers);
    
    if (!chatsUsers) {
      fetchChatsUsers();
    }
    if (!socetData) return;
    const newChatsUsers = [...chatsUsers];

    newChatsUsers.forEach((item) => {
      if (item.user._id === socetData.clientId) {
        item.newMessage = true;
        if (chatOwner && item.user._id === chatOwner.user._id) {
          fetchUserRequest(chatOwner.chatId);
        }
      }
    });
    setChatsUsers(newChatsUsers);
    // setSocetData(null);
  }, [socetData]);

  //=============================================
  async function fetchChatsUsers(socetData) {
    try {
      const response = await getUsersFromRequests();
      const data = await response;
      data.forEach((item) => {
        item.newMessage = false;
      });
      setChatsUsers(await data);
      // console.log('data data', socetData)
      if (socetData) setSocetData(socetData);
      // console.log('=!===========================2');
    } catch (err) {
      console.log("Ошибка в ManagerChat 24", err.massage);
    }
  }

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
    // console.log("== 30 == 2");
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
    if (!chatOwner) return;

    // console.log("====== manager to end");
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

  //================================== Отправка сообщений
  async function fnSendMessage() {
    const body = { author: user._id, text: mgrMessage };
    const params = { id: { _id: chatOwner.chatId }, body };
    const response = await sendClientMessage(params);
    if (response.errorStatus) {
      return;
    }
    setMgrMessage("");
    const bodyToSocket = { clientId: chatOwner.user._id };
    // console.log('=!================== setMgrSend(true);');
    setMgrSend(true);
    socket.emit("managerToClient", bodyToSocket);
  }

  // console.log("888888888888888", socetData);

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
              <input
                type="text"
                value={mgrMessage}
                onChange={(e) => setMgrMessage(e.target.value)}
              />
              <button className="mchat-dialog-btn" onClick={fnSendMessage}>
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
