import React, { useEffect, useRef, useState } from "react";
import chat from "../pics/chat.png";
import { useSelector } from "react-redux";
import { sendClientMessage } from "../store/api/chat/sendClientMessage";
import { findUserRequest } from "../store/api/chat/findUserRequest";

export default function Chat() {
  const { user } = useSelector((state) => state.crUser);
  const [isChat, setIsChat] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const dialog = useRef();
  const [currenChat, setCurrentChat] = useState({ _id: "newchat"}); // текущий чат
  const [messages, setMassages] = useState(null); // массив сообщений

  // =============================================================
  useEffect(() => {
    // Переход к концу диалога
    if (dialog.current) {
      dialog.current.scrollTop = 99999;
    }
  }, [dialog.current]);

  useEffect(() => {
    const sendFetch = async () => {
      // Получаем обращение пользователя, если нет то стейт остается по умолчанию
      console.log("Send FEtch!!!", user._id);
      const response = await findUserRequest(user._id);
      console.log('=!========== ', response);
      if (response.length > 0) {
        setCurrentChat(response[0]);
      }
    };
    sendFetch();
  }, []);

  //===================================
  async function fnSendMessage() {
    console.log("Посылаем сообщение", myMessage);
    const body = { author: user._id, text: myMessage };
    const params = { id: currenChat, body };
    const response = await sendClientMessage(params);
    if (response.errorStatus) {
      return;
    }
    setCurrentChat(response);
    setMyMessage("");
  }

  // =============================================================
  return (
    <>
      <img
        className="chat-btn"
        width="80"
        height="80"
        src={chat}
        alt="speech-bubble-with-dots"
        onClick={() => setIsChat(!isChat)}
      />
      {isChat && (
        <div className="chat-window">
          <div className="chat-dialog" ref={dialog}>
            {/* <div className="message-wrap">
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
            <div className="message-wrap">
              <div className="message-client">
                {" "}
                Какоето сообщение от клиента. Вопрос очень важный
              </div>
            </div> */}
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
