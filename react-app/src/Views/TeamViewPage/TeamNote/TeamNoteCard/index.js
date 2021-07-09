import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Truncate from 'react-truncate';
import { useSpeechSynthesis } from 'react-speech-kit';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TeamNoteEditForm from '../TeamNoteEditForm';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { APIBaseURL } from '../../../../constants';




const TeamNoteCard = (props) => {
  const note = props.note

  const [open, setOpen] = React.useState(false);
  const { speak, cancel } = useSpeechSynthesis();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    cancel();
  };
  const StyledButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      color: '#14a2b8',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);



  var date = new Date(note.date).toDateString()

  // DELETE NOTE
  const deletePost = async () => {
    const response = await axios.delete(`${APIBaseURL}/note/team/delete`, {
      headers: { "note_id": note._id }
    }).then(
      window.location.reload()
    )
  }
  const speakPost = () => { speak({ text: note.description }) }


  return (
    <>
      <Card style={{ minHeight: '150px', minWidth: '150px' }}>
        <CardHeader action={<TeamNoteEditForm note={note} />} title={note.title} subheader={date} />

        <CardContent>
          <Truncate lines={2}>{note.description}</Truncate>
        </CardContent>

        <CardActions >
          <StyledButton onClick={handleClickOpen}>Read More</StyledButton>
          <Box display='flex' flexGrow={1} mx="auto" ></Box>
          <StyledButton onClick={deletePost} ><DeleteIcon /></StyledButton>
        </CardActions>
      </Card>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} scroll="paper" fullWidth
        maxWidth="md" >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <DialogActions>
            {note.title}
            <Box display='flex' flexGrow={1} mx="auto" ></Box>
            <StyledButton onClick={speakPost} ><VolumeUpIcon /></StyledButton>
          </DialogActions>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {note.description}
          </Typography>

        </DialogContent>
        <DialogActions>
          <StyledButton autoFocus onClick={handleClose}>
            Close
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
export default connect(mapStateToProps)(TeamNoteCard)