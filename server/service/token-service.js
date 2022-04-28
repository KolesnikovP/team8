const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({
      where: {
        user_id: userId,
      },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      const data = await Token.update(
        { refreshToken },
        { where: { user_id: userId } },
      );
      return data;
    }
    const token = new Token({
      user_id: userId,
      refreshToken,
    });
    await token.save();
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = Token.destroy({ where: { refreshToken } });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = Token.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
