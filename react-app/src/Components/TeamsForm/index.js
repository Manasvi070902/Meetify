import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios'

export default function TeamsForm() {
  const [open, setOpen] = useState(false);
  const [tname , setTname] = useState('');
  const [tdescription , setTdescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = async() => {
   console.log(tname,tdescription)
    axios.post('https://mteamsclone.herokuapp.com/team/new', {
    name: tname,
    description: tdescription
  }).then(function (response) {
    console.log(response);
  })

  setOpen(false);
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Teams
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
            label="Enter Team Name"
            type="text"
            id="filled-basic"
            fullWidth
            value={tname} 
			onChange={(e) => setTname(e.target.value)} 
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Team Description"
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