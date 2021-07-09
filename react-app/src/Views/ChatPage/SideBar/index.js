import React, { useEffect, useState } from 'react'
import SideChat from '../SideChatBar';
import { connect } from 'react-redux'
import axios from "axios";
import { APIBaseURL } from '../../../constants';
import './sidebar.css'


const Sidebar = (props) => {
  const { auth } = props;
  const [meets, setMeets] = useState([]);

//fetch meetings atttended by user
  useEffect(() => {
    const fetchMeets = async () => {
      const response = await axios.get(`${APIBaseURL}/meets/`, {
        headers: { 'auth_id': auth.uid }
      })
      const meet = response.data.meets;
      setMeets(meet)
    };

    fetchMeets().catch((error) => {
      console.log(error.message)

    });

  }, []);

  return (
    <>

      {meets.length > 0 &&
        <div className="sidebar__header mt-4">
          <div className="sidebar__headerRight">
            <h4>Meetings</h4>
          </div>
        </div>}

      {meets.length > 0 && meets.map(meet => {
        return (
          <div className="sidebar__chats">
            <SideChat key={meet._id} id={meet._id} name={meet.name} />
          </div>

        )
      })}




    </>
  )
}

const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(Sidebar)

