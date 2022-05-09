/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Avatar, Box, Container, TextareaAutosize, Typography } from '@mui/material';
import { fetchUserGames } from '../../redux/thunk/user';
import { setUserDescribe } from '../../redux/thunk/userProfile';
import { setProfileGames } from '../../redux/reducers/profileReducer';

function Profile() {
  const { user } = useSelector((state) => state.userReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    dispatch(fetchUserGames(user?.steamId));
  }, [user]);
  function openSteam (){
    window.open(`${user.steamProfileLink}`);
  }
  function updateStats(){
    fetch('http://localhost:4000/api/updateUserStats',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:user.steamId }),
    }).then((response) => response.json()).then((data) => dispatch(setProfileGames(data)))
  }
  const [textAriaValue, settextAriaValue] = useState(`${user.description}`)
  function changeDesc(){
    dispatch(setUserDescribe(user.steamId, textAriaValue))
    setHidden(!hidden)
  }
  return (
    <Container>
    <Box sx={{marginTop: '2rem'}}>
      <Typography variant="h3" color="primary" sx={{textAlign: 'center'}}>{user.steamNickname}</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-around', marginTop:'2rem', border: '1px solid #90caf9', padding: '2rem', borderRadius: '1rem'}}>
        <Avatar 
        src={user.steamAvatar} 
        sx={{ width: 220, height: 220, border: '1px solid #90caf9' }}
        />
        <Box>
          {hidden ? 
          <Typography
          sx={{maxWidth: '400px'}}
          >{user.description}</Typography>
           :
          <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center'}}> 
          <TextareaAutosize 
          onChange={(e)=>settextAriaValue(e.target.value)} 
          defaultValue={user.description || '' }
          style={{ width: 400 ,fontSize: '20px'}}
          minRows={10}
          />
          <Button sx={{marginTop:'1rem'}} type="Button" onClick={()=>changeDesc()} variant="outlined">Изменить</Button>
          </Box>
          }
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
          <Button 
          type="Button" 
          onClick={()=>openSteam()}
          variant="outlined"
          >
            Открыть профиль в стиме
            </Button>
            <Button 
          type="Button" 
          onClick={()=>updateStats()}
          variant="outlined"
          color="success"
          >
            Обновить профиль
            </Button>
          {hidden ? 
          <Button 
          type="Button" 
          onClick={()=>setHidden(!hidden)}
          variant="outlined"
          >
            Редактировать описание профиля
          </Button>
           :
          ''
          }
          
        </Box>
      </Box>
      {profGames.map((game, i) => (
        <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '2rem'}} key={game.gameSteamId}>
          <Typography>{i+1}</Typography>
          <Typography variant="h4">{game.gameName}</Typography>
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
            alt={`appIcon_${game.gameSteamId}`}
            width="200px"
            key={Date.now()}
          />
          <Typography>Количество часов: {game.userGameHours}</Typography>
        </Box>
      ))}
    <Box>
      <Typography variant="h3">Comments block soon...</Typography>
    </Box>
    </Box>
    </Container>
  );
}

export default Profile;
