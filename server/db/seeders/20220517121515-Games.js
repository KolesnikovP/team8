module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Games', [
      {
        gameSteamId: 730,
        gameSteamName: 'Counter-Strike: Global Offensive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 578080,
        gameSteamName: 'PUBG: BATTLEGROUNDS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 271590,
        gameSteamName: 'Grand Theft Auto V',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 1172470,
        gameSteamName: 'Apex Legends',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 252490,
        gameSteamName: 'RUST',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 359550,
        gameSteamName: 'Rainbow Six Siege',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 252950,
        gameSteamName: 'Rocket League',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 440,
        gameSteamName: 'Team Fortress 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameSteamId: 1506830,
        gameSteamName: 'FIFA 22',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
