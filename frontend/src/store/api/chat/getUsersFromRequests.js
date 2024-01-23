export const getUsersFromRequests = async () => {
  // console.log(" === getUsersFromRequests ");
  const url =
    process.env.REACT_APP_BACK_URL +
    `/api/manager/support-requests-users`;
    // console.log('getUsersFromRequests url', url);

    try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Ошибка в TRY getUsersFromRequests");
      return { errorStatus: response.status, errorStatusText: response.statusText };
    }
    const data = await response.json()
    // console.log("DATA getUsersFromRequests", data);
    return data;

  } catch (e) {
    console.log("ERROR getUsersFromRequests", e.massage);
    return null;
  }


  // return new Promise((resolve) => {
  //   resolve("WWW");
  // });
};
