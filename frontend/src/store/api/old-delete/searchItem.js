export const searchItem = async (search) => {
  const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}/${search}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
