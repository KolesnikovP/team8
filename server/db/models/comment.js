const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    userName: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.TEXT,
    },
    userAvatar: {
      type: DataTypes.TEXT,
    },
    messageText: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
