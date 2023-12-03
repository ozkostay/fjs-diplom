import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actUsersDelete, actUsersList } from "../store/actions/actionCreators";
import UsersItem from "./UsersItem";

export default function Users() {
  const { users } = useSelector((state) => state.usersList);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);

  // offset: 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('111111111111111111111111');
    dispatch(actUsersList());
  }, []);

  function fnAddUser() {
    console.log("Добавляем пользователя");
    navigate("/signup");
  }

  function hendlerIcon(event, id) {
    console.log("HENDLER USERS ", event.target.getAttribute("data-title"));
    const action = event.target?.alt;
    switch (action) {
      case "view":
        console.log("Переход на страницу просмотра пользователя", id);
        navigate(`/userview/${id}`);
        break;
      case "edit":
        console.log("Редактирование пользователя", id);
        navigate(`/useredit/${id}`);
        break;
      case "delete":
        console.log("Удалние пользователя", id);
        dispatch(actUsersDelete(id));
        break;
      default:
        break;
    }
  }

  function fnChangeLimit(event) {
    setOffset(0);
    setLimit(Number(event.target.value));
  }
  
  function fnSetOffset(type) {
    if (type === 'incr') {
      if(users.length <= offset * limit + limit) {
        return
      }
      setOffset(offset + 1);
    } else {
      setOffset(offset === 0 ? 0 : offset -1);
    }
    
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
            <select value={limit} onChange={fnChangeLimit}>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>

        {users ? (
          <>
            <table className="users-table">
              <tr className="">
                <th className="users-table-th users-table-npp">ID</th>
                <th className="users-table-th users-table-name">name</th>
                <th className="users-table-th users-table-mail">email</th>
                <th className="users-table-th users-table-buttons"></th>
              </tr>
              {users.map((item, index) => (
                <UsersItem
                  offset={offset}
                  limit={limit}
                  key={item._id}
                  index={index}
                  item={item}
                  hendlerIcon={hendlerIcon}
                />
              ))}
            </table>
            <div className="paging">
              <button className="paging-button" onClick={() => fnSetOffset('decr')}>&lt;</button>
              <span className="paging-span">{offset + 1}</span>
              <button className="paging-button" onClick={() => fnSetOffset('incr')}>&gt;</button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
