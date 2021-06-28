import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useStyles } from '../../Utils/globalStyles'
import  {Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TeamsForm from '../../Components/TeamsForm'

import axios from 'axios'



const HomePage = (props) => {
const [teams , setTeams] = useState([])
const [value, setValue] = useState();

const handleChange = (event) => {
  setValue(event.target.value);
};
  const classes = useStyles();
  const {auth} = props;
  if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }
  const startMeet = async() => {
      window.open(`/room?host=${true}`)
  }
  const joinMeet = async() => {
    window.open(`/room?room=${value}`)
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
       
        <p className="lead d-flex justify-content-center">Hi &nbsp; <span className="text-primary"> {auth.displayName}</span>!</p>
          <p className="lead d-flex justify-content-center">Welcome to MS Teams.</p>
          <div className="d-flex justify-content-center">
          <Button className="p-2 m-5 "  variant="info"  onClick={startMeet} >Create Meet</Button> <br /></div>
          <form className="d-flex justify-content-center" noValidate autoComplete="off">
          <TextField
          id="standard-multiline-flexible"
          label="Enter Code"
          multiline
          rowsMax={4}
          value={value}
          onChange={handleChange}
          color="secondary"
        />
        <Button className="p-2 m-1"  variant="danger" onClick = {joinMeet} >Join Meet </Button>
        </form>
       

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


 

