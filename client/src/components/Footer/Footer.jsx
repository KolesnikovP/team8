/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinkMui from '@mui/material/Link';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <footer>
      <Box px={{ xs: 1, sm: 2 }} py={{ xs: 3, sm: 6 }} bgcolor="black" color="white">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Fullstack js developer Alexey (TeamLead)</Box>
              <Box>
                <LinkMui href="/" color="inherit">
                  <GitHubIcon />
                </LinkMui>
                <LinkMui href="/" color="inherit">
                  <TelegramIcon />
                </LinkMui>
                <LinkMui href="/" color="inherit">
                  <AlternateEmailIcon />
                </LinkMui>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Fullstack js developer Daniil</Box>
              <Box>
                <LinkMui href="/" color="inherit">
                  <GitHubIcon />
                </LinkMui>
                <LinkMui href="/" color="inherit">
                  <TelegramIcon />
                </LinkMui>
                <LinkMui href="/" color="inherit">
                  <AlternateEmailIcon />
                </LinkMui>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Fullstack js developer Ilya</Box>
              <Box>
                <LinkMui href="/" color="inherit">
                  <GitHubIcon />
                </LinkMui>
                <LinkMui href="/" color="inherit">
                  <TelegramIcon />
                </LinkMui>
                <LinkMui href="/" color="inherit">
                  <AlternateEmailIcon />
                </LinkMui>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Team8 &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
