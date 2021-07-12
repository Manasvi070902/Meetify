
import { connect } from 'react-redux'
import { logout,login } from '../../Actions/auth'
 import { Toggle } from './toggle'
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,

    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  
 
}));

export const NavBar =(props)=> {
  const handleLogoutBtn = (e) => props.dispatch(logout());
  const handleLoginBtn = (e) => props.dispatch(login())
   
  const { auth } = props;
  console.log(auth)
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);


  };

  return (
  
    < >
       {auth.isLoaded !== undefined ? 
        
       <>
      {auth.uid &&
      <>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        },"custom-nav")}>
    
        <Toolbar>
        <Box display='flex' flexGrow={1}  mx="auto" >
        
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          
          </Box>
         
           <Toggle theme={props.theme} toggleTheme={props.toggleTheme}/> 
        
           {auth.photoURL !== undefined ?
           <Avatar  alt={auth.displayName} src={auth.photoURL} onClick={handleClick} /> : <Avatar onClick={handleClick}>{auth.displayName.charAt(0)}</Avatar>}
           <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{auth.displayName}</MenuItem>
        <MenuItem onClick={handleLogoutBtn}>Logout</MenuItem>
      </Menu>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          
        </div>
        <Divider />
        <List>
            <ListItem button key='Meetings' component={Link} to="/">
              <ListItemIcon><VideoCallIcon /></ListItemIcon>
              <ListItemText primary='Meetings' />
            </ListItem>
            <ListItem button key='Teams' component={Link} to="/team">
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary='Teams' />
            </ListItem>
            <ListItem button key='Chat' component={Link} to="/chat">
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText primary='Chat' />
            </ListItem>
            <ListItem button key='Notes' component={Link} to="/note">
              <ListItemIcon><NoteAddIcon /></ListItemIcon>
              <ListItemText primary='Notes' />
            </ListItem>
        </List>
        
      </Drawer>
      </>
    }
    {!auth.uid &&
    <>
    <AppBar position="static" className="custom-nav">
        <Toolbar>
          <Box display='flex' flexGrow={1} >
          
          <Typography variant="h6" className={classes.title}> 
           Meetify
          </Typography> 
          </Box>
          <Toggle theme={props.theme} toggleTheme={props.toggleTheme}/>
          <Button color="inherit" onClick={handleLoginBtn}>Login</Button>
        </Toolbar>
      </AppBar>

    </>}
      </> 
     : <span>Loading...</span>}
    </>
  )
    
};
const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}

export default connect(mapStateToProps)(NavBar)
