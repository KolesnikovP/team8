require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sessionFileStore = require('session-file-store');
// const models = require('./models/models');

const PORT = process.env.PORT || 3000;
const app = express();
const Router = require('./router/router');
const FileStore = sessionFileStore(session);
app.use(cookieParser());
app.use(session({
  key: app.get('session cookie name'),
  secret: 'ourTeamLeadTheBest',
  store: new FileStore({logFn: function(){}}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
}));

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: true // allow session cookie from browser to pass through
  })
  );

app.use('/api', Router);
  
  app.get('/api/check', (req,res)=>{
    console.log('TUT +++++>>>')
    console.log(req.session.user)
    res.json('check')
  })
  

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server start at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
