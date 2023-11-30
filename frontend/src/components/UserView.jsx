import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserView() {
  const { users } = useSelector((state) => state.usersList);
  const [user, setUser] = useState(null);
  // const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    const userItem = users.find((item) => item._id === id);
    if (userItem !== -1) {
      setUser(userItem);
    }
    console.log('useEffect ', userItem);
  }, []);

  // _id: "654f737d190fb81f8993fd36", email: "qwe8@qwe.ru", passwordHash: "$2b$10$.q49CYo1LTo8dmOsobSkHOeBSWR73QHH1m7zqv6rBT.XfCQ5RfGeW", name: "Konst", contactPhone: "+79518082130", role: "admin"

  return (
    <>
      {user && (
        <>
          <div>Данные пользователя</div>
          <div>ID: {user._id}</div>
        </>
      )}
    </>
    
      
    
  );
}
