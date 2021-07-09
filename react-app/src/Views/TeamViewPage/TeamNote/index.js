import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import TeamNoteCard from './TeamNoteCard';
import { TeamNoteForm } from './TeamNotesForm';
import { APIBaseURL } from '../../../constants';

const TeamNote = (props) => {

  const [notes, setNotes] = useState([]);
  const { auth } = props
  const teamid = props.teamid

  //fetch team notes from backend
  useEffect(() => {
    const fetchTeamNotes = async () => {

      const response = await axios.get(`${APIBaseURL}/note/team`, {
        headers: { 'teamid': localStorage.getItem("teamid") }
      })
      const teamid = localStorage.getItem("teamid")
      console.log(teamid)
      const note = response.data.note;
      console.log(response)
      setNotes(note);

    };

    fetchTeamNotes().catch((error) => {
      console.log(error.message)

    });
  }, []);

  //proctected routes
  if (!auth.uid && auth.isLoaded) {
    return <Redirect to="/login" />
  }

  return (

    <>

      <div className="d-flex justify-content-center">
        <h4>Meeting Notes</h4>
      </div>
      <hr color="#333333"></hr>
      <div className="d-flex justify-content-end">

        <TeamNoteForm teamid={teamid} auth={auth} />
      </div>

      <div className="row d-flex justify-content-center ml-4 ">

        {notes.length === 0 && <p>No notes found</p>}
        {notes.length > 0 && notes.map(note => {
          return (
            <div className=" col-12 m-3">
              <TeamNoteCard note={note} />
            </div>

          )
        })}
      </div>
    </>

  )
}

const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(TeamNote)