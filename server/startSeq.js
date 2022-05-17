const sequelize = require('./db');

const start = async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (e) {
    console.log(e);
  }
};

start();
