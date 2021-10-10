export const saveToLocalStorage = (key, value) => {
  const stringified = JSON.stringify(value);
  localStorage.setItem(key, stringified);
};
export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  const parsed = JSON.parse(value);
  return parsed;
};
