import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actUsersList } from "../store/actions/actionCreators";
import UsersItem from "./UsersItem";

export default function Users() {
  const { users } = useSelector((state) => state.usersList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actUsersList());
  }, []);

  function fnAddUser() {
    console.log("Добавляем пользователя");
    navigate("/signup");
  }

  function hendlerIcon(event, id) {
    console.log("HENDLER USERS ", event.target.getAttribute('data-title'));
    const action = event.target?.alt;
    switch (action) {
      case "view":
        console.log("Переход на страницу просмотра пользователя", id);
        navigate(`/userview/${id}`);
        break;
      case "edit":
        console.log("Редактирование пользователя", id);
        break;
      case "delete":
        console.log("Удалние пользователя", id);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="mainpage">
        <button onClick={fnAddUser} type="submit" className="form-button">
          Добавить
        </button>
        {users ? (
          <table className="users-table">
            <tr>
              <th className="users-table-th">ID</th>
              <th className="users-table-th">name</th>
              <th className="users-table-th">email</th>
              <th className="users-table-th"></th>
            </tr>
            {users.map((item) => (
              <UsersItem key={item._id} item={item} hendlerIcon={hendlerIcon} />
            ))}
          </table>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
