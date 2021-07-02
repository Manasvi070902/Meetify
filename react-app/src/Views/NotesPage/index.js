import React,{useState, useEffect} from 'react'
import { useStyles } from '../../Utils/globalStyles'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import NotesCard from './NotesCard';
import { NotesForm } from './NotesForm';

const NotesPage = (props) => {

    const [notes, setNotes] = useState([]);
    const { auth } = props
    const classes = useStyles();
 

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get(`http://localhost:5000/note/`,{
        headers: {'auth_id' : auth.uid}
      })
      const note = response.data.note;
      setNotes(note);
    
    };

    fetchNotes().catch((error) => {
   console.log(error.message)
    
    });
  }, []);

       
    
      if(!auth.uid && auth.isLoaded){
        return <Redirect to="/login" />
      }
    return (

        <main className={classes.content}>
        <div className={classes.toolbar} />
     
        <div className="d-flex justify-content-center">
            <h4>Meeting Notes</h4> 
        </div>
        <hr color="#333333"></hr>
           <div className="d-flex justify-content-end">
         
           <NotesForm auth={auth}/>
      </div>
   
      <div className="row d-flex justify-content-center mt-4 ml-4 ">
           
     
      {notes && notes.map(note => {
    return (
      <div className="col-md-6 col-lg-3 m-3">
   
         <NotesCard note = {note}/>
         </div>
        
    )})}
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




