import React, { useEffect, useRef, useState } from "react";
import chat from "../pics/chat.png";

export default function Chat() {
  const [isChat, setIsChat] = useState(false);
  const [myMessage, setMyMessage] = useState('');
  const dialog = useRef();

  useEffect(() => {
    // console.log('dialog.current',dialog.current);
    if (dialog.current) {
      dialog.current.scrollTop = 99999;  
    }
  },[dialog.current])

  function fnSedMessage() {
    console.log('Посылаем сообщение', myMessage);
    setMyMessage('');

  }

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
          </div>
          <div className="chat-send">
            <input className="chat-input" type="text" value={myMessage} onChange={(e) => setMyMessage(e.target.value)}/>
            <button className="chat-send-btn" onClick={fnSedMessage}>&gt;</button>
          </div>
        </div>
      )}
    </>
  );
}
