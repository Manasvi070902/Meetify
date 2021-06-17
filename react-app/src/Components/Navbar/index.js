import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../Actions/auth'
import { Toggle } from './toggle'
import { Navbar, Nav, Dropdown, SplitButton } from 'react-bootstrap'

class NavBar extends React.Component {
  handleLogoutBtn = (e) => this.props.dispatch(logout());
  render() {

    const { auth } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" className= "custom-nav" variant="dark">
        <Navbar.Brand href="#home">Teams App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {auth.isLoaded !== undefined
              ? <>
                {!auth.uid &&
                  <>
                    <Nav.Link className="nav-link mx-3" to="/login">Login</Nav.Link>
                    <Toggle theme={this.props.theme} toggleTheme={this.props.toggleTheme} />
                  </>}
                {auth.uid &&
                  <>
                    <Nav.Link className="nav-link mx-3" exact to="/">Dashboard</Nav.Link>
                    <Toggle theme={this.props.theme} toggleTheme={this.props.toggleTheme} />
                    <div>
                    
                    <SplitButton key="down" drop ="down" variant="primary" className="rounded-circle"  title={auth.displayName.charAt(0).toUpperCase()}>
                   
                      <Dropdown.Item >Hi {auth.displayName}</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={this.handleLogoutBtn} variant="danger" >Logout</Dropdown.Item>
                     
                    </SplitButton>
                    </div>

                  </>
                }
              </>
              : <span>Loading...</span>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}

export default connect(mapStateToProps)(NavBar)