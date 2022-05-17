/* eslint-disable no-restricted-syntax */
function filterByProp(arr1, prop) {
  const seen = {};
  const result = arr1.filter((item) => {
    if (seen[item[prop]]) {
      return false;
    }
    seen[item[prop]] = true;
    return true;
  });
  return result;
}

export const getNews = (id, func) => {
  fetch(`https://team8elbrus.herokuapp.com/api/getHistory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      func(filterByProp(data, 'idSms'));
    });
};
