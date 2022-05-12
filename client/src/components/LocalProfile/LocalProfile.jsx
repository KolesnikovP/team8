/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Container, Typography, Button } from '@mui/material';
import { getAllUserInfo } from '../../redux/thunk/getAllUserInfo';
import VideoBg from '../VideoBg/VideoBg';
import PostMin from '../PostMin/PostMin';

function LocalProfile() {
  const params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [games, setGames] = useState(null);
  const [posts, setPosts] = useState(null);
  const [bg, setBg] = useState(null);
  const local = true;
  useEffect(() => {
    if (!userInfo) {
      getAllUserInfo(params.id, setUserInfo);
    }
    setUser(userInfo?.response[0]);
    setGames(userInfo?.response[1]);
    setPosts(userInfo?.response[2]);
    setBg(userInfo?.response[0].bgVideoId);
  }, [userInfo]);
  function openSteam() {
    window.open(`${user?.steamProfileLink}`);
  }
  return (
    <Box>
      {bg && <VideoBg bg={bg} />}
      <Container>
        <Box>
          <Typography variant="h3" color="primary" sx={{ textAlign: 'center', paddingTop: '2rem' }}>
            {user?.steamNickname}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '2rem',
              border: '1px solid #90caf9',
              padding: '2rem',
              borderRadius: '0.3rem',
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
          <Box sx={{ marginTop: '2rem' }}>
            {posts?.length ? (
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Ищет напарников
              </Typography>
            ) : (
              ''
            )}
            <Box>
              {posts?.length
                ? posts.map((post) => <PostMin post={post} key={post.id} local={local} />)
                : ''}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LocalProfile;
