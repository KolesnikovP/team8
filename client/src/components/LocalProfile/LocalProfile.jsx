/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Container, Typography, Button, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserInfo } from '../../redux/thunk/getAllUserInfo';
import VideoBg from '../VideoBg/VideoBg';
import { getFetchAllUserRating } from '../../redux/thunk/rating';

function LocalProfile() {
  const dispatch = useDispatch();
  const params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [user1, setUser] = useState(null);
  const [games, setGames] = useState(null);
  const [posts, setPosts] = useState(null);
  const [bg, setBg] = useState(null);
  const [value, setValue] = useState(null);
  const { user } = useSelector((state) => state.userReducer);
  // const bgDef =
  //   'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/730/28280d425d20a4d8cd9cfeff3389c234968ca301.webm';
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

  useEffect(() => {
    dispatch(getFetchAllUserRating(user, user1, value));
  }, [value]);

  const { rating } = useSelector((state) => state.ratingReducer);
  console.log(rating.length);
  return (
    <Box>
      {bg && <VideoBg bg={bg} />}
      <Container>
        <Box>
          <Typography variant="h3" color="primary" sx={{ textAlign: 'center', paddingTop: '2rem' }}>
            {user1?.steamNickname}
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
              src={user1?.steamAvatar}
              sx={{ width: 220, height: 220, border: '1px solid #90caf9' }}
            />
            <Box>
              <Typography sx={{ maxWidth: '400px' }}>{user1?.description}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Button type="Button" onClick={() => openSteam()} variant="outlined">
                Открыть профиль в стиме
              </Button>
              {rating.length === 0 ? (
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              ) : (
                <Rating name="read-only" value={rating.userRating} readOnly />
              )}
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
    </Box>
  );
}

export default LocalProfile;
