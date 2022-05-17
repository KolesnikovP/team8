const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    steamId: {
      type: DataTypes.TEXT,
      unique: true,
    },
    steamNickname: {
      type: DataTypes.TEXT,
      unique: true,
    },
    steamProfileLink: {
      type: DataTypes.TEXT,
      unique: true,
    },
    steamAvatar: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    bgVideoId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
