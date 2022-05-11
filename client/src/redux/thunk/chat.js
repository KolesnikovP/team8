export const getNews = (id, func) => {
  fetch(`http://localhost:4000/api/getHistory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      func(data);
    });
};
