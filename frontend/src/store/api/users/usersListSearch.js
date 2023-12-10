export const usersListSearch = async (params) => {
  // const url = `${process.env.REACT_APP_BACK_URL}/api/auth/login`;
  console.log("SAGA API USER LIST", params);
  const { offset, limit, search } = params;
  //?offset=0&limit=3&search=qwe5
  const url =
    process.env.REACT_APP_BACK_URL + 
    process.env.REACT_APP_POSTFIX_USERS +
    `?offset=${offset}&limit=${limit}&search=${search}`;
  // console.log('== URL' ,url);
  // const { email, password } = param;
  // const body = { email, passwordHash: password };
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   },
  //   body: JSON.stringify(body),
  // };
  // const response = await fetch(url, options);
  const response = await fetch(url);
  if (!response.ok) {
    console.log("ERR");
    throw new Error(response.statusText);
  } else {
    console.log("API USERS LIST наконец-то GOOD");
  }
  return await response.json();
};
