const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BgVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BgVideo.init({
    link: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'BgVideo',
  });
  return BgVideo;
};
