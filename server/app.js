require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
// const models = require('./models/models');

const PORT = process.env.PORT || 3000;
const app = express();
const Router = require('./router/router');


app.use('/api', Router);

app.get('/test', (req,res)=>{
  res.send('Prishlo')
})

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server start at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
