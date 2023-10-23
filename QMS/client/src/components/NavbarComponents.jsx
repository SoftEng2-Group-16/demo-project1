/* eslint-disable react/prop-types */
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './AuthComponents';
import User from '../assets/user.png';
function NavHeader(props) {
  return (
  <Navbar className="d-flex justify-content-around" bg="primary" variant="dark">
      <Link to='/' className='navbar-brand'>
        QMS - Queue Management System
      </Link>
      
      <Link to='/'className='btn centered btn-outline-light'>HOME</Link>

      {props.loggedIn ? <>
      <Navbar.Text>
        
      <img src={User} style={{ width: '45px', height: 'auto', fill: 'white' }} alt="User:" />
        <span className="text-light me-3 username">{props.user.username}</span>
      </Navbar.Text>
        <LogoutButton logout={props.handleLogout} />
        </> :
        <Link to='/login'className='btn btn-outline-light'>Login</Link>
         }
  </Navbar>
  );
}

export default NavHeader;