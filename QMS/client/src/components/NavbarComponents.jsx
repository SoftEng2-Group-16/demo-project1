/* eslint-disable react/prop-types */
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { LogoutButton } from './AuthComponents';
import User from '../assets/user.png';
function NavHeader(props) {
  return (
  <Navbar className="d-flex justify-content-around" bg="primary" variant="dark">
    <Container>
      <Navbar.Brand href='/' className='navbar-brand'>
        QMS - Queue Management System
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href='/ticketing'>Ticketing</Nav.Link>
      </Nav>
      {props.loggedIn ? <>
      <Navbar.Text>
        
      <img src={User} style={{ width: '45px', height: 'auto', fill: 'white' }} alt="User:" />
        <span className="text-light me-3 username">{props.user.username}</span>
      </Navbar.Text>
        <LogoutButton logout={props.handleLogout} />
        </> :
        <Link to='/login'className='btn btn-outline-light'>Login</Link>
         }
         </Container>
  </Navbar>
  );
}

export default NavHeader;