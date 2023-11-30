import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actUsersList } from "../store/actions/actionCreators";
import UsersItem from "./UsersItem";

export default function Users() {
  const { users } = useSelector((state) => state.usersList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [trLimit, setTrLimit] = useState('3');

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

  function fnChangeLimit(event) {
    setTrLimit(event.target.value);
  }

  return (
    <>
      <div className="mainpage">
        <div className="users-header">
          <button onClick={fnAddUser} type="submit" className="form-button">
            Добавить
          </button>
          <div>
            <span className="span-limit">Показывать по</span>
            <select value={trLimit} onChange={fnChangeLimit}>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12" >12</option>
            </select>
          </div>
        </div>
        
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
