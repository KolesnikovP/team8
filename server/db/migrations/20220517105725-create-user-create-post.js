module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserCreatePosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      userRank: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      gameId: {
        type: Sequelize.INTEGER,
      },
      userHours: {
        type: Sequelize.TEXT,
      },
      userSteamAvatar: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('UserCreatePosts');
  },
};
