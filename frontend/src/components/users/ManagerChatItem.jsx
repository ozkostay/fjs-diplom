import React from "react";

export default function ManagerChatItem({
  item,
  fnLiOnClick,
  fnOnMouseOver,
  fnOnMouseLeave,
}) {
  return (
    <>
      <li
        className="mchat-users-cell"
        onClick={(e) => fnLiOnClick(e, item._id, item.user)}
        onMouseOver={(e) => fnOnMouseOver(e)}
        onMouseLeave={(e) => fnOnMouseLeave(e)}
      >
        <span className="mchat-name">{item.user.name}</span>
        <div className="mchat-signal"> </div>
      </li>
    </>
  );
}
