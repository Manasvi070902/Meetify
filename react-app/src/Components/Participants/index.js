import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { withStyles } from '@material-ui/core/styles';

const IconButtonStyle = {
  color: "#fff",
  margin: "5px",
  width: "50px",
  height: "50px",
}
const StyledButton = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: '#14a2b8',
    borderBlockColor: '#14a2b8',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const useStyles = makeStyles((theme) => ({

  green: {
    color: "white",
    backgroundColor: "#14a2b8",
  },
}));

//make component draggable
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Participants = (props) => {
  const classes = useStyles();
  const { auth } = props
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} style={{ ...IconButtonStyle, backgroundColor: "#1590a2" }} > <PeopleIcon /> </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title" PaperComponent={PaperComponent}>
        <DialogTitle onClose={handleClose} id="draggable-dialog-title">Participants</DialogTitle>
        <DialogContent>


          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.green}>{auth.displayName.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={auth.displayName}
              />
            </ListItem>
            {props.peers.map(peer => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.green}>{peer.username.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={peer.username}
                />
              </ListItem>
            ))}

          </List>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose} > Close</StyledButton>
        </DialogActions>

      </Dialog>
    </>
  )
}

const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(Participants)
