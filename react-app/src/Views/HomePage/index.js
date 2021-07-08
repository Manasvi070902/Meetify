import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useStyles } from '../../Utils/globalStyles'
import  {Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';




const HomePage = (props) => {
const [teams , setTeams] = useState([])
const [value, setValue] = useState();
const [meetname, setMeetName] = useState('');

const handleChange = (event) => {
  setValue(event.target.value);
};
const handleMeetName = (event) => {
  setMeetName(event.target.value);
};
  const classes = useStyles();
  const {auth} = props;
  if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }
  const startMeet = async() => {
    localStorage.setItem('meetname' , meetname)
      window.open(`/room?host=${true}`)
  }
  const joinpreviewMeet = async() => {
    window.open(`/room?room=${value}`)
}

    return (
      <main className={classes.content}>
          <div className={classes.toolbar} />
       
        <p className="lead d-flex justify-content-center">Hi &nbsp; <span className="text-primary"> {auth.displayName}</span>!</p>
          <p className="lead d-flex justify-content-center">Welcome to MS Teams.</p>
          <div className="d-flex justify-content-center">
          <TextField
          id="standard-multiline-flexible"
          label="Enter Meet Name"
          multiline
          rowsMax={4}
          value={meetname}
          onChange={handleMeetName}
          color="secondary"
        />
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
        <Button className="p-2 m-1"  variant="danger" onClick = {joinpreviewMeet} >Join Meet </Button>
        </form>
      
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
  

 

