export const roomsAdd = async (formData) => {
  console.log("===== PARAM SAGA rooms ADD", formData, '555', formData instanceof FormData);
  const url =
    process.env.REACT_APP_BACK_URL +
    process.env.REACT_APP_POSTFIX_ROOMS;
  const options = {
    method: "POST",
    body: formData,
  };
  try {
    const res = await fetch(url, options);
    console.log("RES", res.text());
    alert("Номер успешно добавлен!");
  } catch (e) {
    console.log("ERROR UPLOAD", e.massage);
  }
};
