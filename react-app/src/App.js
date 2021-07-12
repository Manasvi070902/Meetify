import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './Views/HomePage'
import LoginPage from './Views/LoginPage'
import NavBar from './Components/Navbar'
import { useTheme } from "./Utils/theme"
import { GlobalStyles, lightTheme, darkTheme } from './Utils/globalStyles';
import { ThemeProvider } from 'styled-components';
import VideoPage from './Views/VideoPage';
import { auth, db } from "./Utils/firebase"
import ChatPage from './Views/ChatPage'
import NotesPage from './Views/NotesPage';
import TeamPage from './Views/TeamPage';
import ViewPage from './Views/TeamViewPage';
import TeamVideoPage from './Views/TeamViewPage/TeamVideoPage';
import PageNotFound from './Views/PageNotFound';

const App = () => {
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    // To keep user logged in once signed in
    auth.onAuthStateChanged(user => {
      if (user) {

        console.log(user.uid)
        //store the state of online and offline in firestore
        db.collection('users').doc(user.uid).update({
          "isActive": true
        }).then(resp => console.log("User is already logged in")).catch((err) => console.log(err))
      }
      else {
        console.log('User logged out');
      }
      ;
    })


  }, [])
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (

 

    <Router>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact>
            <NavBar theme={theme} toggleTheme={toggleTheme} />
          </Route>
          <Route path="/login" >
            <NavBar theme={theme} toggleTheme={toggleTheme} />
          </Route>
          <Route path="/chat" >
            <NavBar theme={theme} toggleTheme={toggleTheme} />
          </Route>
          <Route path="/note" >
            <NavBar theme={theme} toggleTheme={toggleTheme} />
          </Route>
          <Route path="/team" >
            <NavBar theme={theme} toggleTheme={toggleTheme} />
          </Route>
          <Route path="/teamview" >
            <NavBar theme={theme} toggleTheme={toggleTheme} />
          </Route>

        </Switch>

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/room" component={VideoPage} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/note" component={NotesPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/teamview" component={ViewPage} />
          <Route path="/teammeet" component={TeamVideoPage} />
          <Route path="" component={PageNotFound} />

        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App
