import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './Views/HomePage'
import LoginPage from './Views/LoginPage'
import Room from './Views/VideoPage'
import NavBar from './Components/Navbar'
import {useTheme} from "./Utils/theme"
import { GlobalStyles, lightTheme, darkTheme } from './Utils/globalStyles';
import  { ThemeProvider } from 'styled-components';
import VideoPage from './Views/VideoPage';


const App = () => {
  const [ theme, toggleTheme ] = useTheme();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
 
  return (

   
    <Router>
      <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
        
        <NavBar theme={theme} toggleTheme={toggleTheme}/>
        </Route>
        <Route path="/login" >
        <NavBar theme={theme} toggleTheme={toggleTheme}/>
        </Route>
      </Switch>
      
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/room" component={VideoPage} />
        
      </Switch>
      </ThemeProvider>
  </Router>
   )
}

export default App
