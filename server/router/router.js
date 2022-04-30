const Router = require('express').Router();
const SteamGamesController = require('../controllers/steamGames-controller');
const fetch =  require ('cross-fetch');


Router.get("/addPost", SteamGamesController.getListGames);

Router.post('/test', async(req,res) => {
  if(req.body.id){
    const response = await fetch(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DA22CF06CD504ADB087C83908040E3C6&steamid=${req.body.id}&format=json`
    )
    const data = await response.json();
    res.json(data)
    
  }
  else {
    res.send('error')
  }
})

module.exports = Router;
