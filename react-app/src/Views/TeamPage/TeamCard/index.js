import React from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import './card.css'

const useStyles = makeStyles((theme) => ({
  rounded: {
    color: '#fff',
    backgroundColor: '#14a2b8',
  },
}));



const TeamCard = (props) => {
const team= props.team
const classes = useStyles();
  return(
      <>
       <div className=" card col-md-6 col-lg-2 ">
      
         <div class="icon"> <Avatar variant="rounded" className={classes.rounded} style={{minHeight:"50px",minWidth:"50px"}}>{team.name.charAt(0)}</Avatar></div>
         <Link to= {`/teamview?teamid=${team._id}`}  >
    <h6 class="title" >{team.name}</h6>
         </Link>
         </div>
        </> 
  )
}



const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(TeamCard)