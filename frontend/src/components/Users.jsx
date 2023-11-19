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

  return (
    <>
      <div className="mainpage">
        {/* <button onClick={() => console.log("USERS", users)} type="submit">
          USERS
        </button> */}
        <button onClick={fnAddUser} type="submit" className="form-button">
          Добавить
        </button>
        {/* <div className="read">
          Список пользователей.
        </div> */}
        {/* <table>
        <tr><th>текст заголовка</th><th>текст заголовка</th></tr> <!--ряд с ячейками заголовков-->
        <tr><td>данные</td><td>данные</td></tr> <!--ряд с ячейками тела таблицы-->
        </table> */}
        {users ? (
          <table className="users-table">
            <tr>
              <th className="users-table-th">ID</th>
              <th className="users-table-th">name</th>
              <th className="users-table-th">email</th>
            </tr>
            {users.map((item) => (
              <UsersItem key={item._id} item={item} />
            ))}
          </table>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
