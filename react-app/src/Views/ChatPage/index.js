import React from 'react'
import Contact from '../../Components/Contact'
import { useStyles } from '../../Utils/globalStyles'
const ChatPage = () => {
     const classes = useStyles();
    return (
          <main className={classes.content}>
          <div className={classes.toolbar} />
        <div className="d-flex justify-content-center">
            <Contact />
        </div>

        </main>
    )
}

export default ChatPage
