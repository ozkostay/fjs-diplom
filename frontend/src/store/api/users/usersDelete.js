export const usersDelete = async (param) => {
  // const url = `${process.env.REACT_APP_BACK_URL}/api/auth/login`;
  console.log("===== PARAM SAGA DELETE", param);
  
  const url =
    process.env.REACT_APP_BACK_URL +
    process.env.REACT_APP_POSTFIX_USERS +
    "/" +
    param;

  // const { email, passwordHash, name, phone, role } = param;
  // const body = { email, passwordHash, name, contactPhone: phone, role };
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(body),
  };

  console.log("DELETE 222 url: ", url);
  const response = await fetch(url, options);
  console.log("DELETE 333", response);

  if (!response.ok) {
    console.log('Not OK!!!')
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    console.log("SAGA DELETE USER OK!!!", data);
    return data;
  }
};
