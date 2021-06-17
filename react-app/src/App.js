import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './Views/HomePage'
import LoginPage from './Views/LoginPage'
import NavBar from './Components/Navbar'
import {useTheme} from "./Utils/theme"
import { GlobalStyles, lightTheme, darkTheme } from './Utils/globalStyles';
import  { ThemeProvider } from 'styled-components';


const App = () => {
  const [ theme, toggleTheme ] = useTheme();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
 
  return (

   
    <Router>
      <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      
      <NavBar theme={theme} toggleTheme={toggleTheme}/>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
      </ThemeProvider>
  </Router>
   )
}

export default App
