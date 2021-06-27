import React,{useState} from 'react'
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
import { deepPurple } from '@material-ui/core/colors';
import { connect } from 'react-redux'


const IconButtonStyle = {
  color: "#fff",
   margin: "5px",
   width:"50px",
   height:"50px",
  }

const useStyles = makeStyles((theme) => ({

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

 const Participants = (props) => {
     const classes = useStyles();
     const {auth} = props
     const [open, setOpen] = useState(false);

     const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
<>
<IconButton onClick={handleClickOpen} style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} > <PeopleIcon/> </IconButton>
<Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle onClose={handleClose} id="responsive-dialog-title">Participants  </DialogTitle>
        <DialogContent>
          
       
         <List>
          <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.purple}>{auth.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={auth.displayName}
                  />
                </ListItem>
              {props.peers.map(peer => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.purple}>{peer.username.charAt(0).toUpperCase()}
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
          <Button  style= {{color : "#fff"}} onClick={handleClose}  > Close</Button>
        </DialogActions>
        
      </Dialog>
            </>
    )
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(Participants)
