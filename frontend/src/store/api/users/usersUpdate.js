export const usersUpdate = async (param) => {
  console.log('===== PARAM SAGA USER UPDATE', param );
  const { id } = param;
  const url =
    process.env.REACT_APP_BACK_URL + 
    process.env.REACT_APP_POSTFIX_USERS +
    '/' + id;
  const { name, contactPhone, role } = param;
  const body = { name, contactPhone, role };
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  };

  // console.log('222');
  const response = await fetch(url, options);
  // console.log('333', response);
  
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    console.log('SAGA USER UPDATE OK!!!', data)
    return data;
  }
};
