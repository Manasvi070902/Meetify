import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { APIBaseURL } from '../../constants';

const IconButtonStyle = {
  color: "#fff",
  margin: "5px",
  width: "50px",
  height: "50px",
}



const MeetNotes = (props) => {

  const { auth } = props
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const StyledButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      color: '#14a2b8',
      borderBlockColor: '#14a2b8',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);


  const meetnotesHandler = async () => {
    console.log(title, description)
    //teams notes (only when meeting is created inside team)
    if (type === "public") {
      if (props.team === true) {
        axios.post(`${APIBaseURL}/note/new/team`, {
          title: title,
          description: description,
          user: auth.uid,
          teamid: localStorage.getItem("teamid")
        }).then(function (response) {
          console.log(response);

        })

      } else {

        //if notes are written for meeting members(not in team meets for instant meets created)

        axios.post(`${APIBaseURL}/note/new/public`, {
          title: title,
          description: description,
          user: auth.displayName,
          room_id: props.roomID
        }).then(function (response) {
          console.log(response);

        })
      }
    }
    //if notes are written for personal use
    else {
      axios.post(`${APIBaseURL}/note/new`, {
        title: title,
        description: description,
        user: auth.uid,
      }).then(function (response) {
        console.log(response);

      })
    }

    setOpen(false);
    console.log(type)
  }




  return (
    <>
      <IconButton onClick={handleClickOpen} style={{ ...IconButtonStyle, backgroundColor: "#1590a2" }} > <NoteAddIcon /> </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="meet-note-form" fullWidth="md" maxWidth="md" >
        <DialogTitle id="meet-note-form">New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <Select
            label="Type"
            id="type"
            className="mt-3 mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="public">Team
            </MenuItem>
            <MenuItem value="private">Personal</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            placeholder="Create a new note"
            type="text"
            fullWidth
            multiline
            rows={5}
            value={description}
            onChange={(e) => {

              setDescription(e.target.value)
            }} />

        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose} >
            Cancel
          </StyledButton>
          <StyledButton onClick={meetnotesHandler} >
            Save
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(MeetNotes)
