// manager/support-request
// findRequestById
export const findRequestById = async (params) => {
  // console.log(" === getUsersFromRequests ");
  const url =
    process.env.REACT_APP_BACK_URL +
    `/api/manager/support-request/?id=${params}`;
    // console.log('findRequestById url', url);

    try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Ошибка в TRY findRequestById");
      return { errorStatus: response.status, errorStatusText: response.statusText };
    }
    const data = await response.json()
    // console.log("DATA findRequestById", data);
    return data;

  } catch (e) {
    console.log("ERROR findRequestById", e.massage);
    return null;
  }


  // return new Promise((resolve) => {
  //   resolve("WWW");
  // });
};