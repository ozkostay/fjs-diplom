export const hotelsListSearch = async (params) => {
  console.log('SAGA API HOTELS LIST', params);
  const { offset, limit, search } = params;
  const url = process.env.REACT_APP_BACK_URL + 
  process.env.REACT_APP_POSTFIX_HOTELS +
  `?offset=${offset}&limit=${limit}&search=${search}`;;
  const response = await fetch(url);
  if (!response.ok) {
    console.log('ERR');
    throw new Error(response.statusText);
  } else {
    // console.log('API HOTELS LIST наконец-то GOOD');
  }
  //const data = 
  //console.log('API HOTEL lIST data=', data);
  return await response.json();
};
