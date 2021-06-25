import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { Instance } from 'simple-peer';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

 const Participants = (props) => {
     const classes = useStyles();
     const {auth} = props
    return (
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
    )
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(Participants)
