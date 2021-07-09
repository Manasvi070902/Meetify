import React, { useState, useEffect } from 'react'
import { db } from "../../../Utils/firebase"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import green from '@material-ui/core/colors/green';
import { useLocation } from "react-router-dom";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import IconButton from '@material-ui/core/IconButton';
import copy from "copy-to-clipboard";

const StyledBadge = withStyles((theme) => ({
  badge: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  list: {
    width: '90%',
    minHeight: '84vh',
  },

  inline: {
    display: 'inline',
  },
}));

const Members = (props) => {
  const classes = useStyles();

  const Green = green[400];

  //store team members
  const [membersList, setMembersList] = useState({})

  //get query parameter
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const teamid = params.get("teamid")

  //fetch users with their online/offline status from firestore
  const fetchUsers = async (props) => {

    const querySnapshot = await db.collection('teams').doc(teamid)
    querySnapshot.get().then(async (doc) => {
      const memberIds = doc.data().members;

      //.onSnapshot used for realtime update
      memberIds.map(
        (id) => {
          return new Promise(resolve => {
            db.collection('users').doc(id).onSnapshot(async (doc) => {
              setMembersList((oldState) => ({ ...oldState, [doc.id]: doc.data() }))
            })
          })
        }
      )
    })
  }
  useEffect(() => {
    fetchUsers();
  }, [])

  const copyHandler = () => {

    copy(props.code);
  }
  return (


    <List className={classes.list} >
      <div className="d-flex justify-content-center ">
        <h4>Members</h4>
      </div>
      <hr color="#333333"></hr>
      <div className="d-flex justify-content-end">
        <h6>Add Member : {props.code} <IconButton onClick={copyHandler}> < FileCopyOutlinedIcon /> </IconButton></h6>
      </div>

      {Object.values(membersList).map(item => {
        return (
          <>
            {item.isActive}
            <ListItem alignItems="flex-end">
              <ListItemAvatar>
                {item.isActive ?
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant="dot"
                    color="primary">
                    <Avatar alt={item.name} src={item.picture} />
                  </StyledBadge> :
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant="dot"
                    color="secondary">
                    <Avatar alt={item.name} src={item.picture} />
                  </StyledBadge>
                }

              </ListItemAvatar>
              {item.isActive ? <ListItemText primary={item.name} secondary="Online" /> : <ListItemText primary={item.name} secondary="Offline" />}


            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        )
      })}

    </List>

  )
}

export default Members
