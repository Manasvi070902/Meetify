import React,{useState} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { db } from '../../../Utils/firebase';
import firebase from "firebase";
import { APIBaseURL } from '../../../constants';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const TeamJoin = (props) => {
  const [joinopen, setJoinopen] = useState(false);
  const [code, setCode] = useState();

  const handleJoinOpen = () => {
    setJoinopen(true);
  };

  const handleJoinClose = () => {
    setJoinopen(false);
  };
const {auth} = props;
  
const handleCode = (event) => {
    setCode(event.target.value);
  };
  const joinTeam = async() => {
    try{
    //store user data to mongodb
    axios.post(`${APIBaseURL}/team/join`, {
      code : code,
      user:auth.uid
    }).then(async function (response) {
      console.log(response);
      alert("Team joined!!")
    })
   //store user data to firestore
 
     await db.collection('teams').where("code", "==", code).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
       
       db.collection('teams').doc(doc.id).update({
         members : firebase.firestore.FieldValue.arrayUnion(auth.uid)
       })
      });
  })
}catch(err) {
  console.log(err)
}

    setJoinopen(false);
  
}

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleJoinOpen}>
        Join Team
      </Button>
      <Dialog open={joinopen} onClose={handleJoinClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join your team</DialogTitle>
        <DialogContent>
   
        <TextField
          id="standard-multiline-flexible"
          label="Enter Code"
          multiline
          rowsMax={4}
          value={code}
          fullWidth
          onChange={handleCode}
          color="secondary"
        />
         
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJoinClose} color="primary">
            Cancel
          </Button>
          <Button onClick={joinTeam} color="secondary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
export default connect(mapStateToProps)(TeamJoin)