import React from 'react';
import styled from '@emotion/styled';
import { Grid, Container, Paper } from '@mui/material';

function MainAuth() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>ЗДЕСЬ ДОЛЖНА БЫТЬ КАРУСЕЛЬ</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainAuth;
