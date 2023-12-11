import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserSignup, actUsersList } from "../../store/actions/actionCreators";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function hendlerSubmit(event) {
    event.preventDefault();
    const body = { email, passwordHash: password, name, phone, role };
    dispatch(actUserSignup(body));
    if (!user) {
      navigate("/signin");
    } else {
      navigate("/users");
    }
  }

  return (
    <>
      <div className="home bb">
        <div>контроль ROLE: {role}</div>
        <form>
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
                <option value="menager">Менеджер</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
          ) : (
            ""
          )}

          <button
            style={{ width: "250px" }}
            onClick={hendlerSubmit}
            type="submit"
            className="form-button"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
}
