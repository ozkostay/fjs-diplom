export const roomsListSearch = async (objParams) => {
  // console.log("SAGA API ROOMS LIST", objParams);
  const { offset, limit, hotelId } = objParams;
  const roomsUrl =
    process.env.REACT_APP_BACK_URL +
    "/api/common/hotel-rooms/" +
    `?offset=${offset}&limit=${limit}&hotelid=${hotelId}`;
  
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const response = await fetch(roomsUrl, options);
  
  if (!response.ok) {
    console.log("ERR");
    throw new Error(response.statusText);
  } else {
    return await response.json();
  }
};
