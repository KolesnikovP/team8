const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Statistic.init({
    userGameHours: {
      type: DataTypes.INTEGER,
    },
    userRank: {
      type: DataTypes.TEXT,
    },
    gameSteamId: {
      type: DataTypes.TEXT,
    },
    steamId: {
      type: DataTypes.TEXT,
    },
    gameName: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Statistic',
  });
  return Statistic;
};
