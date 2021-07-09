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
import CreateIcon from '@material-ui/icons/Create';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { APIBaseURL } from '../../../constants';


export const NotesEditForm = (props) => {
  const [editopen, setEditopen] = React.useState(false);
  const [edittitle, setEditTitle] = useState(props.note.title);
  const [editdescription, setEditDescription] = useState(props.note.description);
  const { auth } = props

  const note = props.note;

  const handleEditClickOpen = () => {
    setEditopen(true);
  };

  const handleEditClose = () => {
    setEditopen(false);
  };
  const StyledButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      color: '#14a2b8',
      borderBlockColor: '#14a2b8'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  //speech recognition
  const {
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();



  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true })
    //add a space to description before adding the speech content
    setEditDescription(editdescription + ' ')
  };
  const stopListening = () => {
    SpeechRecognition.stopListening()
    //append the description text after listening , interimTranscript tells the current word spoken
    setEditDescription(editdescription + interimTranscript)
  };
  //reset the transcript value
  const handleReset = () => {
    stopListening();
    resetTranscript();
  };

  const noteseditHandler = async () => {
    console.log(edittitle, editdescription)
    axios.put(`${APIBaseURL}/note/edit`, {
      title: edittitle,
      description: editdescription,
      user: auth.uid
    }, { headers: { "note_id": note._id } }).then(function (response) {
      console.log(response);
      window.location.reload()
    })

    setEditopen(false);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <>
      <StyledButton variant="outlined" color="primary" onClick={handleEditClickOpen}><CreateIcon /></StyledButton>

      <Dialog open={editopen} onClose={handleEditClose} aria-labelledby="form-dialog-title" fullWidth="md" maxWidth="md">
        <DialogTitle id="form-dialog-title">New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            value={edittitle}
            onChange={(e) => setEditTitle(e.target.value)}
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
            value={editdescription}
            onChange={(e) => setEditDescription(e.target.value)}
          > </TextField>

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
          <StyledButton onClick={handleEditClose} color="secondary">
            Cancel
          </StyledButton>
          <StyledButton onClick={noteseditHandler} >
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
export default connect(mapStateToProps)(NotesEditForm)


