require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
// const models = require('./models/models');

const PORT = process.env.PORT || 3000;
const app = express();
const Router = require('./router/router');

app.use('/api', Router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server start at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
