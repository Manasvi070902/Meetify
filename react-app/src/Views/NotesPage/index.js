import React,{useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../Utils/globalStyles'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios'
import { connect } from 'react-redux'

const NotesPage = (props) => {
    const [open, setOpen] = React.useState(false);
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [notes , setNotes] = useState([])
    const { auth } = props
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

const notesHandler = async() => {
    console.log(title,description)
     axios.post('https://mteamsclone.herokuapp.com/note/new', {
     title: title,
     description: description,
     user: auth.uid
   }).then(function (response) {
     console.log(response);
     setOpen(false);
})
}

const getNoteDetails = async() => {
     axios.get(`https://mteamsclone.herokuapp.com/note/`)
      .then(res => {
     const notes = res.data.note;
        setNotes(notes);

      })
    }

      useEffect(() => {    
        getNoteDetails();
      }, [])
       
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
            value={title} 
			onChange={(e) => setTitle(e.target.value)} 
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={5}
            value={description} 
			onChange={(e) => setDescription(e.target.value)} 
      > </TextField>
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
          <Button onClick={notesHandler} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </div>
   
      <div className="d-flex justify-content-center">
           
        
       {notes && notes.map(note => {
         return(
           <>
          {console.log(note)}
    <Card className={classes.root}>
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
          {note.title}
        </Typography>
        
        <Typography  color="textSecondary">
          {note.description}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </>
         )}
        )}
        </div>
       
     
        

        </main>
    )
}

const mapStateToProps = ({auth, firebase}) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(NotesPage)




