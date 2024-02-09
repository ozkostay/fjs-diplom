import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actUserError,
  actUserSignup,
  actUsersList,
} from "../../store/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import WinError from "../Error";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  const { user, userError } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const showMessage = useRef();

  // ====================================
  useEffect(() => {
    if (userError && userError.type !== 'err') {
      clearFields();
    }
    // setTimeout(aaa(), 3000);
  },[userError]) 

  //====================================
  function hendlerSubmit(event) {
    event.preventDefault();
    const body = { email, passwordHash: password, name, phone, role };
    dispatch(actUserSignup(body));
    if (!user) {
      // navigate("/signin");
    } else {
      // navigate("/users");
    }
  }

  //====================================
  function clearFields() {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
  }

  //====================================
  return (
    <>
      {userError && <WinError type={userError.type} clearFields={clearFields}>{userError.text}</WinError> }
      <main className="mainpage">
        <div className="home flex-col">
          <div className="cl-black">
            <h1 className="title-login">Регестрация</h1>
          </div>
          <form className="flex-col">
            <div className="pol">
              <span className="input-span">email</span>
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <span className="input-span">Пароль</span>
              <input
                className="login-input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <span className="input-span">Имя</span>
              <input
                className="login-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <span className="input-span">Телефон</span>
              <input
                className="login-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {user?.role === "admin" ? (
              <div>
                <span className="input-span">Роль</span>
                <select
                  className="login-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="client">Клиент</option>
                  <option value="manager">Менеджер</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            ) : (
              ""
            )}

            <button
              className="form-button"
              style={{ width: "250px" }}
              onClick={hendlerSubmit}
              type="submit"
              
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
