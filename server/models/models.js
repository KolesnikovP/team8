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
  friendList_id: { type: DataTypes.INTEGER },
  statistic_id: { type: DataTypes.INTEGER },
  // email: { type: DataTypes.STRING, unique: true }
});

const FriendsList = sequelize.define('friendsList', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  steamId: { type: DataTypes.INTEGER },
});

const Statistic = sequelize.define('statistic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  game_id: { type: DataTypes.INTEGER },
  userGameHours: { type: DataTypes.INTEGER },
  userRank: { type: DataTypes.INTEGER },
});

const Game = sequelize.define('game', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameSteam_id: { type: DataTypes.INTEGER },
  gameSteamName: { type: DataTypes.STRING },
});

const UserCreatePost = sequelize.define('userCreatePost', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
  user_rank: { type: DataTypes.INTEGER },
  user_steamAvatar: { type: DataTypes.STRING },
  status: { type: DataTypes.BOOLEAN },
});

User.hasOne(FriendsList);
FriendsList.belongsTo(User);

User.hasMany(UserCreatePost);
UserCreatePost.belongsTo(User);

User.hasMany(Statistic);
Statistic.belongsTo(User);
