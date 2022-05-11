import {
  Fab,
  // Avatar,
  ListItemText,
  // ListItemIcon,
  ListItem,
  List,
  TextField,
  Divider,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import classes from './ChatFormModal.module.css';
import UserChatLink from './UserChatLink/UserChatLink';

function ChatFormModal() {
  return (
    <Box component="div">
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Divider />
          <Divider />
          <UserChatLink />
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Hey man, What's up ?" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="left" primary="Hey, Iam Good! What about you ?" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Cool. i am good, let's catch up!" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30" />
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: '1rem' }}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatFormModal;
