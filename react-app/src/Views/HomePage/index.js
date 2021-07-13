import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useStyles } from '../../Utils/globalStyles'
import { Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import homepic from "../../Assets/home.svg"



const HomePage = (props) => {
  const [value, setValue] = useState();
  const [meetname, setMeetName] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleMeetName = (event) => {
    setMeetName(event.target.value);
  };
  const classes = useStyles();
  const { auth } = props;
  if (!auth.uid && auth.isLoaded) {
    return <Redirect to="/login" />
  }
  //start meeting
  const startMeet = async () => {
    localStorage.setItem('meetname', meetname)
    if(meetname === ""){
      alert("Enter Meetname")
    }else{
    window.open(`/room?host=${true}`)
    }
  }
  const joinMeet = async () => {
    window.open(`${value}`)
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

   
      <div className="container-fluid d-lg-flex  d-md-flex justify-content-center p-lg-5 ">

        <div className="container col-12 col-lg-7" style={{ marginTop: "20vh" }} >
          <h4 className=" m-3 justify-content-center">Hi <span style={{ color: "#2dbdc3" }}> {auth.displayName}</span></h4>
          <h6 className=" m-3 justify-content-center" style={{ fontSize: "1.4rem" }}>Connect, collaborate, and celebrate from anywhere with Meetify!</h6>
          <div className="row container m-3">
            <div className=" justify-content-center m-3">
              <TextField
                id="meetname"
                label="Enter Meet Name"
                multiline
                rowsMax={4}
                value={meetname}
                onChange={handleMeetName}
                color="primary"
              />
              <Button className="p-2 m-1 " variant="info" onClick={startMeet} >Create Meet</Button> <br />
            </div>
            <form className=" justify-content-center m-3" noValidate autoComplete="off">
              <TextField
                id="meeturl"
                label="Enter Meet URL"
                multiline
                rowsMax={4}
                value={value}
                onChange={handleChange}
                color="secondary"
              />
              <Button className="p-2 m-1" variant="danger" onClick={joinMeet} >Join Meet </Button>
            </form>
          </div>
        </div>
        <div className="col-12 mt-4  col-lg-5">
          <img className="img-fluid rounded d-block float-right" src={homepic} alt="pic" />
        </div>
      </div>


    </main>

  )
}
const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(HomePage)




