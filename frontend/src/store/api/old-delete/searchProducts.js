export const searchProducts = async (search) => {
  const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}${search}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  return json;
};
