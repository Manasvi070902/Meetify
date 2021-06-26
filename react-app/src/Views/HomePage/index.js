import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useStyles } from '../../Utils/globalStyles'
import  {Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TeamsForm from '../../Components/TeamsForm'
import axios from 'axios'



const HomePage = (props) => {
const [teams , setTeams] = useState([])
  const classes = useStyles();
  const {auth} = props;
  if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }
  const startMeet = async() => {
      window.open(`/room?host=${true}`)
  }
  // const getDetails = () => {
  //    axios.get(`http://localhost:5000/team/`)
  //     .then(res => {
  //    const teams = res.data.team;
  //       setTeams(teams);
  
       
  //     })
       
  // }
  
    return (
      <main className={classes.content}>
          <div className={classes.toolbar} />
       
        <p className="lead mt-5 mb-2">Hi <span className="text-primary">{auth.displayName}</span>!</p>
          <p className="lead mt-4 mb-2">Welcome to MS Teams.</p>
          <Button className="p-2 mt-5"  variant="info"  onClick={startMeet} >Create Meet</Button> <br />
        <Button className="p-2 mt-5"  variant="danger">Join Meet
        </Button>

        {/* <TeamsForm /> */}

         {/* <Button className="p-2 mt-5"  onClick={getDetails} variant="success">View team
        </Button> */}
       
       {/* {teams.map((team) => {
          {console.log(team.name)}
    <Card className={classes.root}>
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
          {team.name}
        </Typography>
        
        <Typography  color="textSecondary">
          {team.description}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        }
        )} */}
      
      
        </main>
      
    )
  }
  const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(HomePage)


 

