/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Container, Typography, Button } from '@mui/material';
import { getAllUserInfo } from '../../redux/thunk/getAllUserInfo';

function LocalProfile() {
  const params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [games, setGames] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      getAllUserInfo(params.id, setUserInfo);
    } else {
      setUser(userInfo.response[0]);
      setGames(userInfo.response[1]);
      setPosts(userInfo.response[2]);
    }
  });

  function openSteam() {
    window.open(`${user?.steamProfileLink}`);
  }

  return (
    <Container>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h3" color="primary" sx={{ textAlign: 'center' }}>
          {user?.steamNickname}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '2rem',
            border: '1px solid #90caf9',
            padding: '2rem',
            borderRadius: '1rem',
          }}
        >
          <Avatar
            src={user?.steamAvatar}
            sx={{ width: 220, height: 220, border: '1px solid #90caf9' }}
          />
          <Box>
            <Typography sx={{ maxWidth: '400px' }}>{user?.description}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <Button type="Button" onClick={() => openSteam()} variant="outlined">
              Открыть профиль в стиме
            </Button>
          </Box>
        </Box>
        {games?.map((game, i) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '2rem',
            }}
            key={game?.gameSteamId}
          >
            <Typography>{i + 1}</Typography>
            <Typography variant="h4">{game?.gameName}</Typography>
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game?.gameSteamId}/header.jpg?t=1650992920`}
              alt={`appIcon_${game?.gameSteamId}`}
              width="200px"
              key={Date.now()}
            />
            <Typography>Количество часов: {game?.userGameHours}</Typography>
          </Box>
        ))}
        {posts?.map((post) => (
          <Typography key={post?.id}>{post?.description}</Typography>
        ))}
        <Box>
          <Typography variant="h3">Comments block soon...</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LocalProfile;
