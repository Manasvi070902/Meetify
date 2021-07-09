import React, { useState } from 'react';
import MainBoard from "./Main-Board";
import BrushIcon from '@material-ui/icons/Brush';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { imageCapture } from '../../Actions/imagecapture';
import './board.css';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const IconButtonStyle = {
  color: "#fff",
  margin: "5px",
  width: "50px",
  height: "50px",
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Board = (props) => {
  const [color, setColor] = useState("#000000")
  const [size, setSize] = useState("10")
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  //color fuctions
  const changeColor = (params) => {
    setColor(params.target.value)
  }
  const changeSize = (params) => {
    setSize(params.target.value)
  }
  //open & close

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <IconButton style={{ ...IconButtonStyle, backgroundColor: "#1590a2" }} onClick={handleClickOpen}> < BrushIcon /> </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              White Board
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="mt-5 b-container">
          <div class="tools-section">
            <div className="color-picker">Color : &nbsp;
              <input type="color" value={color} onChange={changeColor.bind(this)} />
            </div>

            <div className="size">Size : &nbsp;
              <select value={size} onChange={changeSize.bind(this)}>
                <option> 5 </option>
                <option> 10 </option>
                <option> 15 </option>
                <option> 20 </option>
                <option> 25 </option>
                <option> 30 </option>
              </select>
            </div>

          </div>

          <div id="mainboard" class="board-container">
            <MainBoard color={color} size={size}></MainBoard>
          </div>
        </div>

      </Dialog>
    </>
  )
}


export default Board