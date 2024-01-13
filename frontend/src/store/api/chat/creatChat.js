export const createChat = async (body) => {
  console.log("===== PARAM API createChat", JSON.stringify(body));
  const url =
    process.env.REACT_APP_BACK_URL +
    `/api/client/support-requests`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(url, options);
    // console.log("RES", res);
    if (!res.ok) {
      console.log('Ошибка в TRY');
      return { errorStatus: res.status, errorStatusText: res.statusText};  
    }
    // const data = await res.json()
    // console.log("DATA", data);
    return await res.json()
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
    return null
  }
};
