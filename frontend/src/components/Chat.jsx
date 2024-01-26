import React, { useEffect, useRef, useState } from "react";
import chat from "../pics/chat.png";
import { useSelector } from "react-redux";
import { sendClientMessage } from "../store/api/chat/sendClientMessage";
import { findUserRequest } from "../store/api/chat/findUserRequest";
import ManagerChatDialogItem from "./users/ManagerChatDialogsItem";
import io from "socket.io-client";

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
    goToEndDialog()
  }, [dialog.current]);

  // ======================================
  useEffect(() => {
    // console.log('== 20 ==');
    fetchUserReq();
  }, []);

  //==== Слушаем сообщение сервера ========
  useEffect(() => {
    console.log('== 30 ==');
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
    console.log('== 30-1 ==');
    return () => {
      console.log('== 30-2 ==');
      socket.off(eventName);
    };
  }, [messages]);

  // ======================================
  async function fetchUserReq() {
    // console.log('== 40 ==');
    // console.log("fetchUserReq!!!", user._id);
    const response = await findUserRequest(user._id);
    console.log("=!========== ", response);
    if (response.length > 0) {
      setCurrentChat(response[0]);
      setMessages(response[0].messages);
      
    }
  }

  // ======================================
  function goToEndDialog() {
    // console.log('== 50 ==');
    if (dialog.current) {
      dialog.current.scrollTop = 99999;
    }
  }

  // ======================================
  async function fnSendMessage() {
    // console.log('== 60 ==');
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
