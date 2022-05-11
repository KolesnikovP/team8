import bbCodeParser from 'js-bbcode-parser';

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
      let newData = '';
      const re2 = /(<img)/gm;
      if (test) {
        const bbToHtml = bbCodeParser.parse(data);
        let clearData = '';
        const re3 = /{STEAM_CLAN_IMAGE}/gm;
        clearData = bbToHtml.replace(
          re3,
          'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/clans/'
        );
        newData = clearData.replace(re2, '$1 width="100%"');
        // console.log(newData);
        return func(newData);
      }

      newData = data.replace(re2, '$1 width="800"');
      // console.log(newData);
      return func(newData);
    });
};
