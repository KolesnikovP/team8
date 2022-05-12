import { Alert, Box, Button, Container, TextareaAutosize } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment } from '../../redux/thunk/comments';
import Comment from './Comment/Comment';

function CommentsList() {
  const [com, setCom] = useState('');
  const { user } = useSelector((state) => state.userReducer);
  const { comments } = useSelector((state) => state.commentReducer);
  const [comSort, setComSort] = useState('');
  useEffect(() => {
    const filtered = comments.sort((a, b) => b.createdAt - a.createdAt);
    setComSort(filtered);
  }, [comments]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  function sendCom() {
    dispatch(addNewComment(com, user.steamId));
    setCom('');
    setShow((prev) => !prev);
    setTimeout(() => {
      setShow((prev) => !prev);
    }, 2000);
  }
  return (
    <Container>
      <Box
        sx={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '400px',
            }}
          >
            {show ? (
              <Alert severity="success" sx={{ backgroundColor: '#fff', color: 'green' }}>
                Спасибо за ваш отзыв!
              </Alert>
            ) : (
              ''
            )}
            <Box sx={{ marginTop: '3rem' }}>
              <TextareaAutosize
                onChange={(e) => setCom(e.target.value)}
                placeholder="Тут можно написать хороший отзыв"
                value={com}
                style={{ width: '100%', height: '130px', fontSize: '20px' }}
                minRows={10}
              />
              <Button
                sx={{ marginTop: '1rem', width: '100%' }}
                type="Button"
                // width="100%"
                onClick={() => sendCom()}
                variant="outlined"
              >
                Оставить комментарий
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
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
    </Container>
  );
}

export default CommentsList;
