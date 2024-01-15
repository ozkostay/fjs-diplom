export const findUserRequest = async (params) => {
  console.log("===PAR===", params);
  const url =
    process.env.REACT_APP_BACK_URL +
    `/api/client/support-requests/?id=${params}`;

    try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Ошибка в TRY");
      return { errorStatus: response.status, errorStatusText: response.statusText };
    }
    const data = await response.json()
    console.log("DATA", data);
    return data;
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
    return null;
  }


  // return new Promise((resolve) => {
  //   resolve("WWW");
  // });
};
