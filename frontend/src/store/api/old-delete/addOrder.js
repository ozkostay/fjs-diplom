export const addOrder = async (order) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  };
  const response = await fetch(
    `${process.env.REACT_APP_SEARCH_URL}order`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};
