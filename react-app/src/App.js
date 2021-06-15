import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './Views/HomePage'
import LoginPage from './Views/LoginPage'
import Navbar from './Components/Navbar'
import {useTheme} from "./Utils/theme"
import { Toggle } from './Components/Navbar/toggle'
import { GlobalStyles, lightTheme, darkTheme } from './Utils/globalStyles';
import styled, { ThemeProvider } from 'styled-components';


const App = () => {
  const [ theme, toggleTheme ] = useTheme();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
 
  return (

    // <ThemeProvider theme={themeMode}>
    //   <GlobalStyles />
    //   <Toggle theme={theme} toggleTheme={toggleTheme}/>
    //   <LoginPage />
    //   </ThemeProvider>
    <Router>
      <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Switch>
        <Route path="/login" exact>
          <Toggle theme={theme} toggleTheme={toggleTheme}/>
        </Route>
      </Switch>

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
      </ThemeProvider>
  </Router>
   )
}

export default App
