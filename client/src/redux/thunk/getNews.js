export const getNews = (id, func) => {
  fetch(`http://localhost:4000/api/getNewsGames`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      let newData = '';
      const re1 = /(height="507")/gm;
      const re2 = /"(900)"/gm;
      newData = data.replace(re1, '');
      newData = data.replace(re2, '750');
      console.log(newData);
      return func(newData);
    });
};
