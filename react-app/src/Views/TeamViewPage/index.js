import React from 'react'
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
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    //get query parameter
const search = useLocation().search;
const params = new URLSearchParams(search);

const teamid = params.get("teamid")
if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }
    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
      <div className="viewmain row d-flex justify-content-center col-12 ml-4" >

      <AppBar position="static" color="default" style={{width: "80%", height:"20%"}}>
      
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Chat" icon={<ChatIcon />} {...a11yProps(0)} />
          <Tab label="Members" icon={<PersonPinIcon />} {...a11yProps(1)} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <TeamsChat teamid={teamid} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Members teamid = {teamid} />
      </TabPanel>
     

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
  
  
