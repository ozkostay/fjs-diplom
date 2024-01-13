import React, { useEffect, useRef, useState } from "react";
import chat from "../pics/chat.png";
import { createChat } from "../store/api/chat/creatChat";
import { useSelector } from "react-redux";

export default function Chat() {
  const { user } = useSelector((state) => state.crUser);
  const [isChat, setIsChat] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const dialog = useRef();
  const [currenChat, setCurrentChat] = useState(null); // текущий чат
  const [messages, setMassages] = useState(null); // массив сообщений

  // =============================================================
  useEffect(() => {
    // console.log('dialog.current',dialog.current);
    if (dialog.current) {
      dialog.current.scrollTop = 99999;
    }
  }, [dialog.current]);

  //===================================
  async function fnSedMessage() {
    console.log("Посылаем сообщение", myMessage);

    if (!currenChat && myMessage.trim()) {
      const body = {
        author: user._id,
        text: myMessage,
      };
      const response = await createChat(body);
      if (response.errorStatus) {
        return;
      }
      setCurrentChat(response);
      setMassages(response.messages);
    } else if (currenChat && myMessage.trim()) {
      // иначе --- addMessage POST body { author, text}
    } else {
      console.log("Нечего посылать");
    }

    setMyMessage("");
  }

  //===================================
  function fnCloseChat() {
    console.log("Закрываем чат");
    // isActive = false;
    // очищаем окно диалога
  }

  //===================================
  function fnHistory() {
    console.log("Загружаем историю");
    // Загружаем список чатов
    // в сисок с выбором
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
          </div>
          <div className="chat-send">
            <input
              className="chat-input"
              type="text"
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
            />
            <button className="chat-send-btn" onClick={fnSedMessage}>
              &gt;
            </button>
          </div>
          <div className="chat-send">
            <button className="chat-btn-clshist" onClick={fnCloseChat}>
              Закончить
            </button>
            <button className="chat-btn-clshist" onClick={fnHistory}>
              История
            </button>
          </div>
        </div>
      )}
    </>
  );
}
