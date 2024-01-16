import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        onClick={(e) => fnLiOnClick(e, item._id)}
        onMouseOver={(e) => fnOnMouseOver(e)}
        onMouseLeave={(e) => fnOnMouseLeave(e)}
      >
        <span className="mchat-name">{item.user.name}</span>
        <div className="mchat-signal"> </div>
      </li>
    </>
  );
}
