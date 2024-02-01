import React, { useEffect, useRef, useState } from "react";
import chat from "../../pics/chat.png";
import { useSelector } from "react-redux";
import { sendClientMessage } from "../../store/api/chat/sendClientMessage";
import { findUserRequest } from "../../store/api/chat/findUserRequest";
import ManagerChatDialogItem from "./ManagerChatDialogsItem";
import io from "socket.io-client";
import { readMessage } from "../../store/api/chat/readMessage";

const socket = io.connect(process.env.REACT_APP_BACK_URL);

export default function Chat() {
  const { user } = useSelector((state) => state.crUser);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const dialog = useRef();
  const [currenChat, setCurrentChat] = useState({ _id: "newchat" }); // текущий чат
  const [messages, setMessages] = useState(null); // массив сообщений

  // ======================================
  useEffect(() => {
    // console.log('== 10 ==');
    if (isChatVisible) {
      fetchUserReq();
      goToEndDialog();
    }
  }, [isChatVisible]);

  // ======================================
  useEffect(() => {
    // console.log('== 20 ==');
    fetchUserReq();
  }, []);

  //==== Слушаем сообщение сервера ========
  useEffect(() => {
    console.log("== 30 ==");
    if (!isChatVisible) {
      return;
    }
    const eventName = `serverToClient${user._id}`;
    console.log("333 Слушаем сообщение сервера!!!", eventName);
    socket.on(eventName, (data) => {
      console.log("on messageToClient!!! YESSSS", data);
      if (data.clientId === user._id) {
        console.log("===!=== Пришло новое сообщение ");
        setMessages(null);
        fetchUserReq();
      }
    });
    goToEndDialog();
    console.log("== 30-1 ==");
    return () => {
      console.log("== 30-2 ==", messages);
      socket.off(eventName);
    };
  }, [messages, isChatVisible]);

  // ======================================
  async function fetchUserReq() {
    const response = await findUserRequest(user._id);
    console.log("=!========== ", response);
    if (response.length > 0) {
      setCurrentChat(response[0]);
      setMessages(response[0].messages);
    }
  }

  // ======================================
  function goToEndDialog() {
    if (dialog.current && isChatVisible && messages) {
      console.log("== 50 == Идем в конец isChatVisible=", isChatVisible);
      dialog.current.scrollTop = 99999;
      // отметки прочтено
      // Находим не прочитанные менеджера и в массив
      const notReadMess = messages
        .filter((i) => i.author !== user._id && !i.readAt)
        .map((i) => i._id);
      const params = {
        id: currenChat,
        body: {
          createdBefore: notReadMess,
        },
      };
      const response = readMessage(params);
      const bodyToSocket = { clientId: user._id };
      socket.emit("clientReadMessage", bodyToSocket);
    }
  }

  // ======================================
  async function fnSendMessage() {
    console.log('== 60 ==');
    // console.log("Посылаем сообщение", myMessage);
    const body = { author: user._id, text: myMessage };
    const params = { id: currenChat, body };
    const response = await sendClientMessage(params);
    if (response.errorStatus) {
      return;
    }
    const bodyToSocket = { clientId: user._id };
    socket.emit("clientToManager", bodyToSocket);
    setCurrentChat(response);
    setMyMessage("");
  }

  // ======================================
  // console.log('== 70 ==');
  return (
    <>
      <img
        className="chat-btn"
        width="80"
        height="80"
        src={chat}
        alt="speech-bubble-with-dots"
        onClick={() => setIsChatVisible(!isChatVisible)}
      />
      {isChatVisible && (
        <div className="chat-window">
          <div className="chat-dialog" ref={dialog}>
            {messages &&
              messages.map((i) => (
                <ManagerChatDialogItem key={i._id} item={i} chatOwner={user} />
              ))}
          </div>
          <div className="chat-send">
            <input
              className="chat-input"
              type="text"
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
            />
            <button className="chat-send-btn" onClick={fnSendMessage}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
