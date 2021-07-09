import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { APIBaseURL } from '../../../constants';

export const NotesForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');


  const { auth } = props

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


  //SPEECH RECOGINITION , we mainly need interimTranscript ( it gives current words you speak)
  const { transcript, interimTranscript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [description, setDescription] = useState('');



  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true })
    //add space before writing the content
    setDescription(description + ' ')
  };
  const stopListening = () => {
    SpeechRecognition.stopListening()
    //append the word to the description
    setDescription(description + interimTranscript)

  };
  //reset transcript value
  const handleReset = () => {
    stopListening();
    resetTranscript();
  };
  

  //post request to backend for personal notes
  const notesHandler = async () => {
    console.log(title, description)
    axios.post(`${APIBaseURL}/note/new`, {
      title: title,
      description: description,
      user: auth.uid,
      type: "private"
    }).then(function (response) {
      console.log(response);

    })

    setOpen(false);
    window.location.reload()
  }


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <>
      <StyledButton variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Note
      </StyledButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth="md" maxWidth="md">
        <DialogTitle id="form-dialog-title">New Note</DialogTitle>
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            placeholder="Create a new note by typing or voice recognition"
            type="text"
            fullWidth
            multiline
            rows={5}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }} />

          <DialogContentText>

            {listening ? <StyledButton ><MicIcon /></StyledButton> : <StyledButton ><MicOffIcon /></StyledButton>}
            {interimTranscript} <br />


            <StyledButton onClick={startListening}>
              Start
            </StyledButton>
            <StyledButton onClick={stopListening}>
              Pause
            </StyledButton>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose} >
            Cancel
          </StyledButton>
          <StyledButton onClick={notesHandler} >
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
export default connect(mapStateToProps)(NotesForm)


