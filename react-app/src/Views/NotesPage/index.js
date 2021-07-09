import React,{useState, useEffect} from 'react'
import { useStyles } from '../../Utils/globalStyles'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import NotesCard from './NotesCard';
import { NotesForm } from './NotesForm';
import notepic from "../../Assets/notes.svg"
import { APIBaseURL } from '../../constants';

const NotesPage = (props) => {

    const [notes, setNotes] = useState([]);
    const { auth } = props
    const classes = useStyles();
 

    //fetch user notes from database
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get(`${APIBaseURL}/note/`,{
        headers: {'auth_id' : auth.uid}
      })
      const note = response.data.note;
      setNotes(note);
    
    };

    fetchNotes().catch((error) => {
   console.log(error.message)
    
    });
  }, []);

       
    //proctected route
      if(!auth.uid && auth.isLoaded){
        return <Redirect to="/login" />
      }
    return (

        <main className={classes.content}>
        <div className={classes.toolbar} />
     
        <div className="d-flex justify-content-center">
            <h4>Notes</h4> 
        </div>
        <hr color="#333333"></hr>
           <div className="d-flex justify-content-end">
           <NotesForm auth={auth}/>
      </div>
   
      <div className="row d-flex justify-content-center mt-4 ml-4 ">
           
     
      {notes.length>0 && notes.map(note => {
    return (
      <div className="col-md-6 col-lg-3 m-3">
   
         <NotesCard note = {note}/>
         </div>
        
    )})}
    
    {/* screen when no notes are found */}
    {notes.length === 0 &&
    <>
    <div className="col-lg-8  col-12 align-items-center justify-content-center">
      <img className="img-fluid mx-auto d-block rounded w-50" src={notepic} alt="pic"/>
      <h3 className="col-12 d-flex justify-content-center">Save your Thoughts</h3>
      <h6 className="d-flex justify-content-center">Read and write notes using speech recognition!</h6>
      </div>
    </>
    }
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




