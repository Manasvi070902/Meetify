import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './Views/HomePage'
import LoginPage from './Views/LoginPage'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar />
        </Route>
      </Switch>

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
  </Router>
  )
}

export default App
