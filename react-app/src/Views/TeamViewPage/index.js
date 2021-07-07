import React , {useState, useEffect } from 'react'
import Members from './TeamMembers'
import { useStyles } from '../../Utils/globalStyles'
import { connect } from 'react-redux'
import {useLocation} from "react-router-dom";
import TeamsChat from './TeamChat'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatIcon from '@material-ui/icons/Chat';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HistoryIcon from '@material-ui/icons/History';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TeamNote from './TeamNote';
import axios from 'axios';


import './view.css'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className="col-9"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}





const ViewPage = (props) => {
    const {auth} = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [createopen, setCreateOpen] = useState(false);
    const [joinopen, setJoinOpen] = useState(false);
    const [roomid, setRoomid] = useState('');
    const [meetname, setMeetname] = useState('');
    const [teamname, setTeamName] = useState('');
    const handleCreateClickOpen = () => {
      setCreateOpen(true);
    };
  
    const handleCreateClose = () => {
      setCreateOpen(false);
    };
  
    const handleJoinClickOpen = () => {
      setJoinOpen(true);
    };
  
    const handleJoinClose = () => {
      setJoinOpen(false);
    };
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    //get query parameter
const search = useLocation().search;
const params = new URLSearchParams(search);
localStorage.setItem('teamid' , params.get('teamid'))


const teamid =   params.get('teamid')

const createhandler = () =>{
  localStorage.setItem('meetname' , meetname)
  localStorage.setItem('teamid' , teamid)
  window.open(`/teammeet?host=${true}`)
}
const joinHandler = async() => {

  window.open(`/teammeet?room=${roomid}`)
}

useEffect(() => {
  const fetchTeam = async () => {

    const response = await axios.get(`http://localhost:5000/team/details`,{
      headers: {'team_id' : teamid}
    })
    const team = response.data.team;
console.log(team)
    const name = team.name
    setTeamName(name)
  
  
  };

 fetchTeam().catch((error) => {
 console.log(error.message)
  
  });
 
}, []);

if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }
    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
      <div className="viewmain row d-flex justify-content-center col-12 ml-4" >

      <AppBar position="static" color="default" style={{width: "80%", height:"20%"}}>
  
      <div className="d-flex justify-content-center mt-2">
        <h4>{teamname}</h4>
        </div>
      
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="#fffff"
        >
        
          <Tab label="Chat" icon={<ChatIcon />} {...a11yProps(0)} />
          <Tab label="Members" icon={<PersonPinIcon />} {...a11yProps(1)} />
          <Tab label="Notes" icon={<NoteAddIcon />} {...a11yProps(2)} />
          <Tab label="Meeting History" icon={<HistoryIcon />} {...a11yProps(3)} />
          <Box display='flex' flexGrow={1}  mx="auto" >
          <Button className = "m-3" variant="contained" color="primary" onClick={handleCreateClickOpen}>Create Meet</Button>
          <Button className = "m-3" variant="contained" color="secondary" onClick={handleJoinClickOpen}>Join Meet</Button>
          </Box>
      
        </Tabs>
     
        
      </AppBar>
      <TabPanel value={value} index={0}>
      <TeamsChat teamid={teamid} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Members teamid = {teamid} />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TeamNote />
      </TabPanel>
      <TabPanel value={value} index={3}>
      
      </TabPanel>
     
     {/* for create meet button */}

     <Dialog open={createopen} onClose={handleCreateClose} aria-labelledby="create meet">
        <DialogTitle id="create meet">Creat Meet</DialogTitle>
        <DialogContent>
        
          <TextField
            autoFocus
            margin="dense"
            id="meet name"
            label="Enter Meet Name"
            type="text"
            value = {meetname}
            onChange= {(e) => {setMeetname(e.target.value)}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}  variant= "contained" color="primary">
            Cancel
          </Button>
          <Button onClick={createhandler}  variant= "contained"color="primary">
           Creat Meet
          </Button>
         
        </DialogActions>
      </Dialog>

      {/* for join meet button */}

      <Dialog open={joinopen} onClose={handleJoinClose} aria-labelledby="join meet">
      <DialogTitle id="join meet">Join Meet</DialogTitle>
      <DialogContent>
   
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Enter Code"
          type="text"
          value={roomid}
          onChange = {(e) => {setRoomid(e.target.value)}}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleJoinClose} variant= "contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={joinHandler}  variant= "contained" color="secondary">
         Join
        </Button>
      </DialogActions>
    </Dialog>

      </div>

      </main>
    )
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(ViewPage)
  
  
