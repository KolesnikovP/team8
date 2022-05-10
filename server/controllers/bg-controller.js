const { BgVideo } = require('../models/models');

class BgVideoController {
  async getListBg(req, res, next) {
    try {
      const gamesList = await BgVideo.findAll({ raw: true });
      res.json(gamesList);
    } catch (error) {
      console.error('Message: ', error);
    }
  }
}

module.exports = new BgVideoController();
