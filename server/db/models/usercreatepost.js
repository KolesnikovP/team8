const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCreatePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCreatePost.init({
    description: {
      type: DataTypes.TEXT,
    },
    userRank: {
      type: DataTypes.TEXT,
    },
    userHours: {
      type: DataTypes.TEXT,
    },
    userSteamAvatar: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    gameId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'UserCreatePost',
  });
  return UserCreatePost;
};
