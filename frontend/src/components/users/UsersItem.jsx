import React from "react";
import viewIcon from "../../pics/eye.png";
import editIcon from "../../pics/pen.png";
import deleteIcon from "../../pics/remove.png";

export default function UsersItem({ item, index, hendlerIcon, limit }) {
  
  if (index >= limit) {
    return;
  }

  return (
    <>
      <tr key={item._id}>
        <td className="users-table-td users-table-npp">{index + 1}</td>
        <td className="users-table-td users-table-name">
          {item.name.length > 18 ? `${item.name.substr(0, 18)}...` : item.name}
        </td>
        <td className="users-table-td users-table-mail">{item.email}</td>
        <td className="users-table-td users-table-buttons">
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
