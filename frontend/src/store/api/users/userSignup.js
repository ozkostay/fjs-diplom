export const userSignup = async (param) => {
  // const url = `${process.env.REACT_APP_BACK_URL}/api/auth/login`;
  console.log('===== PARAM SAGA SIGNUP', param );
  const url =
    process.env.REACT_APP_BACK_URL + process.env.REACT_APP_POSTFIX_SIGNUP;
  const { email, passwordHash, name, phone, role } = param;
  const body = { email, passwordHash, name, contactPhone: phone, role };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  };

  console.log('222');
  const response = await fetch(url, options);
  console.log('333', response);
  
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    console.log('SAGA signup OK!!!', data)
    return data;
  }
};
