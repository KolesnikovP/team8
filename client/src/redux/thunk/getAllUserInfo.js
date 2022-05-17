export const getAllUserInfo = (id, func) => {
  fetch('https://team8elbrus.herokuapp.com/api/getInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => func(data));
};
