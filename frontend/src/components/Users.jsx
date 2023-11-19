import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();

  function fnAddUser() {
    console.log('Добавляем пользователя');
    navigate('/signup');
  }

  return (
    <>
      <div className="mainpage">
        <button onClick={fnAddUser} type="submit" className="form-button">Добавить</button>
        <div className="read">
          Список пользователей.
        </div>
        
      </div> 
      
    </>
  );
}
