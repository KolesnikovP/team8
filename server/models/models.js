const sequelize = require('../db');
// eslint-disable-next-line import/order
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  steamId: { type: DataTypes.INTEGER, unique: true },
  steamNickname: { type: DataTypes.STRING, unique: true },
  steamProfileLink: { type: DataTypes.STRING, unique: true },
  steamAvatar: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  // activationLink: { type: DataTypes.STRING },
  // isActivated: { type: DataTypes.BOOLEAN },
  // friend_id: { type: DataTypes.INTEGER },
  // statistic_id: { type: DataTypes.INTEGER },
  // email: { type: DataTypes.STRING, unique: true }
});

const FriendsList = sequelize.define('friendsList', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Friend = sequelize.define('friend', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // user_id: { type: DataTypes.INTEGER },
});

const Statistic = sequelize.define('statistic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // game_id: { type: DataTypes.INTEGER },
  userGameHours: { type: DataTypes.INTEGER },
  userRank: { type: DataTypes.INTEGER },
});

const Game = sequelize.define('game', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameSteamId: { type: DataTypes.INTEGER },
  gameSteamName: { type: DataTypes.STRING },
});

const UserCreatePost = sequelize.define('userCreatePost', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // user_id: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
  userRank: { type: DataTypes.INTEGER },
  userSteamAvatar: { type: DataTypes.STRING },
  status: { type: DataTypes.BOOLEAN },
});

User.belongsToMany(Friend, { through: FriendsList });
Friend.belongsToMany(User, { through: FriendsList });
// Friend.hasMany(User);
// User.belongsTo(Friend);

// User.hasOne(FriendsList);
// FriendsList.belongsTo(User);

// FriendsList.hasMany(Friend);
// Friend.belongsTo(FriendsList);

User.hasMany(UserCreatePost);
UserCreatePost.belongsTo(User);

User.hasMany(Statistic);
Statistic.belongsTo(User);

Game.hasOne(Statistic);
Statistic.belongsTo(Game);

Game.hasMany(UserCreatePost);
UserCreatePost.belongsTo(Game);

module.exports = {
  User,
  Friend,
  FriendsList,
  UserCreatePost,
  Game,
  Statistic,
};
