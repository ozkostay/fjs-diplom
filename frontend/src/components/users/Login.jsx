import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserLogin } from "../../store/actions/actionCreators";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  },[user]);

  function hendlerSubmit(event) {
    event.preventDefault();
    dispatch(actUserLogin({ email, password }));
  }

  return (
    <>
      <div>Войдите в систему</div>
      <div className="home bb">
        <form>
          <div className="pol">
            <span className="input-span">email</span>
            <input 
              className="login-input" 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <span className="input-span">Пароль</span>
            <input 
              className="login-input"
              type="text"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={hendlerSubmit} type="submit" className="form-button">Войти</button>
        </form>
      </div> 
      <div>контроль user: {user ? user.name : 'no'}</div>
    </>
  );
}