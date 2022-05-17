module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userGameHours: {
        type: Sequelize.INTEGER,
      },
      userRank: {
        type: Sequelize.TEXT,
      },
      steamId: {
        type: Sequelize.TEXT,
      },
      gameSteamId: {
        type: Sequelize.TEXT,
      },
      gameName: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statistics');
  },
};
