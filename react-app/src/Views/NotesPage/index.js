import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from '../../Utils/globalStyles'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const NotesPage = () => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

   
    return (

        <main className={classes.content}>
        <div className={classes.toolbar} />
     
        <div className="d-flex justify-content-center">
            <h4>Manage your Notes</h4> 
        </div>
        <hr color="#333333"></hr>
           <div className="d-flex justify-content-end">
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Add New Note
      </Button>
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
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={5}> </TextField>
            {/* <input type="text">{transcript}</input> */}
          <DialogContentText> Microphone: {listening ? 'on' : 'off'} 
          {transcript}
          
          </DialogContentText>
        
        <DialogActions>
          <Button onClick={SpeechRecognition.startListening()} color="secondary">
            Start
          </Button>
        </DialogActions>
  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    
        

        </main>
    )
}


export default NotesPage

