import React from 'react'
import Members from './TeamMembers'
import { useStyles } from '../../Utils/globalStyles'
import { connect } from 'react-redux'
import {useLocation} from "react-router-dom";
// import Chat from './TeamChat'
import { Redirect } from 'react-router-dom';
import './view.css'
const ViewPage = (props) => {
    const {auth} = props;
    const classes = useStyles();
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
      <div className="viewmain row d-flex justify-content-center col-12 ml-4 " >
      <div className="viewmember col-12 col-lg-6">
      {/* <Chat teamid={teamid} /> */}
       </div>
          <div className="viewmember col-12 col-lg-3 ">
          <Members teamid = {teamid} /></div>
         
    

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
  
  
