import React from "react";
import viewIcon from "../pics/eye.png";
import editIcon from "../pics/pen.png";
import deleteIcon from "../pics/remove.png";

export default function UsersItem({ item, index, hendlerIcon, offset, limit }) {
  // function fnHover(event) {
  //   console.log("FFFFFFFFFFFFFFFFFFF", event.target.getAttribute("data-title"));
  // }
  const indexStart = offset * limit;
  if((index < indexStart) || (index > indexStart + limit - 1)) {
    return;
  }

  return (
    <>
      <tr>
        <td className="users-table-td">{index + 1}</td>
        <td className="users-table-td">{item.name}</td>
        <td className="users-table-td">{item.email}</td>
        <td className="users-table-td">
          <img
            className="users-icon"
            src={viewIcon}
            onClick={(e) => hendlerIcon(e, item._id)}
            data-title="Просмотр"
            alt="view"
          />
          <img
            className="users-icon"
            src={editIcon}
            onClick={(e) => hendlerIcon(e, item._id)}
            data-title="Редактирование"
            alt="edit"
          />
          <img
            className="users-icon"
            src={deleteIcon}
            onClick={(e) => hendlerIcon(e, item._id)}
            data-title="Удалить"
            alt="delete"
          />
        </td>
      </tr>
    </>
  );
}
