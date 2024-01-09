import React from "react";

export default function Home() {
  // async function hendlerSubmit(event) {
  //   // console.log('Rading...', REACT_APP_KONST);
  //   event.preventDefault();
  //   // console.log('Yes SUBMIT', process.env.REACT_APP_BACK_URL);
  //   const url = `${process.env.REACT_APP_BACK_URL}/api/users/testtoken`;
  //   const token = 'Bearer ' + localStorage.getItem('token');
  //   console.log(token);
  //   // const body = { email, password, firstName, lastName };
  //   // console.log('===BODY ===',body);
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       'Authorization': token
  //     },
  //   };
  //   try {
  //     const data = await fetch(url, options);
  //     const response = await data.json();
  //     if (response.statusCode) {
  //       // console.log('response STATUSCODE === ', response.statusCode);
  //       alert(response.message);
  //     } else {
  //       console.log('response YES === ', response);
  //       // localStorage.setItem("token", response.access_token);
  //       alert('Прочитали успешно!');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <>
      <div className="mainpage">
        <div className="firstpage bb">
          <h1>НЕТОЛОГИЯ</h1>
          <h1>TRAVEL</h1>
          <span>Лучшие гостиницы мира</span>
        </div>

        {/* <button onClick={hendlerSubmit} type="submit" className="form-button">Отправить</button> */}
      </div>
    </>
  );
}
