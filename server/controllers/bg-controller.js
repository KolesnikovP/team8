const { BgVideo } = require('../db/models');

class BgVideoController {
  async getListBg(req, res) {
    try {
      const gamesList = await BgVideo.findAll({ raw: true });
      res.json(gamesList);
    } catch (error) {
      console.error('Message: ', error);
    }
  }
}

module.exports = new BgVideoController();
