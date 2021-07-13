import React from 'react'
import { useStyles } from '../../Utils/globalStyles'
import ChatSection from './ChatSection'
import SideBar from './SideBar'

const ChatPage = () => {

     const classes = useStyles();
  
    return (
          <main className={classes.content}>
          <div className={classes.toolbar} />
        <div className="d-flex justify-content-center row" >
        
        <div className="col-lg-2 col-6 justify-content-center" >
            <SideBar />
        </div>
        <div className="col-lg-8  col-10  justify-content-center" >
            <ChatSection />
            </div>
        </div>

        </main>
    )
}

export default ChatPage
