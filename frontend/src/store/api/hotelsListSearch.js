export const hotelsListSearch = async (param) => {
  console.log('SAGA API HOTELS LIST');
  const url = process.env.REACT_APP_BACK_URL + process.env.REACT_APP_POSTFIX_HOTELS;
  const response = await fetch(url);
  if (!response.ok) {
    console.log('ERR');
    throw new Error(response.statusText);
  } else {
    console.log('API USERS LIST наконец-то GOOD');
  }
  return await response.json();
};
