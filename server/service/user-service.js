class UserService {

  async login(email, password) {
    // const user = await User.findOne({ where: { email } });
    // if (!user) {
    //   throw ApiError.BadRequest('Пользовательно с таким емайлом не найден');
    // }
    // const isPassEqueals = await bcrypt.compare(password, user.password);
    // if (!isPassEqueals) {
    //   throw ApiError.BadRequest('Неверный пароль');
    // }
    // const userDto = new UserDto(user);
    // const tokens = tokenService.generateTokens({ ...userDto });
    // await TokenService.saveToken(userDto.id, tokens.refreshToken);

    // return {
    //   ...tokens, userDto,
    // };
  }
}

module.exports = new UserService();
