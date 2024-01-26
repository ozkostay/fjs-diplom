import React from "react";

export default function ManagerChatDialogItem({ item, chatOwner }) {
  return (
    <>
      {item.author === chatOwner.user._id ? (
        <div className="message-wrap" style={{ justifyContent: "flex-end" }}>
          <div className="message-client">{item.text}</div>
        </div>
      ) : (
        <div>
          <div className="message-wrap">
            <div className="message-manager">{item.text}</div>
          </div>
        </div>
      )}
      <div className="message-wrap"></div>
    </>
  );
}
