const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatMessage.init({
    idUser: {
      type: DataTypes.TEXT,
    },
    idSms: {
      type: DataTypes.TEXT,
    },
    userName: {
      type: DataTypes.TEXT,
    },
    idChat: {
      type: DataTypes.INTEGER,
    },
    messageText: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};
