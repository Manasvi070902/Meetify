import React,{useState, useEffect} from 'react'
import { useStyles } from '../../Utils/globalStyles'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import TeamForm from './TeamForm';

const TeamPage = (props) => {

    const [teams, setTeams] = useState([]);
    const { auth } = props
    const classes = useStyles();
 

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get(`http://localhost:5000/team/`,{
        headers: {'auth_id' : auth.uid}
      })
      const team = response.data.team;
      setTeams(team);
    
    };

    fetchTeams().catch((error) => {
   console.log(error.message)
    
    });
  }, []);

       
    
      if(!auth.uid && auth.isLoaded){
        return <Redirect to="/login" />
      }
    return (

        <main className={classes.content}>
        <div className={classes.toolbar} />
     
        <div className="d-flex justify-content-center">
            <h4>Teams</h4> 
        </div>
        <hr color="#333333"></hr>
           <div className="d-flex justify-content-end">
         
           <TeamForm auth={auth}/>
      </div>
   
      <div className="row d-flex justify-content-center mt-4 ml-4 ">
           
     
      {/* {teams && teams.map(team => {
    return (
      <div className="col-md-6 col-lg-3 m-3">
   
         <TeamsCard team = {team}/>
         </div>
        
    )})} */}
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