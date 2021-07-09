import React,{useState, useEffect} from 'react'
import { useStyles } from '../../Utils/globalStyles'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import TeamForm from './TeamForm';
import TeamJoin from './TeamJoin';
import TeamCard from './TeamCard'
import teampic from "../../Assets/teams.svg"
import { APIBaseURL } from '../../constants';


const TeamPage = (props) => {

    const [teams, setTeams] = useState([]);
  
    const { auth } = props
    const classes = useStyles();

    //fetch teams joined or created by user
  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get(`${APIBaseURL}/team/`,{
        headers: {'auth_id' : auth.uid}
      })
      const team = response.data.team;
      setTeams(team);
    
    };

    fetchTeams().catch((error) => {
   console.log(error.message)
    
    });
  }, []);

       
    //proctected route
      if(!auth.uid && auth.isLoaded){
        return <Redirect to="/login" />
      }
    return (

        <main className={classes.content}>
        <div className={classes.toolbar} />
     
        <div className="d-flex justify-content-center" >
            <h4 >Teams</h4> 
        </div>
        <hr color="#333333"></hr>
           <div className="d-flex justify-content-end">
         
           <TeamForm auth={auth}/>
          <TeamJoin auth={auth} />
      </div>
   
      <div className="row d-flex justify-content-center mt-4 ml-4 ">
           
     {teams.length === 0 && 
     <>
     <div className="col-lg-8  col-12 align-items-center justify-content-center">
      <img className="img-fluid mx-auto d-block rounded w-50" src={teampic} alt="pic"/>
      <h3 className="col-12 d-flex justify-content-center">You're not on a team yet!</h3>
      <h6 className="d-flex justify-content-center">Once you join a team, it'll show up here.</h6>
      </div>
     </>}
      {teams.length>0 && teams.map(team => {
    return (
         <TeamCard team = {team}/>       
    )})}
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
  export default connect(mapStateToProps)(TeamPage)