const fetch =  require ('cross-fetch');
const e = require('express');
const { Game, Statistic, User } = require('../models/models');

class UserController {

  async authSuccess (req, res, next) {
    if (req.user) {
      const userDto = await User.findOne({where:{
        steamId: req.user.id
      }})
      res.status(200).json({
        success: true,
        message: "successfull",
        user: userDto,
        //   cookies: req.cookies
      });
    }
  }
  async authFailed (req,res, next) {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }

  async authLogout (req,res, next) {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  }
  async authFailed (req,res, next) {

  }
  async validateProfile (req, res, next) {
    if(req.body.id){
      const validate = await Statistic.findAll({where:{
        steamId: req.body.id,
      }})
      if(validate.length){
        res.json(validate)
      }
      if(validate.length === 0) {
        const response = await fetch(
          `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DA22CF06CD504ADB087C83908040E3C6&steamid=${req.body.id}&format=json`
        )
        const userGames = await response.json();
        const gamesFromDb = await Game.findAll();
        const resArray = []
          gamesFromDb.map((el)=>{
          userGames.response.games.map((game) => {
            if(el.gameSteamId === game.appid){
              const statUser = new Statistic({
                userGameHours: Math.floor(game.playtime_forever / 60),
                userRank: 0,
                steamId: req.body.id,
                gameSteamId: game.appid
              })
              statUser.save()
              resArray.push(statUser)
            }
          })
        })
        if(resArray.length === 0){
          res.json({message:'Games not found'})
        }
        else {
          res.json(resArray)
        }
      }
    }
  }
  async userGames (req,res, next) {
    if(req.body.id){
      try{
        const games = await Statistic.findAll({
          steamId: req.body.id
        })
        res.json(games)
      }
      catch{
        console.log('Games for user not found')
      }
    }

  }
}

module.exports = new UserController();
