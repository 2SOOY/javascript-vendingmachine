export const getDataFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setDataToLocalStorage = (key, value) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error(err);
  }
};
