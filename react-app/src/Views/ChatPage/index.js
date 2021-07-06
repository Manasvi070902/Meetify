import React from 'react'
import Contact from '../../Components/Contact'
import { useStyles } from '../../Utils/globalStyles'
import ChatSection from './ChatSection'
import SideBar from './SideBar'
const ChatPage = () => {
     const classes = useStyles();
    return (
          <main className={classes.content}>
          <div className={classes.toolbar} />
        <div className="d-flex justify-content-center mt-5">
            <SideBar />
            <ChatSection />
        </div>

        </main>
    )
}

export default ChatPage
