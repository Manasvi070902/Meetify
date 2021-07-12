import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { connect } from 'react-redux'
import {db} from "../../../Utils/firebase"
import { APIBaseURL } from '../../../constants';

const TeamForm = (props) => {
  const [open, setOpen] = useState(false);
  const [tname , setTname] = useState('');
  const [tdescription , setTdescription] = useState('');

 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const {auth} = props;

//add teams to database
  const handleForm = async() => {
   console.log(tname,tdescription)
    await axios.post(`${APIBaseURL}/team/new`, {
    name: tname,
    description: tdescription,
    user:auth.uid
  }).then(function (response) {
    console.log(response);
    // alert("Team created successfully")
    //for firebase intergration , add teams data to firestore
    db.collection('teams').doc(response.data.teamid).set({
      name: tname,
      description: tdescription,
      members:[auth.uid],
      code:response.data.code
    }).then( resp => {
      console.log("team added to firebase")
      window.location.reload()
    }).catch((err) => console.log(err))
  })

  
  setOpen(false);
  
  }


  return (
    <div>
      <Button variant="contained" className={"mr-2"} color="primary" onClick={handleClickOpen}>
        Create Team
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create your team</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Collaborate closely with a group of people inside your organisation based on project, initiative, or common interest.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team Name"
            type="text"
            id="filled-basic"
            fullWidth
            value={tname} 
			onChange={(e) => setTname(e.target.value)} 
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Team Description"
            type="text"
            id="filled-basic"
            fullWidth
            value={tdescription} 
			onChange={(e) => setTdescription(e.target.value)} 
          />
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleForm} color="primary">
            Create
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
export default connect(mapStateToProps)(TeamForm)