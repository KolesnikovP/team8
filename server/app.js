require('dotenv').config();
const express = require('express')
const PORT = process.env.PORT || 3000;
const app = express();
const Router = require('./router/router');

app.use('/api', Router);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server start at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
