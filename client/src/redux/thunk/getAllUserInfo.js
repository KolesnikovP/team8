export const getAllUserInfo = (id, func) => {
  fetch('http://localhost:4000/api/getInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => func(data));
};
