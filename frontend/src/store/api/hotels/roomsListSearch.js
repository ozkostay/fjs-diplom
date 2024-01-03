export const roomsListSearch = async (objParams) => {
  console.log("SAGA API ROOMS LIST", objParams);
  const { offset, limit, hotelId } = objParams;
  const roomsUrl =
    process.env.REACT_APP_BACK_URL +
    "/api/common/hotel-rooms/" +
    `?offset=${offset}&limit=${limit}&hotelid=${hotelId}`;
  console.log("SAGA API Берем номера гостиницы url=", roomsUrl);

  const response = await fetch(roomsUrl);
  if (!response.ok) {
    console.log("ERR");
    throw new Error(response.statusText);
  } else {
    console.log("API ROOMS LIST наконец-то GOOD");
    return await response.json();
  }
};
