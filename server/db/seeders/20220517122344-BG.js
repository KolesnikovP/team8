module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BgVideos', [
      {
        // id: 1,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/730/28280d425d20a4d8cd9cfeff3389c234968ca301.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 2,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1098340/fb38a2a61cd4b9bb0dd15fd6321dd63073cc440d.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 3,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1272160/b3a767c82f40ab060368a341f88c9ea35e532277.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 4,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/632360/9ab7f6a53e4678a3d8b28990f5fb69db74573bc8.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 5,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1145360/e84677d44f5eb1433da0d410c5b20ac3b86000bc.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 6,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/504400/6b570a8ece2b844f3a8724da571cd6b527a4793c.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 7,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1385730/85687190436c55c94e02707531ddb12139b13ebd.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 8,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/292030/07c44b650c5569f30cb343cbd64c090103e2bb7b.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 9,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1218900/346fafe379e2c33173e4f288133ccd5501bbcca3.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 10,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1504020/b63a02e622a9f23fb1887f6272e86bc3ee163ffd.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 11,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/296870/9125f49bf595d6ec4d3115cd2d1d13c653451a5d.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 12,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/874400/c6ec1e32708cb1e403a4c79db03b0128e080e1e8.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 13,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1091500/994eb96bd85c1204e49f38da6e8e90180bdb93c4.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 14,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1504020/a0f84c0cca796d6d011cb5b9f5033a0bc9071c50.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 15,
        link: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/805940/c1d231058c5e26a56489540ccad10c29741f08b4.webm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BgVideo', null, {});
  },
};
