<<<<<<< HEAD
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
=======
// function unique(arr) {
//   let result = [];

//   for (let str of arr) {
//     if (!result.includes(str)) {
//       result.push(str);
//     }
//   }

//   return result;
// }
>>>>>>> c121feacc63de88387567b272b80f16f5c69abaf

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
<<<<<<< HEAD
      func(filterByProp(data, 'idSms'));
=======
      // console.log(data);
      // unique(data);
      func(data);
>>>>>>> c121feacc63de88387567b272b80f16f5c69abaf
    });
};
