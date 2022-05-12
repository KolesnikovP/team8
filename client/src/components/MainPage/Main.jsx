import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, Button, Container, Typography } from '@mui/material';
// import Comment from '../CommentsList/Comment/Comment';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import Comment from '../CommentsList/Comment/Comment';

function Main() {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const images = [
    {
      imgPath: './img/backgroundPng/cs1.png',
    },
    {
      imgPath: './img/backgroundPng/dota1.png',
    },
    {
      imgPath: './img/backgroundPng/pubg.png',
    },
  ];
  const { comments } = useSelector((state) => state.commentReducer);
  const [comSort, setComSort] = useState('');
  useEffect(() => {
    const filtered = comments.sort((a, b) => b.createdAt - a.createdAt);
    const shortAr = filtered.slice(0, 11);
    setComSort(shortAr);
  }, [comments]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {images.map((step, index) => (
          <div key={Math.random()}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Box
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <Typography
          variant="h2"
          sx={{ borderBottom: '2px solid white', paddingBottom: '2rem', fontWeight: 'bold' }}
        >
          Добро пожаловать на Team8
        </Typography>
        <Box sx={{ paddingTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">
            Тут вы можете найти себе тиммейта или команду для ваших любимых игр.
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ marginLeft: '1rem' }}
            onClick={() => navigate('/login')}
          >
            Давайте начнем
          </Button>
        </Box>
      </Box>
      <Container>
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Вам стало скучно играть одному или просто хотите найти новых друзей?
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            У нас вы сможете:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <img
              src="./img/demos/demo2.png"
              alt="demo1"
              width="400px"
              sx={{ border: '1px solid black', borderRadius: '2000px' }}
            />
            <Typography variant="h5" sx={{ maxWidth: '400px' }}>
              Найти себе напарника в самых популярных играх
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <Typography variant="h5" sx={{ maxWidth: '400px' }}>
              Вас смогут найти и взять к себе в команду
            </Typography>
            <img
              src="./img/demos/demo1.png"
              alt="demo1"
              width="400px"
              sx={{ border: '1px solid black', borderRadius: '2000px' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <img
              src="./img/demos/demo3.png"
              alt="demo1"
              width="400px"
              sx={{ border: '1px solid black', borderRadius: '2000px' }}
            />
            <Typography variant="h5" sx={{ maxWidth: '400px' }}>
              Следить за новостями игр в которые вы играете
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <Typography variant="h5" sx={{ maxWidth: '400px' }}>
              Найти себе сильного напарника у которого много опыта
            </Typography>
            <img
              src="./img/demos/demo4.png"
              alt="demo1"
              width="400px"
              sx={{ border: '1px solid black', borderRadius: '2000px' }}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ marginTop: '4rem', textAlign: 'center' }}>
            Отзывы наших пользователей
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                marginTop: '3rem',
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'center',
              }}
            >
              {comSort.length
                ? comSort.map((comment) => {
                    return <Comment key={Math.random()} comment={comment} />;
                  })
                : ''}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Main;
