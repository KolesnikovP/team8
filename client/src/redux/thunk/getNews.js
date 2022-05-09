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
      const bbCode = /\[\/img]/gm;
      const test = data.match(bbCode);
      if (test) {
        console.log('bbcoe');
        return func(data);
      }
      let newData = '';
      const re2 = /(<img)/gm;
      newData = data.replace(re2, '$1 width="800"');
      // console.log(newData);
      return func(newData);
    });
};
